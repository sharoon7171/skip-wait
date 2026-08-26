import {
  generateLicenseKey,
  json,
  licenseKvKey,
  parseDeviceId,
  parseLicenseKey,
  planDurationMs,
  timingSafeEqual,
} from './crypto';
import type { ClientBody, LicensePlan, LicenseRecord } from './types';

type Env = {
  LICENSES: KVNamespace;
  ADMIN_SECRET: string;
};

const now = (): number => Date.now();

const normalizeRecord = (record: LicenseRecord): LicenseRecord => ({
  ...record,
  rev: typeof record.rev === 'number' ? record.rev : 0,
});

const loadLicense = async (env: Env, key: string): Promise<LicenseRecord | null> => {
  const raw = await env.LICENSES.get(licenseKvKey(key), { cacheTtl: 30 });
  if (!raw) return null;
  try {
    return normalizeRecord(JSON.parse(raw) as LicenseRecord);
  } catch {
    return null;
  }
};

const saveLicense = (env: Env, record: LicenseRecord): Promise<void> =>
  env.LICENSES.put(licenseKvKey(record.key), JSON.stringify(record));

const reject = (code: string, status: number): Response => json({ ok: false, error: code }, status);

const okLicense = (plan: LicensePlan, exp: number): Response => json({ ok: true, plan, exp });

const assertClient = (body: ClientBody | null): { key: string; deviceId: string } | Response => {
  if (!body?.key || !body.deviceId) return reject('INVALID_BODY', 400);
  const key = parseLicenseKey(body.key);
  const deviceId = parseDeviceId(body.deviceId);
  if (!key || !deviceId) return reject('INVALID_BODY', 400);
  return { key, deviceId };
};

const checkLicense = (record: LicenseRecord | null): Response | LicenseRecord => {
  if (!record || record.status === 'revoked') return reject('LICENSE_NOT_FOUND', 404);
  if (record.exp !== null && record.exp <= now()) return reject('LICENSE_EXPIRED', 403);
  return record;
};

export const activateLicense = async (env: Env, body: ClientBody | null): Promise<Response> => {
  const parsed = assertClient(body);
  if (parsed instanceof Response) return parsed;
  const record = checkLicense(await loadLicense(env, parsed.key));
  if (record instanceof Response) return record;
  if (record.deviceId && record.deviceId !== parsed.deviceId) return reject('DEVICE_MISMATCH', 403);
  let dirty = false;
  if (!record.deviceId) {
    record.deviceId = parsed.deviceId;
    dirty = true;
  }
  let exp = record.exp;
  if (exp === null) {
    exp = now() + planDurationMs(record.plan);
    record.exp = exp;
    dirty = true;
  }
  if (dirty) await saveLicense(env, record);
  return okLicense(record.plan, exp);
};

export const validateLicense = async (env: Env, body: ClientBody | null): Promise<Response> => {
  const parsed = assertClient(body);
  if (parsed instanceof Response) return parsed;
  const record = checkLicense(await loadLicense(env, parsed.key));
  if (record instanceof Response) return record;
  if (record.deviceId !== parsed.deviceId) return reject('DEVICE_MISMATCH', 403);
  if (record.exp === null) return reject('LICENSE_NOT_ACTIVATED', 403);
  return okLicense(record.plan, record.exp);
};

export const issueLicense = async (env: Env, plan: LicensePlan): Promise<Response> => {
  const issuedAt = now();
  const record: LicenseRecord = {
    key: generateLicenseKey(),
    plan,
    status: 'active',
    exp: null,
    deviceId: null,
    issuedAt,
    rev: 0,
  };
  await saveLicense(env, record);
  return json({ ok: true, key: record.key, plan: record.plan, exp: record.exp });
};

export const unbindLicense = async (env: Env, key: string): Promise<Response> => {
  const parsed = parseLicenseKey(key);
  if (!parsed) return reject('INVALID_BODY', 400);
  const record = await loadLicense(env, parsed);
  if (!record || record.status === 'revoked') return reject('LICENSE_NOT_FOUND', 404);
  record.deviceId = null;
  await saveLicense(env, record);
  return json({ ok: true, key: record.key, deviceId: null });
};

export const revokeLicense = async (env: Env, key: string): Promise<Response> => {
  const parsed = parseLicenseKey(key);
  if (!parsed) return reject('INVALID_BODY', 400);
  const record = await loadLicense(env, parsed);
  if (!record) return reject('LICENSE_NOT_FOUND', 404);
  record.status = 'revoked';
  record.rev += 1;
  record.deviceId = null;
  await saveLicense(env, record);
  return json({ ok: true, key: record.key, status: record.status });
};

export const deleteLicense = async (env: Env, key: string): Promise<Response> => {
  const parsed = parseLicenseKey(key);
  if (!parsed) return reject('INVALID_BODY', 400);
  await env.LICENSES.delete(licenseKvKey(parsed));
  return json({ ok: true, key: parsed });
};

export const isAdmin = (env: Env, request: Request): boolean => {
  if (!env.ADMIN_SECRET) return false;
  const header = request.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) return false;
  const token = header.slice(7);
  if (!token) return false;
  return timingSafeEqual(token, env.ADMIN_SECRET);
};
