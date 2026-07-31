const DEFAULT_SECRET = 'yasir252_encode_2025_x7k3m9w2';
const SECRET_RE = /encodeSecret\s*=\s*"([^"]+)"/;
const HTTP_RE = /^https?:\/\//i;

function encodeSecret(): string {
  for (const script of document.querySelectorAll('script')) {
    const match = SECRET_RE.exec(script.textContent ?? '');
    if (match?.[1]) return match[1];
  }
  return DEFAULT_SECRET;
}

export function decodeYasir252Link(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const encoded = raw.trim();
  if (HTTP_RE.test(encoded)) return encoded;
  const secret = encodeSecret();
  try {
    const bin = atob(encoded);
    let out = '';
    for (let i = 0; i < bin.length; i++) {
      out += String.fromCharCode(bin.charCodeAt(i) ^ secret.charCodeAt(i % secret.length));
    }
    return HTTP_RE.test(out) ? out : null;
  } catch {
    return null;
  }
}

export function encodedAttr(el: Element): string | null {
  return el.getAttribute('data-og-url') ?? el.getAttribute('data-elink');
}
