const DELIM = 'wApbsCadfEeFlgiHnik';
const HTTP_RE = /^https?:\/\//i;
const TOKEN_KEYS = ['safelink_redirect', 'wpsafelink', 'safelink'] as const;

type RedirectJson = { safelink?: string; second_safelink_url?: string };

const padB64 = (value: string): string => {
  const raw = value.replace(/-/g, '=');
  return raw + '='.repeat((4 - (raw.length % 4)) % 4);
};

const atobBytes = (value: string): Uint8Array => {
  const bin = atob(padB64(value));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};

const pkcs7Unpad = (data: Uint8Array): Uint8Array | null => {
  if (!data.length) return null;
  const n = data[data.length - 1]!;
  if (n < 1 || n > 16 || n > data.length) return null;
  for (let i = data.length - n; i < data.length; i++) if (data[i] !== n) return null;
  return data.subarray(0, data.length - n);
};

const aes256EcbDecrypt = async (keyStr: string, ct: Uint8Array): Promise<string | null> => {
  if (ct.length === 0 || ct.length % 16 !== 0) return null;
  const raw = new TextEncoder().encode(keyStr);
  const keyBytes = new Uint8Array(32);
  keyBytes.set(raw.subarray(0, 32));
  const key = await crypto.subtle.importKey('raw', keyBytes, 'AES-CBC', false, ['encrypt', 'decrypt']);
  const zero = new Uint8Array(16);
  const out = new Uint8Array(ct.length);
  for (let i = 0; i < ct.length; i += 16) {
    const block = new Uint8Array(ct.slice(i, i + 16));
    const padCt = new Uint8Array(
      await crypto.subtle.encrypt({ name: 'AES-CBC', iv: block }, key, new Uint8Array()),
    );
    const buf = new Uint8Array(block.length + padCt.length);
    buf.set(block);
    buf.set(padCt, block.length);
    out.set(new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-CBC', iv: zero }, key, buf)), i);
  }
  const plain = pkcs7Unpad(out);
  if (!plain) return null;
  return new TextDecoder().decode(plain);
};

const decryptDelimited = async (token: string): Promise<string | null> => {
  const at = token.indexOf(DELIM);
  if (at < 1) return null;
  const inner = new TextDecoder().decode(atobBytes(token.slice(at + DELIM.length)));
  return aes256EcbDecrypt(token.slice(0, at), atobBytes(inner));
};

const decodeB64Text = (token: string): string | null => {
  try {
    const text = new TextDecoder().decode(atobBytes(token));
    return text || null;
  } catch {
    return null;
  }
};

const destFromJson = (raw: string): string | null => {
  try {
    const data = JSON.parse(raw) as RedirectJson;
    const enc = data.second_safelink_url || data.safelink;
    if (!enc) return null;
    const dest = decodeURIComponent(enc);
    return HTTP_RE.test(dest) ? dest : null;
  } catch {
    return null;
  }
};

const peelText = async (raw: string, depth: number): Promise<string | null> => {
  if (depth > 8) return null;
  const text = raw.trim();
  if (!text) return null;
  if (HTTP_RE.test(text)) {
    const nested = await destFromHref(text, depth + 1);
    return nested ?? text;
  }
  const json = destFromJson(text);
  if (json) return peelText(json, depth + 1);
  const aes = await decryptDelimited(text);
  if (aes) return peelText(aes, depth + 1);
  const b64 = decodeB64Text(text);
  if (b64 && b64 !== text) return peelText(b64, depth + 1);
  return null;
};

export const hrefHasSafelinkToken = (href: string): boolean => {
  try {
    const url = new URL(href);
    return TOKEN_KEYS.some((key) => Boolean(url.searchParams.get(key)));
  } catch {
    return false;
  }
};

export const destFromHref = async (href: string, depth = 0): Promise<string | null> => {
  if (depth > 8) return null;
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }
  for (const key of TOKEN_KEYS) {
    const token = url.searchParams.get(key);
    if (!token) continue;
    const next = key === 'safelink' ? decodeB64Text(token) : await decryptDelimited(token);
    if (!next) {
      const json = destFromJson(decodeB64Text(token) ?? '');
      if (json) return peelText(json, depth + 1);
      continue;
    }
    const dest = await peelText(next, depth + 1);
    if (dest && dest !== href) return dest;
  }
  return null;
};

export const destFromLocation = (): Promise<string | null> => destFromHref(location.href);
