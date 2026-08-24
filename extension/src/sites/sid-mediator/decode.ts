const HTTP_RE = /^https?:\/\//i;
const REFRESH_A =
  /http-equiv\s*=\s*["']?refresh["']?[^>]*content\s*=\s*["']([^"']+)["']/i;
const REFRESH_B =
  /content\s*=\s*["']([^"']+)["'][^>]*http-equiv\s*=\s*["']?refresh/i;

const bytesToBase64 = (buf: ArrayBuffer): string =>
  btoa(String.fromCharCode(...new Uint8Array(buf)));

export const deflateSid = async (sid: string): Promise<string> => {
  const buf = await new Response(
    new Blob([sid]).stream().pipeThrough(new CompressionStream('deflate')),
  ).arrayBuffer();
  return bytesToBase64(buf);
};

export const cookieName = (): string => {
  const hex = [...crypto.getRandomValues(new Uint8Array(6))]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `pepe-${hex}`;
};

const hrefFromRefresh = (content: string, base: string): string | null => {
  const raw = /url\s*=\s*(.+)/i.exec(content)?.[1]?.trim().replace(/^['"]|['"]$/g, '');
  if (!raw) return null;
  try {
    const href = new URL(raw, base).href;
    return HTTP_RE.test(href) ? href : null;
  } catch {
    return null;
  }
};

export const destinationFromDecryptHtml = (html: string, base: string): string | null => {
  const content = html.match(REFRESH_A)?.[1] ?? html.match(REFRESH_B)?.[1];
  return content ? hrefFromRefresh(content, base) : null;
};

export async function decryptSidDestination(sid: string): Promise<string> {
  const name = cookieName();
  document.cookie = `${name}=${await deflateSid(sid)};path=/;max-age=3600;samesite=lax`;
  const decryptUrl = `${location.origin}/?go=${encodeURIComponent(name)}`;
  const res = await fetch(decryptUrl, {
    credentials: 'include',
    cache: 'no-store',
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`decrypt ${res.status}`);
  const dest = destinationFromDecryptHtml(await res.text(), res.url || decryptUrl);
  if (!dest) throw new Error('decrypt empty');
  return dest;
}
