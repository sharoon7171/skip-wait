import { aliasFromUrl, isHttpUrl, siteOrigins, type LiteshortProgress } from './hosts';

const REFERER_RULE = 918701;
const ACCEPT = 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8';
const DEFAULT_COUNTER = 5;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const field = (html: string, name: string): string | null => {
  const esc = name.replace(/[[\]]/g, '\\$&');
  const m = html.match(
    new RegExp(`name="${esc}"[^>]*value="([^"]*)"|value="([^"]*)"[^>]*name="${esc}"`, 'i'),
  );
  return m?.[1] ?? m?.[2] ?? null;
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
    await chrome.declarativeNetRequest.updateSessionRules({ removeRuleIds: [REFERER_RULE] }).catch(() => {});
  }
};

const continueHref = (html: string): string | null => {
  const m =
    html.match(/<a[^>]*class="[^"]*\bbtn\b[^"]*"[^>]*href="(https?:\/\/[^"]+)"/i) ??
    html.match(/href="(https?:\/\/[^"]+)"[^>]*>\s*Continue to Destination/i);
  const href = m?.[1]?.trim() ?? '';
  return isHttpUrl(href) ? href : null;
};

const counterValueFromHtml = (html: string): number => {
  const m = html.match(/["']counter_value["']\s*:\s*["']?(\d+)/);
  const n = m ? Number(m[1]) : DEFAULT_COUNTER;
  return Number.isFinite(n) && n >= 0 ? Math.min(n, 120) : DEFAULT_COUNTER;
};

const hasGoForm = (html: string): boolean => !!field(html, 'ad_form_data');

const fetchEntryReferer = async (entryOrigin: string, alias: string): Promise<string> => {
  const res = await fetch(`${entryOrigin}/${encodeURIComponent(alias)}`, {
    credentials: 'include',
    cache: 'no-store',
    redirect: 'follow',
    headers: { Accept: ACCEPT },
  });
  if (!res.ok) throw new Error('entry');
  const referer = continueHref(await res.text());
  if (!referer) throw new Error('continue');
  return referer;
};

const fetchUnlockHtml = (unlockUrl: string, referer: string): Promise<string> =>
  withReferer(unlockUrl, referer, async () => {
    const res = await fetch(unlockUrl, {
      credentials: 'include',
      cache: 'no-store',
      redirect: 'manual',
      headers: { Accept: ACCEPT },
    });
    if (res.type === 'opaqueredirect' || (res.status >= 300 && res.status < 400)) {
      throw new Error('unlock redirect');
    }
    if (!res.ok) throw new Error('unlock');
    const html = await res.text();
    if (!hasGoForm(html)) throw new Error('form');
    return html;
  });

const postGoFromHtml = async (unlockUrl: string, html: string): Promise<string> => {
  const ad = field(html, 'ad_form_data');
  const csrf = field(html, '_csrfToken');
  if (!ad || !csrf) throw new Error('form');
  const actionRaw =
    html.match(/id="go-link"[^>]*\baction="([^"]+)"/i)?.[1] ??
    html.match(/<form[^>]*\bid="go-link"[^>]*\baction="([^"]+)"/i)?.[1] ??
    '/links/go';
  const action = isHttpUrl(actionRaw) ? actionRaw : new URL(actionRaw, unlockUrl).href;
  const body = new URLSearchParams({
    _method: field(html, '_method') ?? 'POST',
    _csrfToken: csrf,
    ad_form_data: ad,
  });
  const tokFields = field(html, '_Token[fields]');
  const tokUnlocked = field(html, '_Token[unlocked]');
  if (tokFields) body.set('_Token[fields]', tokFields);
  if (tokUnlocked) body.set('_Token[unlocked]', tokUnlocked);
  await chrome.cookies.set({ url: unlockUrl, name: 'ab', value: '1', path: '/' }).catch(() => {});
  return withReferer(action, unlockUrl, async () => {
    const go = await fetch(action, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
      headers: {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body,
    });
    if (!go.ok) throw new Error('go');
    const data = JSON.parse(await go.text()) as { status?: string; url?: string; message?: string };
    const url = typeof data.url === 'string' ? data.url.trim() : '';
    if (!url || !isHttpUrl(url)) throw new Error(data.message || 'dest');
    return url;
  });
};

export const resolveDestination = async (
  pageUrl: string,
  onProgress?: (p: LiteshortProgress) => void,
): Promise<string> => {
  const alias = aliasFromUrl(pageUrl);
  if (!alias) throw new Error('alias');
  const { entry, unlock } = await siteOrigins();
  const unlockUrl = `${unlock}/${encodeURIComponent(alias)}`;
  const referer = await fetchEntryReferer(entry, alias);
  const html = await fetchUnlockHtml(unlockUrl, referer);
  const waitSec = counterValueFromHtml(html);
  if (waitSec > 0) {
    onProgress?.({ waitEndTs: Date.now() + waitSec * 1000 });
    await sleep(waitSec * 1000);
  }
  return postGoFromHtml(unlockUrl, html);
};
