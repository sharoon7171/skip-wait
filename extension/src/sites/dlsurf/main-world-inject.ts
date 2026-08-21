import { hostIsRemoteSite } from '../../hosts/check';
import {
  DLSURF_API,
  DLSURF_MSG_SOURCE,
  DLSURF_SITEKEY,
  MSG_DLSURF_PREFETCH,
  MSG_DLSURF_TURNSTILE,
  MSG_DLSURF_UNLOCK,
  type DlsurfUnlockResult,
} from './hosts';

type TurnstileApi = {
  render: (
    el: HTMLElement,
    opts: { sitekey: string; callback: (token: string) => void; theme?: string },
  ) => string;
};

function runDlsurfTurnstile(mountId: string, sitekey: string, msgSource: string): void {
  const el = document.getElementById(mountId);
  if (!el) {
    window.postMessage({ source: msgSource, type: 'err', err: 'mount' }, location.origin);
    return;
  }
  const post = (payload: Record<string, string>): void => {
    window.postMessage({ source: msgSource, ...payload }, location.origin);
  };
  const render = (api: TurnstileApi): void => {
    el.replaceChildren();
    try {
      api.render(el, {
        sitekey,
        theme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
        callback: (token) => post({ type: 'token', token }),
      });
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

async function runDlsurfPrefetchToken(api: string, slug: string): Promise<string> {
  const json = (await (
    await fetch(`${api}/api/file/request-download/file/${slug}`, {
      credentials: 'include',
      cache: 'no-store',
    })
  ).json()) as { data?: { token?: string } };
  return typeof json.data?.token === 'string' ? json.data.token : '';
}

async function runDlsurfUnlock(
  api: string,
  slug: string,
  captchaToken: string,
  jwt: string,
): Promise<DlsurfUnlockResult> {
  const token = jwt || (await runDlsurfPrefetchToken(api, slug));
  if (!token) return { ok: false, err: 'token' };
  const json = (await (
    await fetch(`${api}/api/file/new-download-file/`, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, captcha_token: captchaToken }),
    })
  ).json()) as { message?: string; data?: { download_url?: string } };
  const url = json.data?.download_url;
  if (typeof url !== 'string' || !url) return { ok: false, err: json.message || 'download' };
  return { ok: true, url };
}

const isDlsurfTab = async (url: string | undefined): Promise<boolean> => {
  if (!url) return false;
  try {
    return hostIsRemoteSite(new URL(url).hostname, 'dlsurf');
  } catch {
    return false;
  }
};

export function initDlsurfMainWorldInject(): void {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const tabId = sender.tab?.id;
    if (tabId === undefined || !message?.type) return false;
    const target = { tabId, frameIds: [sender.frameId ?? 0] };

    if (message.type === MSG_DLSURF_TURNSTILE) {
      const mountId = typeof message.mountId === 'string' ? message.mountId : '';
      if (!mountId) {
        sendResponse({ ok: false });
        return false;
      }
      void isDlsurfTab(sender.tab?.url).then((ok) => {
        if (!ok) return sendResponse({ ok: false });
        void chrome.scripting
          .executeScript({
            target,
            world: 'MAIN',
            func: runDlsurfTurnstile,
            args: [mountId, DLSURF_SITEKEY, DLSURF_MSG_SOURCE],
          })
          .then(() => sendResponse({ ok: true }))
          .catch(() => sendResponse({ ok: false }));
      });
      return true;
    }

    if (message.type === MSG_DLSURF_PREFETCH) {
      const slug = typeof message.slug === 'string' ? message.slug : '';
      if (!slug) {
        sendResponse({ token: '' });
        return false;
      }
      void isDlsurfTab(sender.tab?.url).then((ok) => {
        if (!ok) return sendResponse({ token: '' });
        void chrome.scripting
          .executeScript({
            target,
            world: 'MAIN',
            func: runDlsurfPrefetchToken,
            args: [DLSURF_API, slug],
          })
          .then((r) => sendResponse({ token: (r[0]?.result as string | undefined) ?? '' }))
          .catch(() => sendResponse({ token: '' }));
      });
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
      void isDlsurfTab(sender.tab?.url).then((ok) => {
        if (!ok) return sendResponse({ ok: false, err: 'host' } satisfies DlsurfUnlockResult);
        void chrome.scripting
          .executeScript({
            target,
            world: 'MAIN',
            func: runDlsurfUnlock,
            args: [DLSURF_API, slug, captchaToken, jwt],
          })
          .then((r) =>
            sendResponse((r[0]?.result as DlsurfUnlockResult | undefined) ?? { ok: false, err: 'empty' }),
          )
          .catch(() => sendResponse({ ok: false, err: 'inject' } satisfies DlsurfUnlockResult));
      });
      return true;
    }

    return false;
  });
}
