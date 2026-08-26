import { isHttpUrl, type ShrinkpeFields, type ShrinkpeProgress } from './hosts';

const REFERER_RULE = 918900;
const MAX_HOPS = 8;
const HOP_DWELL_MS = 3000;
const GO_RETRY_MS = 8000;
const HTML_ACCEPT = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
const JSON_ACCEPT = 'application/json, text/javascript, */*; q=0.01';

type ParsedForm = { action: string; fields: ShrinkpeFields };

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const abs = (href: string, base: string): string => (isHttpUrl(href) ? href : new URL(href, base).href);

const decode = (v: string): string =>
  v
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#x2F;/gi, '/')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const parseForms = (html: string, base: string): ParsedForm[] => {
  const forms: ParsedForm[] = [];
  for (const block of html.match(/<form\b[^>]*>[\s\S]*?<\/form>/gi) ?? []) {
    const action = block.match(/<form\b[^>]*\baction=["']([^"']*)["']/i)?.[1]?.trim();
    if (!action) continue;
    const fields: ShrinkpeFields = {};
    for (const input of block.match(/<(?:input|textarea)\b[^>]*>/gi) ?? []) {
      const name = input.match(/\bname=["']([^"']*)["']/i)?.[1];
      if (!name) continue;
      fields[name] = decode(input.match(/\bvalue=["']([^"']*)["']/i)?.[1] ?? '');
    }
    forms.push({ action: abs(action, base), fields });
  }
  return forms;
};

const hopForm = (html: string, base: string): ParsedForm | null =>
  parseForms(html, base).find((f) => 'token' in f.fields && 'alias' in f.fields) ?? null;

const goForm = (html: string, base: string): ParsedForm | null =>
  parseForms(html, base).find((f) => 'ad_form_data' in f.fields) ?? null;

const redirectUrl = (html: string, base: string): string | null => {
  const m =
    html.match(/(?:window\.)?location(?:\.href)?\s*=\s*["']([^"']+)["']/i) ??
    html.match(/location\.replace\(\s*["']([^"']+)["']/i) ??
    html.match(/<meta[^>]*http-equiv=["']?refresh["']?[^>]*content=["'][^"']*url=([^"'>\s]+)/i);
  const href = m?.[1]?.trim().replace(/\\\//g, '/');
  return href ? abs(href, base) : null;
};

const hasAdForm = (html: string): boolean => /name=["']ad_form_data["']/i.test(html);

const counterValue = (html: string): number => {
  const m = html.match(/["']?counter_value["']?\s*[:=]\s*["']?(\d+)/i);
  const n = m ? Number(m[1]) : 0;
  return Number.isFinite(n) && n >= 0 ? Math.min(n, 180) : 0;
};

const withReferer = async <T>(url: string, referer: string, run: () => Promise<T>): Promise<T> => {
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [REFERER_RULE],
    addRules: [
      {
        id: REFERER_RULE,
        priority: 1,
        action: {
          type: 'modifyHeaders',
          requestHeaders: [{ header: 'Referer', operation: 'set', value: referer }],
        },
        condition: {
          urlFilter: `|${url}`,
          resourceTypes: ['xmlhttprequest'],
          tabIds: [chrome.tabs.TAB_ID_NONE],
        },
      },
    ],
  });
  try {
    return await run();
  } finally {
    await chrome.declarativeNetRequest
      .updateSessionRules({ removeRuleIds: [REFERER_RULE] })
      .catch(() => {});
  }
};

type Step = { url: string; html: string };

const postHop = (url: string, fields: ShrinkpeFields, referer: string): Promise<Step> =>
  withReferer(url, referer, async () => {
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
      redirect: 'follow',
      headers: { Accept: HTML_ACCEPT, 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body: new URLSearchParams(fields),
    });
    if (!res.ok) throw new Error('hop');
    return { url: res.url || url, html: await res.text() };
  });

const getHop = (url: string, referer: string): Promise<Step> =>
  withReferer(url, referer, async () => {
    const res = await fetch(url, {
      credentials: 'include',
      cache: 'no-store',
      redirect: 'follow',
      headers: { Accept: HTML_ACCEPT },
    });
    if (!res.ok) throw new Error('hop');
    return { url: res.url || url, html: await res.text() };
  });

const postLinksGo = async (action: string, fields: ShrinkpeFields, referer: string): Promise<string> => {
  const attempt = (): Promise<string> =>
    withReferer(action, referer, async () => {
      const res = await fetch(action, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          Accept: JSON_ACCEPT,
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: new URLSearchParams(fields),
      });
      const data = JSON.parse(await res.text()) as { url?: string };
      const url = typeof data.url === 'string' ? data.url.trim() : '';
      return url && isHttpUrl(url) ? url : '';
    });

  let url = await attempt().catch(() => '');
  if (url) return url;
  const end = Date.now() + GO_RETRY_MS;
  while (Date.now() < end) {
    await sleep(400);
    url = await attempt().catch(() => '');
    if (url) return url;
  }
  throw new Error('dest');
};

export const resolveShrinkpeDestination = async (
  pageUrl: string,
  captchaAction: string,
  captchaFields: ShrinkpeFields,
  onProgress?: (p: ShrinkpeProgress) => void,
): Promise<string> => {
  let referer = pageUrl;
  let step = await postHop(captchaAction, captchaFields, referer);

  for (let hop = 0; hop < MAX_HOPS && !hasAdForm(step.html); hop++) {
    const form = hopForm(step.html, step.url);
    const redirect = form ? null : redirectUrl(step.html, step.url);
    if (!form && !redirect) throw new Error('hop');
    referer = step.url;
    onProgress?.({ phase: 'skip', step: hop + 1 });
    if (form) {
      await sleep(HOP_DWELL_MS);
      step = await postHop(form.action, form.fields, referer);
    } else {
      step = await getHop(redirect!, referer);
    }
  }
  if (!hasAdForm(step.html)) throw new Error('banner');
  onProgress?.({ phase: 'banner' });

  const bannerUrl = step.url;
  const go = goForm(step.html, bannerUrl);
  if (!go) throw new Error('go-form');
  const goAction = /\/links\/go/i.test(go.action) ? go.action : new URL('/links/go', bannerUrl).href;

  const wait = counterValue(step.html);
  if (wait > 0) {
    onProgress?.({ waitEndTs: Date.now() + wait * 1000 });
    await sleep(wait * 1000 + 800);
  }
  onProgress?.({ phase: 'go' });
  return postLinksGo(goAction, go.fields, bannerUrl);
};
