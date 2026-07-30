const PASS = 'pcenxoqnzrc';
const BLOB_RE = /vexgoijaada='[^']*';\s*hgeyioahwuk='(\{.*?\})';/g;

type CipherJson = { ct: string; iv: string; s: string };

function hexToBytes(hex: string): Uint8Array {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function md5(data: Uint8Array): Uint8Array {
  const n = data.length;
  const bits = n * 8;
  let len = n + 1;
  while (len % 64 !== 56) len++;
  len += 8;
  const buf = new Uint8Array(len);
  buf.set(data);
  buf[n] = 0x80;
  const view = new DataView(buf.buffer);
  view.setUint32(len - 8, bits >>> 0, true);
  view.setUint32(len - 4, Math.floor(bits / 0x100000000), true);

  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;
  const S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9,
    14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15,
    21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];
  const K = Uint32Array.from({ length: 64 }, (_, i) =>
    Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000),
  );
  const rot = (x: number, s: number) => (x << s) | (x >>> (32 - s));

  for (let off = 0; off < len; off += 64) {
    const M = new Uint32Array(16);
    for (let i = 0; i < 16; i++) M[i] = view.getUint32(off + i * 4, true);
    let A = a;
    let B = b;
    let C = c;
    let D = d;
    for (let i = 0; i < 64; i++) {
      let f: number;
      let g: number;
      if (i < 16) {
        f = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        f = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        f = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        f = C ^ (B | ~D);
        g = (7 * i) % 16;
      }
      f = (f + A + K[i]! + M[g]!) >>> 0;
      A = D;
      D = C;
      C = B;
      B = (B + rot(f, S[i]!)) >>> 0;
    }
    a = (a + A) >>> 0;
    b = (b + B) >>> 0;
    c = (c + C) >>> 0;
    d = (d + D) >>> 0;
  }

  const out = new Uint8Array(16);
  const ov = new DataView(out.buffer);
  ov.setUint32(0, a, true);
  ov.setUint32(4, b, true);
  ov.setUint32(8, c, true);
  ov.setUint32(12, d, true);
  return out;
}

function evpKdf(password: Uint8Array, salt: Uint8Array, keyLen: number): Uint8Array {
  let block = new Uint8Array(0);
  const out = new Uint8Array(keyLen);
  let offset = 0;
  while (offset < keyLen) {
    const next = new Uint8Array(block.length + password.length + salt.length);
    next.set(block);
    next.set(password, block.length);
    next.set(salt, block.length + password.length);
    block = new Uint8Array(md5(next));
    const take = Math.min(16, keyLen - offset);
    out.set(block.subarray(0, take), offset);
    offset += take;
  }
  return out;
}

async function decryptBlob(json: string): Promise<string | null> {
  try {
    const data = JSON.parse(json) as CipherJson;
    if (!data.ct || !data.iv || !data.s) return null;
    const key = new Uint8Array(evpKdf(new TextEncoder().encode(PASS), hexToBytes(data.s), 32));
    const iv = new Uint8Array(hexToBytes(data.iv));
    const ct = new Uint8Array(base64ToBytes(data.ct));
    const cryptoKey = await crypto.subtle.importKey('raw', key, 'AES-CBC', false, ['decrypt']);
    const plain = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, cryptoKey, ct);
    const path = JSON.parse(new TextDecoder().decode(plain));
    return typeof path === 'string' && path ? `https://${path}` : null;
  } catch {
    return null;
  }
}

export async function cdnFromPleaseWaitHtml(html: string, originId?: string): Promise<string | null> {
  const blobs = [...html.matchAll(BLOB_RE)].map((m) => m[1]).filter(Boolean) as string[];
  if (blobs.length < 2) return null;
  const url = await decryptBlob(blobs[blobs.length - 1]!);
  return url && originId ? pinCdnToOrigin(url, originId) : url;
}

export function pinCdnToOrigin(url: string, id: string): string {
  if (!/^\d{1,3}(?:\.\d{1,3}){3}$/.test(id)) return url;
  try {
    const u = new URL(url);
    u.protocol = 'https:';
    u.host = `${id.replaceAll('.', '-')}.top`;
    return u.href;
  } catch {
    return url;
  }
}
