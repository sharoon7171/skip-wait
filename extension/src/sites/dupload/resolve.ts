import { canBypassHost } from '../../gate';

const MSG = 'DUPLOAD_DOWNLOAD2' as const;
const CDN_RE = /^https:\/\/fs\d+\.dupload\.xyz\/files\/\S+/i;
const MISSING_RE = /File Not Found|could not be found/i;
const SITE = 'dupload';

type Req = { type: typeof MSG; id: string };
type Res = { url: string | null; missing?: boolean };

const mintCdn = async (id: string): Promise<Res> => {
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
  if (CDN_RE.test(res.url)) {
    ctrl.abort();
    return { url: res.url };
  }
  const text = await res.text();
  return { url: null, missing: MISSING_RE.test(text) };
};

export const initDuploadResolve = (): void => {
  chrome.runtime.onMessage.addListener((msg: Partial<Req>, sender, reply) => {
    if (msg.type !== MSG) return false;
    const id = typeof msg.id === 'string' ? msg.id.trim() : '';
    if (!id) {
      reply({ url: null } satisfies Res);
      return false;
    }
    void (async () => {
      try {
        const host = sender.tab?.url ? new URL(sender.tab.url).hostname : '';
        if (!host || !(await canBypassHost(host, SITE))) {
          reply({ url: null } satisfies Res);
          return;
        }
        reply(await mintCdn(id));
      } catch {
        reply({ url: null } satisfies Res);
      }
    })();
    return true;
  });
};

export const requestCdn = (id: string): Promise<string> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: MSG, id } satisfies Req, (res?: Res) => {
      if (chrome.runtime.lastError) reject(new Error('cdn'));
      else if (res?.url) resolve(res.url);
      else if (res?.missing) reject(new Error('missing'));
      else reject(new Error('cdn'));
    });
  });
