import { cdnFromPleaseWaitHtml } from './decrypt';
import { OCEANOFGAMES_PLEASE_WAIT } from './hosts';

export const MSG_OCEANOFGAMES_RESOLVE = 'OCEANOFGAMES_RESOLVE_CDN' as const;

type ResolveReq = {
  type: typeof MSG_OCEANOFGAMES_RESOLVE;
  id: string;
  filename: string;
  filesize: string;
};

type ResolveRes = { url: string | null };

async function mintCdn(id: string, filename: string, filesize: string): Promise<string | null> {
  const res = await fetch(OCEANOFGAMES_PLEASE_WAIT, {
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

export function initOceanofgamesResolve(): void {
  chrome.runtime.onMessage.addListener((msg: Partial<ResolveReq>, _s, reply) => {
    if (msg?.type !== MSG_OCEANOFGAMES_RESOLVE) return false;
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

export function requestOceanofgamesCdn(
  id: string,
  filename: string,
  filesize: string,
): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      chrome.runtime.sendMessage(
        { type: MSG_OCEANOFGAMES_RESOLVE, id, filename, filesize } satisfies ResolveReq,
        (res: ResolveRes | undefined) => {
          resolve(chrome.runtime.lastError ? null : (res?.url ?? null));
        },
      );
    } catch {
      resolve(null);
    }
  });
}
