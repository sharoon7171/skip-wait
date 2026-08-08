const MSG = 'DUPLOAD_DOWNLOAD2' as const;
const CDN_RE = /^https:\/\/fs\d+\.dupload\.xyz\/files\/\S+/i;

type Req = { type: typeof MSG; id: string };
type Res = { url: string | null };

const mintCdn = async (id: string): Promise<string | null> => {
  const page = `https://dupload.net/${id}`;
  const ctrl = new AbortController();
  const res = await fetch(page, {
    method: 'POST',
    credentials: 'omit',
    cache: 'no-store',
    signal: ctrl.signal,
    headers: {
      Accept: 'text/html,*/*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Referer: page,
    },
    body: new URLSearchParams({
      op: 'download2',
      id,
      rand: '',
      referer: '',
      method_free: '',
      method_premium: '',
      adblock_detected: '0',
    }),
  });
  const url = res.url;
  ctrl.abort();
  return CDN_RE.test(url) ? url : null;
};

export const initDuploadResolve = (): void => {
  chrome.runtime.onMessage.addListener((msg: Partial<Req>, _s, reply) => {
    if (msg.type !== MSG) return false;
    const id = typeof msg.id === 'string' ? msg.id.trim() : '';
    if (!id) {
      reply({ url: null } satisfies Res);
      return false;
    }
    void mintCdn(id)
      .then((url) => reply({ url } satisfies Res))
      .catch(() => reply({ url: null } satisfies Res));
    return true;
  });
};

export const requestCdn = (id: string): Promise<string> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: MSG, id } satisfies Req, (res?: Res) => {
      if (chrome.runtime.lastError || !res?.url) reject(new Error('cdn'));
      else resolve(res.url);
    });
  });
