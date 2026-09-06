import { BRAND, aliasFromUrl, isHttpUrl, type NitrolinkProgress } from './hosts';

const REFERER_RULE = 918711;
const ACCEPT = 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8';

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const say = (onProgress: ((p: NitrolinkProgress) => void) | undefined, p: NitrolinkProgress): void => {
  onProgress?.(p);
};

const field = (html: string, name: string): string | null => {
  const esc = name.replace(/[[\]]/g, '\\$&');
  const m = html.match(
    new RegExp(`name="${esc}"[^>]*value="([^"]*)"|value="([^"]*)"[^>]*name="${esc}"`, 'i'),
  );
  const raw = m?.[1] ?? m?.[2] ?? null;
  if (raw == null) return null;
  if (!/%[0-9A-Fa-f]{2}/.test(raw)) return raw;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

const hasGoForm = (html: string): boolean => !!field(html, 'ad_form_data') && !!field(html, '_csrfToken');

const counterSec = (html: string): number => {
  const m = html.match(/["']counter_value["']\s*:\s*["']?(\d+)/);
  const n = m ? Number(m[1]) : 0;
  return Number.isFinite(n) && n > 0 ? Math.min(n, 120) : 0;
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

const openEntry = async (entry: string): Promise<{ referer: string; html?: string }> => {
  const res = await fetch(entry, {
    credentials: 'include',
    cache: 'no-store',
    redirect: 'follow',
    headers: { Accept: ACCEPT },
  });
  if (!res.ok) throw new Error('entry');
  const html = await res.text();
  if (hasGoForm(html)) return { referer: entry, html };
  const landed = res.url || entry;
  if (!isHttpUrl(landed)) throw new Error('gate');
  return { referer: landed };
};

const fetchUnlock = (entry: string, referer: string): Promise<string> =>
  withReferer(entry, referer, async () => {
    const res = await fetch(entry, {
      credentials: 'include',
      cache: 'no-store',
      redirect: 'follow',
      headers: { Accept: ACCEPT },
    });
    if (!res.ok) throw new Error('unlock');
    const html = await res.text();
    if (!hasGoForm(html)) throw new Error('form');
    return html;
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
  return withReferer(action, unlockUrl, async () => {
    const go = await fetch(action, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
      headers: {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        Origin: new URL(unlockUrl).origin,
      },
      body,
    });
    if (!go.ok) throw new Error('go');
    const data = JSON.parse(await go.text()) as { status?: string; url?: string; message?: string };
    const dest = typeof data.url === 'string' ? data.url.trim() : '';
    if (!dest || !isHttpUrl(dest)) throw new Error(data.message || 'dest');
    return dest;
  });
};

export const resolveDestination = async (
  pageUrl: string,
  onProgress?: (p: NitrolinkProgress) => void,
): Promise<string> => {
  const alias = aliasFromUrl(pageUrl);
  if (!alias) throw new Error('alias');
  const entry = `${new URL(pageUrl).origin}/${encodeURIComponent(alias)}`;

  say(onProgress, {
    lead: 'Hang tight — unlocking your link.',
    detail: 'Skip Wait is working. You don’t need to tap anything.',
    status: `Opening ${BRAND}`,
  });

  const gate = await openEntry(entry);

  say(onProgress, {
    lead: 'Hang tight — unlocking your link.',
    detail: 'Skip Wait is unlocking Get Link in the background.',
    status: 'Loading Get Link',
  });
  const html = gate.html ?? (await fetchUnlock(entry, gate.referer));

  const waitSec = counterSec(html);
  if (waitSec > 0) {
    const waitEndTs = Date.now() + waitSec * 1000;
    say(onProgress, {
      lead: 'Your link is almost ready.',
      detail: 'Skip Wait is waiting for the Get Link timer from this page.',
      status: 'Waiting for Get Link',
      waitEndTs,
    });
    await sleep(waitSec * 1000);
  }

  say(onProgress, {
    lead: 'Almost there.',
    detail: 'Skip Wait is unlocking Get Link now.',
    status: 'Posting Get Link',
  });
  const dest = await postGo(entry, html);

  say(onProgress, {
    lead: 'Almost there.',
    detail: 'Opening your destination now.',
    status: 'Opening your destination',
  });
  return dest;
};
