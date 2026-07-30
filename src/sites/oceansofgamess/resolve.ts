import { cdnFromPleaseWaitHtml } from './decrypt';
import { OCEANSOFGAMESS_PLEASE_WAIT } from './hosts';

export const MSG_OCEANSOFGAMESS_RESOLVE = 'OCEANSOFGAMESS_RESOLVE_CDN' as const;

type ResolveReq = {
  type: typeof MSG_OCEANSOFGAMESS_RESOLVE;
  id: string;
  filename: string;
  filesize: string;
};

type ResolveRes = { url: string | null };

async function mintCdn(id: string, filename: string, filesize: string): Promise<string | null> {
  const res = await fetch(OCEANSOFGAMESS_PLEASE_WAIT, {
    method: 'POST',
    body: new URLSearchParams({ id, filename, filesize }),
    credentials: 'omit',
    cache: 'no-store',
    headers: {
      Accept: 'text/html,*/*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  });
  return res.ok ? cdnFromPleaseWaitHtml(await res.text(), id) : null;
}

export function initOceansofgamessResolve(): void {
  chrome.runtime.onMessage.addListener((msg: Partial<ResolveReq>, _s, reply) => {
    if (msg?.type !== MSG_OCEANSOFGAMESS_RESOLVE) return false;
    const id = typeof msg.id === 'string' ? msg.id : '';
    const filename = typeof msg.filename === 'string' ? msg.filename : '';
    const filesize = typeof msg.filesize === 'string' ? msg.filesize : '';
    if (!id || !filename) {
      reply({ url: null } satisfies ResolveRes);
      return false;
    }
    void mintCdn(id, filename, filesize)
      .then((url) => reply({ url } satisfies ResolveRes))
      .catch(() => reply({ url: null } satisfies ResolveRes));
    return true;
  });
}

export function requestOceansofgamessCdn(
  id: string,
  filename: string,
  filesize: string,
): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      chrome.runtime.sendMessage(
        { type: MSG_OCEANSOFGAMESS_RESOLVE, id, filename, filesize } satisfies ResolveReq,
        (res: ResolveRes | undefined) => {
          resolve(chrome.runtime.lastError ? null : (res?.url ?? null));
        },
      );
    } catch {
      resolve(null);
    }
  });
}
