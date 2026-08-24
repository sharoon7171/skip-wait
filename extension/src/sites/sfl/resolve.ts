import { hostIsRemoteSite } from '../../hosts/check';
import { BLOG_SITE, isHttpUrl, type SflProgress } from './hosts';

type SessionData = { step?: number; captcha?: string | null };

const ACCEPT = 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8';
const REFERER_RULE = 918610;
const DEST_RE = [
  /window\.location\.href\s*=\s*"((?:\\.|[^"\\])+)"/i,
  /window\.location\.href\s*=\s*'((?:\\.|[^'\\])+)'/i,
  /location\.replace\(\s*"((?:\\.|[^"\\])+)"\s*\)/i,
  /location\.replace\(\s*'((?:\\.|[^'\\])+)'\s*\)/i,
];

const say = (onProgress: ((p: SflProgress) => void) | undefined, p: SflProgress): void => {
  onProgress?.(p);
};

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

const parseLanding = async (unlockUrl: string): Promise<{ bindUrl: string; origin: string }> => {
  const res = await fetch(unlockUrl, {
    credentials: 'include',
    cache: 'no-store',
    headers: { Accept: ACCEPT },
  });
  if (!res.ok) throw new Error('landing');
  const html = await res.text();
  const action =
    html.match(/<form[^>]+id="form"[^>]+action="([^"]+)"/i)?.[1] ??
    html.match(/<form[^>]+action="([^"]+)"[^>]+id="form"/i)?.[1] ??
    '';
  const alias = field(html, 'alias')?.trim() ?? '';
  const rayId = field(html, 'ray_id')?.trim() ?? '';
  if (!isHttpUrl(action) || !alias || !rayId) throw new Error('form');
  const bind = new URL(action);
  bind.searchParams.set('ray_id', rayId);
  bind.searchParams.set('alias', alias);
  if (!(await hostIsRemoteSite(bind.hostname, BLOG_SITE))) throw new Error('bind host');
  return { bindUrl: bind.href, origin: bind.origin };
};

const cookieValue = async (origin: string, name: string): Promise<string> => {
  const c = await chrome.cookies.get({ url: origin, name });
  if (!c?.value) return '';
  try {
    return decodeURIComponent(c.value);
  } catch {
    return c.value;
  }
};

const sessionToken = async (origin: string): Promise<string> => {
  const xsrf = await cookieValue(origin, 'XSRF-TOKEN');
  if (!xsrf) throw new Error('xsrf');
  const suffix = `#${btoa('a'.repeat(64))}`;
  return xsrf.slice(0, Math.max(0, 128 - suffix.length)) + suffix;
};

const jsonPost = async <T>(
  origin: string,
  path: string,
  body: Record<string, unknown>,
  referer: string,
): Promise<T> => {
  const xsrf = await cookieValue(origin, 'XSRF-TOKEN');
  if (!xsrf) throw new Error('xsrf');
  const url = `${origin}${path}`;
  return withReferer(url, referer, async () => {
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': xsrf,
      },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    let data: T;
    try {
      data = JSON.parse(text) as T;
    } catch {
      throw new Error(`${path} json`);
    }
    if (!res.ok) throw new Error(`${path} ${res.status}`);
    return data;
  });
};

const bindSession = async (bindUrl: string, origin: string): Promise<string> => {
  const res = await fetch(bindUrl, {
    credentials: 'include',
    cache: 'no-store',
    redirect: 'follow',
    headers: { Accept: ACCEPT },
  });
  if (!res.ok) throw new Error('bind');
  const blog = res.url;
  if (new URL(blog).origin !== origin || /redirect\.php/i.test(blog)) throw new Error('blog');
  return blog;
};

const destFromReadyHtml = (html: string): string | null => {
  for (const re of DEST_RE) {
    const m = re.exec(html);
    if (!m?.[1]) continue;
    const url = m[1].replace(/\\\//g, '/').replace(/\\u002f/gi, '/').trim();
    if (isHttpUrl(url)) return url;
  }
  return null;
};

const unlockDestination = async (
  origin: string,
  blog: string,
  onProgress?: (p: SflProgress) => void,
): Promise<string> => {
  let session = await jsonPost<SessionData>(
    origin,
    '/api/session',
    { _token: await sessionToken(origin) },
    blog,
  );

  for (let i = 0; i < 6; i++) {
    const step = Number(session.step);
    if (!Number.isFinite(step)) throw new Error('step');

    if (step !== 1) {
      say(onProgress, {
        lead: 'Almost there.',
        detail: 'Fetching your destination from the unlock page.',
        status: 'Getting destination…',
      });
      const key = Math.floor(Math.random() * 1000);
      const size = `${(1440 + key) * 2}.${(900 + key) * 2}`;
      const go = await jsonPost<{ url?: string }>(origin, '/api/go', { key, size }, blog);
      const ready = go.url?.trim() ?? '';
      if (!isHttpUrl(ready)) throw new Error('ready');
      const readyRes = await fetch(ready, {
        credentials: 'include',
        cache: 'no-store',
        headers: { Accept: ACCEPT },
      });
      if (!readyRes.ok) throw new Error('ready fetch');
      const dest = destFromReadyHtml(await readyRes.text());
      if (!dest) throw new Error('dest');
      return dest;
    }

    if (session.captcha != null && session.captcha !== '') throw new Error('captcha');

    say(onProgress, {
      lead: 'Still unlocking.',
      detail: 'Skip Wait is verifying the session — no continue taps needed.',
      status: 'Verifying unlock…',
    });
    await jsonPost(origin, '/api/verify', { _a: 0, captcha: '', passcode: '' }, blog);
    session = await jsonPost<SessionData>(
      origin,
      '/api/session',
      { _token: await sessionToken(origin) },
      blog,
    );
  }
  throw new Error('loop');
};

export const resolveDestination = async (
  unlockUrl: string,
  onProgress?: (p: SflProgress) => void,
): Promise<string> => {
  say(onProgress, {
    lead: 'Hang tight — unlocking your link.',
    detail: 'Skip Wait skips the mediator pages in the background.',
    status: 'Reading your short link…',
  });
  const { bindUrl, origin } = await parseLanding(unlockUrl);

  say(onProgress, {
    lead: 'Skipping mediator waits.',
    detail: 'Binding the unlock session without opening those pages.',
    status: 'Binding session…',
  });
  const blog = await bindSession(bindUrl, origin);

  say(onProgress, {
    lead: 'Unlocking your link.',
    detail: "Those gate timers stay in the background — you don't need to tap anything.",
    status: 'Starting unlock…',
  });
  return unlockDestination(origin, blog, onProgress);
};
