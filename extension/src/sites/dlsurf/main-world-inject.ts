import { canBypassHost } from '../../gate';
import {
  DLSURF_API,
  DLSURF_MSG_SOURCE,
  DLSURF_SITEKEY,
  MSG_DLSURF_AUTH,
  MSG_DLSURF_PREFETCH,
  MSG_DLSURF_TURNSTILE,
  MSG_DLSURF_TURNSTILE_REMOVE,
  MSG_DLSURF_UNLOCK,
  type DlsurfUnlockResult,
} from './hosts';

type TurnstileApi = {
  render: (
    el: HTMLElement,
    opts: { sitekey: string; callback: (token: string) => void; theme?: string },
  ) => string;
  remove?: (widgetId: string) => void;
};

type ApiJson = {
  status?: string;
  message?: string;
  data?: { token?: string; download_url?: string };
  errors?: { detail?: string };
};

function runDlsurfTurnstileRemove(widgetId: string): void {
  if (!widgetId) return;
  const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
  if (!api?.remove) return;
  try {
    api.remove(widgetId);
  } catch {}
}

function runDlsurfTurnstile(mountId: string, sitekey: string, msgSource: string): void {
  const el = document.getElementById(mountId);
  if (!el) {
    window.postMessage({ source: msgSource, type: 'err', err: 'mount' }, location.origin);
    return;
  }
  const post = (payload: Record<string, string>): void => {
    window.postMessage({ source: msgSource, ...payload }, location.origin);
  };
  const wipe = (): void => {
    const id = el.getAttribute('data-sw-ts-id');
    const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
    if (id && api?.remove) {
      try {
        api.remove(id);
      } catch {}
    }
    el.removeAttribute('data-sw-ts-id');
    el.replaceChildren();
  };
  const render = (api: TurnstileApi): void => {
    wipe();
    try {
      const widgetId = api.render(el, {
        sitekey,
        theme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
        callback: (token) => post({ type: 'token', token }),
      });
      if (widgetId) el.setAttribute('data-sw-ts-id', widgetId);
      post({ type: 'ready' });
    } catch {
      post({ type: 'err', err: 'render' });
    }
  };
  const existing = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
  if (existing) {
    render(existing);
    return;
  }
  const wait = (deadline: number): void => {
    const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
    if (api) {
      render(api);
      return;
    }
    if (Date.now() > deadline) {
      post({ type: 'err', err: 'timeout' });
      return;
    }
    setTimeout(() => wait(deadline), 50);
  };
  if (document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')) {
    wait(Date.now() + 15_000);
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
  script.async = true;
  script.onload = () => wait(Date.now() + 5_000);
  script.onerror = () => post({ type: 'err', err: 'script' });
  document.documentElement.appendChild(script);
}

async function runDlsurfCheckAuth(api: string): Promise<boolean> {
  const call = async (retried: boolean): Promise<Response> => {
    const r = await fetch(`${api}/api/account/check-auth/`, { credentials: 'include', cache: 'no-store' });
    if (r.status !== 401 || retried) return r;
    const refresh = await fetch(`${api}/api/account/token/refresh/`, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
    return refresh.ok ? call(true) : r;
  };
  return (await call(false)).ok;
}

async function runDlsurfPrefetchToken(api: string, slug: string): Promise<string> {
  const call = async (retried: boolean): Promise<Response> => {
    const r = await fetch(`${api}/api/file/request-download/file/${slug}`, {
      credentials: 'include',
      cache: 'no-store',
    });
    if (r.status !== 401 || retried) return r;
    const refresh = await fetch(`${api}/api/account/token/refresh/`, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
    return refresh.ok ? call(true) : r;
  };
  const r = await call(false);
  let json: ApiJson = {};
  try {
    json = (await r.json()) as ApiJson;
  } catch {}
  if (!r.ok || json.status !== 'success') return '';
  return typeof json.data?.token === 'string' ? json.data.token : '';
}

async function runDlsurfUnlock(
  api: string,
  slug: string,
  captchaToken: string,
  jwt: string,
): Promise<DlsurfUnlockResult> {
  const call = async (path: string, init: RequestInit | undefined, retried: boolean): Promise<Response> => {
    const r = await fetch(`${api}${path}`, { credentials: 'include', cache: 'no-store', ...init });
    if (r.status !== 401 || retried) return r;
    const refresh = await fetch(`${api}/api/account/token/refresh/`, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
    return refresh.ok ? call(path, init, true) : r;
  };
  const read = async (r: Response): Promise<ApiJson> => {
    try {
      return (await r.json()) as ApiJson;
    } catch {
      return {};
    }
  };
  const errOf = (json: ApiJson, fallback: string): string =>
    (typeof json.errors?.detail === 'string' && json.errors.detail) ||
    (typeof json.message === 'string' && json.message) ||
    fallback;

  let token = jwt;
  if (!token) {
    const pre = await call(`/api/file/request-download/file/${slug}`, undefined, false);
    const preJson = await read(pre);
    if (!pre.ok || preJson.status !== 'success' || typeof preJson.data?.token !== 'string') {
      return { ok: false, err: errOf(preJson, pre.ok ? 'token' : `auth ${pre.status}`) };
    }
    token = preJson.data.token;
  }

  const post = await call(
    '/api/file/new-download-file/',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, captcha_token: captchaToken }),
    },
    false,
  );
  const postJson = await read(post);
  const url = postJson.data?.download_url;
  if (typeof url === 'string' && url) return { ok: true, url };
  return { ok: false, err: errOf(postJson, post.ok ? 'download' : `unlock ${post.status}`) };
}

const isDlsurfTab = async (url: string | undefined): Promise<boolean> => {
  if (!url) return false;
  try {
    return canBypassHost(new URL(url).hostname, 'dlsurf');
  } catch {
    return false;
  }
};

export function initDlsurfMainWorldInject(): void {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const tabId = sender.tab?.id;
    if (tabId === undefined || !message?.type) return false;
    const target = { tabId, frameIds: [sender.frameId ?? 0] };

    const run = <T>(
      ok: boolean,
      work: () => Promise<chrome.scripting.InjectionResult[]>,
      map: (results: chrome.scripting.InjectionResult[]) => T,
      fail: T,
    ): void => {
      if (!ok) {
        sendResponse(fail);
        return;
      }
      void work()
        .then((r) => sendResponse(map(r)))
        .catch(() => sendResponse(fail));
    };

    if (message.type === MSG_DLSURF_TURNSTILE) {
      const mountId = typeof message.mountId === 'string' ? message.mountId : '';
      if (!mountId) {
        sendResponse({ ok: false });
        return false;
      }
      void isDlsurfTab(sender.tab?.url).then((ok) =>
        run(
          ok,
          () =>
            chrome.scripting.executeScript({
              target,
              world: 'MAIN',
              func: runDlsurfTurnstile,
              args: [mountId, DLSURF_SITEKEY, DLSURF_MSG_SOURCE],
            }),
          () => ({ ok: true }),
          { ok: false },
        ),
      );
      return true;
    }

    if (message.type === MSG_DLSURF_TURNSTILE_REMOVE) {
      const widgetId = typeof message.widgetId === 'string' ? message.widgetId : '';
      if (!widgetId) {
        sendResponse({ ok: false });
        return false;
      }
      void isDlsurfTab(sender.tab?.url).then((ok) =>
        run(
          ok,
          () =>
            chrome.scripting.executeScript({
              target,
              world: 'MAIN',
              func: runDlsurfTurnstileRemove,
              args: [widgetId],
            }),
          () => ({ ok: true }),
          { ok: false },
        ),
      );
      return true;
    }

    if (message.type === MSG_DLSURF_AUTH) {
      void isDlsurfTab(sender.tab?.url).then((ok) =>
        run(
          ok,
          () =>
            chrome.scripting.executeScript({
              target,
              world: 'MAIN',
              func: runDlsurfCheckAuth,
              args: [DLSURF_API],
            }),
          (r) => ({ ok: r[0]?.result === true }),
          { ok: false },
        ),
      );
      return true;
    }

    if (message.type === MSG_DLSURF_PREFETCH) {
      const slug = typeof message.slug === 'string' ? message.slug : '';
      if (!slug) {
        sendResponse({ token: '' });
        return false;
      }
      void isDlsurfTab(sender.tab?.url).then((ok) =>
        run(
          ok,
          () =>
            chrome.scripting.executeScript({
              target,
              world: 'MAIN',
              func: runDlsurfPrefetchToken,
              args: [DLSURF_API, slug],
            }),
          (r) => ({ token: (r[0]?.result as string | undefined) ?? '' }),
          { token: '' },
        ),
      );
      return true;
    }

    if (message.type === MSG_DLSURF_UNLOCK) {
      const slug = typeof message.slug === 'string' ? message.slug : '';
      const captchaToken = typeof message.captchaToken === 'string' ? message.captchaToken : '';
      const jwt = typeof message.jwt === 'string' ? message.jwt : '';
      if (!slug || !captchaToken) {
        sendResponse({ ok: false, err: 'args' } satisfies DlsurfUnlockResult);
        return false;
      }
      void isDlsurfTab(sender.tab?.url).then((ok) =>
        run(
          ok,
          () =>
            chrome.scripting.executeScript({
              target,
              world: 'MAIN',
              func: runDlsurfUnlock,
              args: [DLSURF_API, slug, captchaToken, jwt],
            }),
          (r) =>
            (r[0]?.result as DlsurfUnlockResult | undefined) ?? ({ ok: false, err: 'empty' } satisfies DlsurfUnlockResult),
          { ok: false, err: ok ? 'inject' : 'host' } satisfies DlsurfUnlockResult,
        ),
      );
      return true;
    }

    return false;
  });
}
