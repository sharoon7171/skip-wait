import { MSG_ARM, MSG_DISARM, isHttpUrl, type ShrinkpeFields } from './hosts';

const HTML_ACCEPT = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
const JSON_ACCEPT = 'application/json, text/javascript, */*; q=0.01';
const POLL_MS = 500;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const pageTarget = (href: string): string => {
  const u = new URL(href);
  return `${u.origin}${u.pathname.replace(/\/+$/, '') || '/'}`;
};

const armReferer = (host: string, referer: string): Promise<boolean> =>
  new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: MSG_ARM, host, referer }, (ok?: boolean) => {
      resolve(!chrome.runtime.lastError && ok === true);
    });
  });

const disarmReferer = (): Promise<void> =>
  new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: MSG_DISARM }, () => resolve());
  });

const counterValue = (html: string): number => {
  const m = html.match(/["']?counter_value["']?\s*[:=]\s*["']?(\d+)/i);
  const n = m ? Number(m[1]) : 0;
  return Number.isFinite(n) && n >= 0 ? Math.min(n, 180) : 0;
};

const goFieldsFromHtml = (html: string, base: string): { action: string; fields: ShrinkpeFields } | null => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const form =
    doc.querySelector<HTMLFormElement>('#go-link') ??
    doc.querySelector<HTMLFormElement>('form[action*="/links/go"]');
  if (!form) return null;
  let action = form.getAttribute('action') || '/links/go';
  if (!isHttpUrl(action)) action = new URL(action, base).href;
  const fields: ShrinkpeFields = {};
  form.querySelectorAll<HTMLInputElement>('input[name]').forEach((inp) => {
    if (inp.name) fields[inp.name] = inp.value ?? '';
  });
  if (!fields['ad_form_data']) return null;
  return { action, fields };
};

const postShell = async (
  target: string,
  body: URLSearchParams,
): Promise<{ html: string; base: string } | null> => {
  try {
    const res = await fetch(target, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
      redirect: 'follow',
      headers: { Accept: HTML_ACCEPT, 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body,
    });
    if (!res.ok) return null;
    return { html: await res.text(), base: res.url || target };
  } catch {
    return null;
  }
};

const postLinksGo = async (action: string, fields: ShrinkpeFields): Promise<string> => {
  for (;;) {
    try {
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
      if (url && isHttpUrl(url)) return url;
    } catch {}
    await sleep(POLL_MS);
  }
};

export const unlockShrinkearnInPage = async (
  pageUrl: string,
  fields: ShrinkpeFields,
  mediator: string,
  onProgress: (p: { phase?: 'banner' | 'go'; waitEndTs?: number }) => void,
): Promise<string> => {
  const { token = '', c_d = '', c_t = '', alias = '' } = fields;
  if (!token || !alias || !c_d || !c_t || !mediator) throw new Error('fields');

  const target = pageTarget(pageUrl);
  const host = new URL(target).hostname;
  while (!(await armReferer(host, mediator))) await sleep(POLL_MS);

  try {
    onProgress({ phase: 'banner' });
    const body = new URLSearchParams({ token, c_d, c_t, alias, next_page: mediator, url: alias });

    let go: { action: string; fields: ShrinkpeFields } | null = null;
    let html = '';
    while (!go) {
      const step = await postShell(target, body);
      if (step) {
        html = step.html;
        go = goFieldsFromHtml(step.html, step.base);
      }
      if (!go) await sleep(POLL_MS);
    }

    const wait = counterValue(html);
    if (wait > 0) {
      onProgress({ waitEndTs: Date.now() + wait * 1000 });
      await sleep(wait * 1000 + 800);
    }
    onProgress({ phase: 'go' });
    return postLinksGo(go.action, go.fields);
  } finally {
    await disarmReferer();
  }
};
