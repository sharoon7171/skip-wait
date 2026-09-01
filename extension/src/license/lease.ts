import { EAS_ISS, PINNED_PUBLIC_KEY, appById } from './config';
import type { LicensePlan } from './config';

const SKEW_MS = 120_000;
const B64URL_RE = /^[A-Za-z0-9_-]+$/;

export const randomBase64Url = (bytes: number): string => {
  const buf = crypto.getRandomValues(new Uint8Array(bytes));
  return btoa(String.fromCharCode(...buf))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/u, '');
};

export const newInstanceId = (): string => crypto.randomUUID();

const padB64 = (value: string): string => value + '='.repeat((4 - (value.length % 4)) % 4);

const b64UrlToBytes = (value: string): Uint8Array<ArrayBuffer> => {
  const bin = atob(padB64(value).replace(/-/g, '+').replace(/_/g, '/'));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
};

export type VerifiedLease = {
  plan: LicensePlan;
  applicationId: string;
  activationId: string;
  nonce: string;
  leaseExp: number;
  entExp: number | null;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isUnix = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value > 0;

const parseJsonB64Url = (part: string): unknown => {
  if (!B64URL_RE.test(part)) return null;
  return JSON.parse(new TextDecoder().decode(b64UrlToBytes(part))) as unknown;
};

let importedSpki: string | null = null;
let importedKey: CryptoKey | null = null;

const importVerifyKey = async (spkiB64Url: string): Promise<CryptoKey> => {
  if (importedSpki === spkiB64Url && importedKey) return importedKey;
  const key = await crypto.subtle.importKey(
    'spki',
    b64UrlToBytes(spkiB64Url),
    { name: 'Ed25519' },
    false,
    ['verify'],
  );
  importedSpki = spkiB64Url;
  importedKey = key;
  return key;
};

const spkiForKid = async (kid: string): Promise<string | null> => {
  if (kid === PINNED_PUBLIC_KEY.kid) return PINNED_PUBLIC_KEY.public_key;
  try {
    const res = await fetch('https://eas-x.com/api/v1/licenses/public-key', { cache: 'no-store' });
    if (!res.ok) return null;
    const body: unknown = await res.json();
    if (!isRecord(body)) return null;
    if (body['alg'] !== 'EdDSA' || body['type'] !== 'EAS-LICENSE') return null;
    if (body['kid'] !== kid) return null;
    const pk = body['public_key'];
    return typeof pk === 'string' && pk.length > 0 ? pk : null;
  } catch {
    return null;
  }
};

export const verifyLease = async (lease: string, expect: { applicationId: string; nonce: string }): Promise<VerifiedLease | null> => {
  const parts = lease.split('.');
  if (parts.length !== 3) return null;
  const [hPart, pPart, sPart] = parts;
  if (!hPart || !pPart || !sPart) return null;
  let header: unknown;
  let payload: unknown;
  try {
    header = parseJsonB64Url(hPart);
    payload = parseJsonB64Url(pPart);
  } catch {
    return null;
  }
  if (!isRecord(header) || !isRecord(payload)) return null;
  if (header['alg'] !== 'EdDSA' || header['typ'] !== 'EAS-LICENSE') return null;
  const kid = header['kid'];
  if (typeof kid !== 'string' || kid.length === 0) return null;
  const spki = await spkiForKid(kid);
  if (!spki) return null;
  const key = await importVerifyKey(spki);
  const ok = await crypto.subtle.verify(
    'Ed25519',
    key,
    b64UrlToBytes(sPart),
    new TextEncoder().encode(`${hPart}.${pPart}`),
  );
  if (!ok) return null;
  if (payload['v'] !== 1 || payload['iss'] !== EAS_ISS) return null;
  const aud = payload['aud'];
  const nonce = payload['nonce'];
  const act = payload['act'];
  const iat = payload['iat'];
  const exp = payload['exp'];
  if (typeof aud !== 'string' || aud !== expect.applicationId) return null;
  if (typeof nonce !== 'string' || nonce !== expect.nonce) return null;
  if (typeof act !== 'string' || act.length === 0) return null;
  if (!isUnix(iat) || !isUnix(exp)) return null;
  const now = Date.now();
  if (iat * 1000 > now + SKEW_MS) return null;
  if (exp * 1000 <= now - SKEW_MS) return null;
  const entRaw = payload['ent_exp'];
  const entExp = entRaw === null || entRaw === undefined ? null : isUnix(entRaw) ? entRaw * 1000 : null;
  if (entRaw !== null && entRaw !== undefined && entExp === null) return null;
  if (entExp !== null && entExp <= now) return null;
  const app = appById(aud);
  if (!app) return null;
  return {
    plan: app.plan,
    applicationId: aud,
    activationId: act,
    nonce,
    leaseExp: exp * 1000,
    entExp,
  };
};
