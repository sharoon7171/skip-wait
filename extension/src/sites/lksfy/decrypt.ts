const KEY_SALT = 'sDye71jNq5';
const IV_SALT = '7M9u8DG4X';

function padBase64(value: string): string {
  const raw = value.replace(/\s+/g, '');
  return raw + '='.repeat((4 - (raw.length % 4)) % 4);
}

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

function base64ToBytes(value: string): Uint8Array {
  const bin = atob(padBase64(value));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export async function decryptLinkshortifyPayload(
  payload: string,
  alias: string,
): Promise<string | null> {
  const trimmed = payload.trim();
  if (!trimmed || !alias) return null;
  try {
    const keyText = (await sha256Hex(KEY_SALT + alias)).slice(0, 32);
    const ivText = (await sha256Hex(IV_SALT + alias)).slice(0, 16);
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(keyText),
      { name: 'AES-CBC' },
      false,
      ['decrypt'],
    );
    const inner = atob(padBase64(trimmed));
    const plain = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv: new TextEncoder().encode(ivText) },
      key,
      new Uint8Array(base64ToBytes(inner)),
    );
    return new TextDecoder('utf-8').decode(plain).trim() || null;
  } catch {
    return null;
  }
}

export async function resolveLinkshortifyUrl(raw: string, alias: string): Promise<string | null> {
  const value = raw.trim();
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  const plain = await decryptLinkshortifyPayload(value, alias);
  return plain && /^https?:\/\//i.test(plain) ? plain : null;
}
