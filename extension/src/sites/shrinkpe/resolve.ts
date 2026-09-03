import { isRejectHtml, type ShrinkpeProgress } from './hosts';

const REFERER_RULE = 918521;
const MAX_HOPS = 12;
const HOP_IDS = ['go_d2', 'getmylink', 'nextpage'] as const;

const say = (onProgress: ((p: ShrinkpeProgress) => void) | undefined, p: ShrinkpeProgress): void => {
  onProgress?.(p);
};

type Step = { url: string; html: string };
type Hop = { action: string; fields: Record<string, string> };

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const field = (html: string, name: string): string | null => {
  const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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

const fetchStep = async (url: string, init: RequestInit, referer: string | null): Promise<Step> => {
  const run = async (): Promise<Step> => {
    const res = await fetch(url, { ...init, credentials: 'include', cache: 'no-store', redirect: 'follow' });
    if (!res.ok) throw new Error('hop');
    return { url: res.url || url, html: await res.text() };
  };
  return referer ? withReferer(url, referer, run) : run();
};

const postHop = (action: string, fields: Record<string, string>, referer: string): Promise<Step> =>
  fetchStep(
    action,
    {
      method: 'POST',
      headers: { Accept: 'text/html,*/*', 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(fields),
    },
    referer,
  );

const hopFields = (chunk: string): Record<string, string> | null => {
  const token = field(chunk, 'token');
  const alias = field(chunk, 'alias');
  if (!token || !alias) return null;
  const out: Record<string, string> = { token, alias };
  for (const name of ['c_d', 'c_t', 'url', 'visit_token', 'mysite', 'ad_type', 'next_page'] as const) {
    const v = field(chunk, name);
    if (v != null) out[name] = v;
  }
  return out;
};

const hopById = (html: string, id: string): Hop | null => {
  const open = html.match(new RegExp(`<form\\b[^>]*\\bid="${id}"[^>]*>`, 'i'));
  if (!open) return null;
  const action = open[0].match(/\baction="([^"]+)"/i)?.[1]?.trim() ?? '';
  if (!/^https?:\/\//i.test(action)) return null;
  const inner = html.slice(open.index! + open[0].length);
  const end = inner.search(/<\/form>/i);
  const fields = hopFields(end < 0 ? inner : inner.slice(0, end));
  return fields ? { action, fields } : null;
};

const captchaHop = (html: string, origin: string): Hop | null => {
  for (const m of html.matchAll(/<form\b[^>]*>([\s\S]*?)<\/form>/gi)) {
    const chunk = m[1] ?? '';
    const tag = m[0].match(/^<form\b[^>]*/i)?.[0] ?? '';
    const action = tag.match(/\baction="([^"]+)"/i)?.[1]?.trim() ?? '';
    if (!/^https?:\/\//i.test(action) || !field(chunk, 'visit_token')) continue;
    try {
      if (new URL(action).origin === origin) continue;
    } catch {
      continue;
    }
    const fields = hopFields(chunk);
    if (fields) return { action, fields };
  }
  return null;
};

const nextHop = (html: string, unlockUrl: string): Hop | null => {
  for (const id of HOP_IDS) {
    const hop = hopById(html, id);
    if (hop) return hop;
  }
  return captchaHop(html, new URL(unlockUrl).origin);
};

const hasGoForm = (html: string): boolean => field(html, 'ad_form_data') != null;

const postGo = async (unlockUrl: string, html: string): Promise<string> => {
  const ad = field(html, 'ad_form_data');
  if (!ad) throw new Error('go');
  const actionRaw =
    html.match(/id="go-link"[^>]*\baction="([^"]+)"/i)?.[1] ??
    html.match(/<form[^>]*\bid="go-link"[^>]*\baction="([^"]+)"/i)?.[1] ??
    '/links/go';
  const action = /^https?:\/\//i.test(actionRaw) ? actionRaw : new URL(actionRaw, unlockUrl).href;
  const body = new URLSearchParams({ _method: field(html, '_method') ?? 'POST', ad_form_data: ad });
  await chrome.cookies.set({ url: unlockUrl, name: 'ab', value: '1', path: '/' }).catch(() => {});
  return withReferer(action, unlockUrl, async () => {
    const res = await fetch(action, {
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
    if (!res.ok) throw new Error('go');
    const data = JSON.parse(await res.text()) as { url?: string };
    const dest = typeof data.url === 'string' ? data.url.trim() : '';
    if (!dest || !/^https?:\/\//i.test(dest)) throw new Error('dest');
    return dest;
  });
};

const counterSec = (html: string): number => {
  const n = Number(html.match(/["']counter_value["']\s*:\s*["']?(\d+)/i)?.[1] ?? 0);
  return Number.isFinite(n) && n > 0 ? Math.min(n, 120) : 0;
};

const walkToGoForm = async (
  unlockUrl: string,
  pageHtml: string,
  onProgress?: (p: ShrinkpeProgress) => void,
): Promise<Step> => {
  let step: Step = { url: unlockUrl, html: pageHtml };
  for (let hop = 0; hop < MAX_HOPS; hop++) {
    if (isRejectHtml(step.html)) throw new Error('reject');
    if (hasGoForm(step.html)) return step;
    const form = nextHop(step.html, unlockUrl);
    if (!form) throw new Error('form');
    say(onProgress, {
      lead: 'Skipping the wait pages.',
      detail: 'Mediator hops run in the background — nothing to click.',
      status: hop === 0 ? 'Starting unlock' : `Skipping step ${hop + 1}`,
    });
    step = await postHop(form.action, form.fields, step.url);
  }
  if (!hasGoForm(step.html)) throw new Error('shell');
  return step;
};

export const resolveDestination = async (
  unlockUrl: string,
  pageHtml: string,
  onProgress?: (p: ShrinkpeProgress) => void,
): Promise<string> => {
  say(onProgress, {
    lead: 'Hang tight — unlocking your link.',
    detail: "You don't need to tap anything on the page.",
    status: 'Skipping wait pages',
  });

  const step = await walkToGoForm(unlockUrl, pageHtml, onProgress);
  const base = new URL(step.url).origin === new URL(unlockUrl).origin ? step.url : unlockUrl;
  const wait = counterSec(step.html);

  if (wait > 0) {
    say(onProgress, {
      lead: 'Unlocking your link.',
      detail: "Skip Wait is finishing the Get Link step for you. You don't need to tap anything.",
      status: 'Your link is almost ready',
      countdownSec: wait,
    });
    await sleep(wait * 1000);
  }

  say(onProgress, {
    lead: 'Unlocking your link.',
    detail: "Skip Wait is finishing the Get Link step for you. You don't need to tap anything.",
    status: 'Getting your destination',
  });
  return postGo(base, step.html);
};
