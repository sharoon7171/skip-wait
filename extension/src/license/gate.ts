import { LICENSE_API_URL } from './config';
import {
  clearLicenseSession,
  getDeviceId,
  getStoredLicenseKey,
  saveLicenseKey,
} from './storage';
import type { ActivateResponse, LicenseState } from './types';
import { LICENSE_KEY_RE } from './types';

const HARD_FAIL = new Set(['LICENSE_NOT_FOUND', 'LICENSE_EXPIRED', 'DEVICE_MISMATCH']);

const post = async (path: string, body: Record<string, string>): Promise<ActivateResponse> => {
  try {
    const res = await fetch(`${LICENSE_API_URL}${path}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
    return (await res.json()) as ActivateResponse;
  } catch {
    return { ok: false, error: 'NETWORK' };
  }
};

const normalizeKey = (raw: string): string | null => {
  const key = raw.trim().toUpperCase();
  return LICENSE_KEY_RE.test(key) ? key : null;
};

const applyValidateResponse = async (res: ActivateResponse): Promise<LicenseState> => {
  if (res.ok && res.plan && typeof res.exp === 'number') {
    return { ok: true, plan: res.plan, exp: res.exp };
  }
  if (res.error && HARD_FAIL.has(res.error)) await clearLicenseSession();
  return { ok: false, error: res.error ?? 'VALIDATE_FAILED' };
};

const validateWithServer = async (): Promise<LicenseState> => {
  const key = await getStoredLicenseKey();
  if (!key) return { ok: false, error: 'NO_KEY' };
  const deviceId = await getDeviceId();
  return applyValidateResponse(await post('/v1/validate', { key, deviceId }));
};

export const activateLicense = async (rawKey: string): Promise<LicenseState> => {
  const key = normalizeKey(rawKey);
  if (!key) return { ok: false, error: 'INVALID_KEY' };
  const deviceId = await getDeviceId();
  const res = await post('/v1/activate', { key, deviceId });
  if (!res.ok || !res.plan || typeof res.exp !== 'number') {
    return { ok: false, error: res.error ?? 'ACTIVATE_FAILED' };
  }
  await saveLicenseKey(key);
  return { ok: true, plan: res.plan, exp: res.exp };
};

export const refreshLicense = (): Promise<LicenseState> => validateWithServer();

export const verifyLicense = (): Promise<boolean> =>
  validateWithServer().then((state) => state.ok);
