import { canBypassHost } from '../../gate';

const MSG = 'DEVUPLOADS_DOWNLOAD2' as const;
const CDN_RE = /https?:\/\/du\d+\.devuploads\.com\/d\/[A-Za-z0-9._~/-]+/i;
const SITE = 'devuploads-mediator';

type Req = { type: typeof MSG; id: string };
type Res = { url: string | null };

const mintCdn = async (id: string): Promise<string | null> => {
  const res = await fetch(`https://devuploads.com/${id}`, {
    method: 'POST',
    credentials: 'omit',
    cache: 'no-store',
    headers: {
      Accept: 'text/html,*/*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Referer: `https://devuploads.com/${id}`,
    },
    body: new URLSearchParams({
      op: 'download2',
      id,
      rand: '',
      referer: '',
      xd: '1',
      tsty: '0',
      ransite: '3',
      dnumber: '0',
      adblock_detected: '0',
      ipp: '',
    }),
  });
  return res.ok ? ((await res.text()).match(CDN_RE)?.[0] ?? null) : null;
};

export const initDevuploadsResolve = (): void => {
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
        reply({ url: await mintCdn(id) } satisfies Res);
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
      if (chrome.runtime.lastError || !res?.url) reject(new Error('cdn'));
      else resolve(res.url);
    });
  });
