const GET_LINK = '/get-link-download';
const LL_RE = /^\/ll\/([^/]+)\/?$/i;
const L_RE = /^\/l\/([^/]+)\/?$/i;
const ENCRYPTED_RE = /^\/link-encrypted\/(.+)$/i;

export type OneShortlinkJob =
  | { kind: 'short_link'; id: string }
  | { kind: 'encrypted_link'; id: string };

export function oneShortlinkJob(pathname = location.pathname): OneShortlinkJob | null {
  const ll = pathname.match(LL_RE)?.[1];
  if (ll) return { kind: 'short_link', id: decodeURIComponent(ll) };
  const enc = pathname.match(ENCRYPTED_RE)?.[1];
  if (enc) return { kind: 'encrypted_link', id: decodeURIComponent(enc) };
  const l = pathname.match(L_RE)?.[1];
  if (l) return { kind: 'short_link', id: decodeURIComponent(l) };
  return null;
}

export function csrfFromPage(doc: Document = document): string | null {
  const fromLivewire = doc.querySelector('script[data-csrf]')?.getAttribute('data-csrf')?.trim();
  if (fromLivewire) return fromLivewire;
  const fromMeta = doc.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content?.trim();
  if (fromMeta) return fromMeta;
  const fromInput = doc.querySelector<HTMLInputElement>('input[name="_token"]')?.value?.trim();
  return fromInput || null;
}

type GetLinkOk = {
  status: string;
  redirect_url?: string;
  shortener_id?: number | string;
};

export async function postGetLinkDownload(job: OneShortlinkJob, token: string): Promise<string> {
  const body = new URLSearchParams({
    url: job.id,
    type: job.kind,
    _token: token,
  });
  const r = await fetch(GET_LINK, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body,
  });
  if (!r.ok) throw new Error(`get-link-download ${r.status}`);
  const j = (await r.json()) as GetLinkOk;
  const url = j.redirect_url?.trim();
  if (j.status !== 'success' || !url || !/^https?:\/\//i.test(url)) {
    throw new Error('get-link-download empty');
  }
  return url;
}
