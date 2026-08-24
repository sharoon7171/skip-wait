import { isHttpUrl } from './hosts';

const REFERER_RULE = 918498;
const ACCEPT = 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8';

const field = (html: string, name: string): string | null => {
  const esc = name.replace(/[[\]]/g, '\\$&');
  const m = html.match(new RegExp(`name="${esc}"[^>]*value="([^"]*)"|value="([^"]*)"[^>]*name="${esc}"`, 'i'));
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

const gateReferer = async (unlockUrl: string): Promise<string> => {
  const res = await fetch(unlockUrl, {
    credentials: 'include',
    cache: 'no-store',
    redirect: 'follow',
    headers: { Accept: ACCEPT },
  });
  const final = new URL(res.url).origin;
  if (final === new URL(unlockUrl).origin) throw new Error('gate');
  return `${final}/`;
};

const fetchUnlockHtml = (unlockUrl: string, referer: string): Promise<string> =>
  withReferer(unlockUrl, referer, async () => {
    const res = await fetch(unlockUrl, {
      credentials: 'include',
      cache: 'no-store',
      headers: { Accept: ACCEPT },
    });
    if (!res.ok) throw new Error('unlock');
    return res.text();
  });

const postGo = async (unlockUrl: string, html: string): Promise<string> => {
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
  await chrome.cookies.set({ url: unlockUrl, name: 'ab', value: '1', path: '/' });
  return withReferer(action, unlockUrl, async () => {
    const go = await fetch(action, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body,
    });
    if (!go.ok) throw new Error('go');
    const data = JSON.parse(await go.text()) as { url?: string };
    const url = typeof data.url === 'string' ? data.url.trim() : '';
    if (!url || !isHttpUrl(url)) throw new Error('dest');
    return url;
  });
};

export const resolveDestination = async (unlockUrl: string): Promise<string> =>
  postGo(unlockUrl, await fetchUnlockHtml(unlockUrl, await gateReferer(unlockUrl)));
