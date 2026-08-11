export const MSG_GAPKMOD_RESOLVE = 'GAPKMOD_RESOLVE_DOWNLOAD_LINK' as const;

type Req = { type: typeof MSG_GAPKMOD_RESOLVE; href: string };
type Res = { url: string | null };

async function finalUrl(href: string): Promise<string> {
  const ctrl = new AbortController();
  const res = await fetch(href, {
    redirect: 'follow',
    credentials: 'omit',
    cache: 'no-store',
    signal: ctrl.signal,
  });
  const url = res.url;
  ctrl.abort();
  if (new URL(url).hostname === new URL(href).hostname) throw new Error('same host');
  return url;
}

export function initGapkmodResolve(): void {
  chrome.runtime.onMessage.addListener((msg: Partial<Req>, _s, reply) => {
    if (msg.type !== MSG_GAPKMOD_RESOLVE || typeof msg.href !== 'string' || !msg.href) return false;
    void finalUrl(msg.href)
      .then((url) => reply({ url } satisfies Res))
      .catch(() => reply({ url: null } satisfies Res));
    return true;
  });
}

export function requestGapkmodFinal(href: string): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: MSG_GAPKMOD_RESOLVE, href } satisfies Req, (res?: Res) => {
      if (chrome.runtime.lastError || !res?.url) reject(new Error('download_link resolve failed'));
      else resolve(res.url);
    });
  });
}
