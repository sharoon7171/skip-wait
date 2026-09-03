import { isHttpUrl } from './hosts';
import type { EarnlinksProgress } from './hosts';

const REFERER_RULE = 918498;
const MAX_HOPS = 24;
const ACCEPT = 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8';
const LANDING_MAX_BYTES = 8000;

type Step = { url: string; html: string };

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const say = (onProgress: ((p: EarnlinksProgress) => void) | undefined, p: EarnlinksProgress): void => {
  onProgress?.(p);
};

const abs = (href: string, base: string): string | null => {
  try {
    const u = new URL(href.replace(/&amp;/g, '&').replace(/\\\//g, '/'), base);
    return isHttpUrl(u.href) ? u.href : null;
  } catch {
    return null;
  }
};

const field = (html: string, name: string): string | null => {
  const esc = name.replace(/[[\]]/g, '\\$&');
  const m = html.match(new RegExp(`name="${esc}"[^>]*value="([^"]*)"|value="([^"]*)"[^>]*name="${esc}"`, 'i'));
  return m?.[1] ?? m?.[2] ?? null;
};

const hasGoForm = (html: string): boolean => !!field(html, 'ad_form_data') && !!field(html, '_csrfToken');

const aliasOf = (unlockUrl: string): string => {
  const [seg] = new URL(unlockUrl).pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  return seg ?? '';
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

const get = async (url: string, referer: string | null): Promise<Step> => {
  const run = async (): Promise<Step> => {
    const res = await fetch(url, {
      credentials: 'include',
      cache: 'no-store',
      redirect: 'follow',
      headers: { Accept: ACCEPT },
    });
    if (!res.ok) throw new Error('hop');
    return { url: res.url || url, html: await res.text() };
  };
  return referer ? withReferer(url, referer, run) : run();
};

const landingRedirect = (html: string, base: string): string | null => {
  if (html.length > LANDING_MAX_BYTES) return null;
  const m =
    html.match(/<meta[^>]*http-equiv=["']?refresh["']?[^>]*content=["'][^"']*URL=['"]?([^"'\s>]+)/i) ??
    html.match(/<meta[^>]*content=["'][^"']*URL=['"]?([^"'\s>]+)[^"']*["'][^>]*http-equiv=["']?refresh/i) ??
    html.match(/(?:window\.)?location(?:\.href)?\s*=\s*["']([^"']+)["']/i) ??
    html.match(/location\.replace\(\s*["']([^"']+)["']/i);
  const href = m?.[1]?.trim().replace(/['"]+$/, '');
  return href ? abs(href, base) : null;
};

const pushUnique = (out: string[], href: string | null): void => {
  if (href && !out.includes(href)) out.push(href);
};

const continueTargets = (html: string, base: string, unlockUrl: string): string[] => {
  const unlockHost = new URL(unlockUrl).hostname;
  const alias = aliasOf(unlockUrl);
  const found: string[] = [];
  const take = (href: string | undefined): void => {
    if (href) pushUnique(found, abs(href, base));
  };

  for (const m of html.matchAll(
    /<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>[\s\S]{0,500}?<button\b[^>]*\bid=["'](?:tp-snp2|notarobot)["']/gi,
  )) {
    take(m[1]);
  }
  for (const m of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>[\s\S]{0,240}?Click here to continue/gi)) {
    take(m[1]);
  }

  if (alias) {
    const esc = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const hostEsc = unlockHost.replace(/\./g, '\\.');
    for (const m of html.matchAll(new RegExp(`href=["']([^"']*[?&](?:dsp|grey|isp)=${esc}[^"']*)["']`, 'gi'))) {
      take(m[1]);
    }
    for (const m of html.matchAll(
      new RegExp(`href=["'](https?://[^"']*${hostEsc}/${esc}/?[^"']*)["']`, 'gi'),
    )) {
      take(m[1]);
    }
  }

  const mid = found.filter((u) => {
    try {
      return new URL(u).hostname !== unlockHost;
    } catch {
      return false;
    }
  });
  return mid.length ? mid : found;
};

const nextHop = (step: Step, unlockUrl: string): string | null =>
  landingRedirect(step.html, step.url) ?? continueTargets(step.html, step.url, unlockUrl)[0] ?? null;

const counterSec = (html: string): number => {
  const fromVars = html.match(/["']counter_value["']\s*:\s*["']?(\d+)/i);
  const fromTimer = html.match(/id=["']timer["'][^>]*>\s*(\d+)/i);
  const n = Number(fromVars?.[1] ?? fromTimer?.[1] ?? 0);
  return Number.isFinite(n) && n > 0 ? Math.min(n, 120) : 0;
};

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
    const data = JSON.parse(await go.text()) as { url?: string; message?: string };
    const url = typeof data.url === 'string' ? data.url.trim() : '';
    if (!url || !isHttpUrl(url)) throw new Error(data.message || 'dest');
    return url;
  });
};

const walkToGoForm = async (
  unlockUrl: string,
  onProgress?: (p: EarnlinksProgress) => void,
): Promise<Step> => {
  let referer: string | null = null;
  let step = await get(unlockUrl, referer);

  for (let hop = 0; hop < MAX_HOPS; hop++) {
    if (hasGoForm(step.html)) return step;

    const next = nextHop(step, unlockUrl);
    if (!next) throw new Error('hop');

    referer = step.url;
    say(onProgress, {
      lead: 'Skipping the wait pages.',
      detail: 'Flyer hops stay in the background — nothing to click.',
      status: hop === 0 ? 'Starting unlock' : `Skipping step ${hop + 1}`,
    });
    step = await get(next, referer);
  }

  if (!hasGoForm(step.html)) throw new Error('banner');
  return step;
};

export const resolveDestination = async (
  unlockUrl: string,
  onProgress?: (p: EarnlinksProgress) => void,
): Promise<string> => {
  say(onProgress, {
    lead: 'Hang tight — unlocking your link.',
    detail: "Skip Wait is working. You don't need to tap anything.",
    status: 'Opening your short link',
  });

  const step = await walkToGoForm(unlockUrl, onProgress);
  const unlockFinal = new URL(step.url).origin === new URL(unlockUrl).origin ? step.url : unlockUrl;

  const wait = counterSec(step.html);
  if (wait > 0) {
    say(onProgress, {
      lead: 'Unlocking your link.',
      detail: "Skip Wait is finishing the Get Link step for you. You don't need to tap anything.",
      status: 'Waiting for unlock timer',
    });
    await sleep(wait * 1000);
  }

  say(onProgress, {
    lead: 'Unlocking your link.',
    detail: "Skip Wait is finishing the Get Link step for you. You don't need to tap anything.",
    status: 'Getting your link',
  });
  const dest = await postGo(unlockFinal, step.html);

  say(onProgress, {
    lead: 'Almost there.',
    detail: 'Opening your destination now.',
    status: 'Opening your link',
  });
  return dest;
};
