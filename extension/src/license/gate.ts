import { LICENSE_API_URL } from './config';
import {
  clearLicenseSession,
  getDeviceId,
  getLicenseSession,
  getStoredLicenseKey,
  licenseIsLive,
  saveLicenseSession,
} from './storage';
import { isLicenseExp, isLicensePlan, LICENSE_KEY_RE, type ActivateResponse, type LicenseState } from './types';

const HARD_FAIL = new Set(['LICENSE_NOT_FOUND', 'LICENSE_EXPIRED', 'DEVICE_MISMATCH']);

let hydrate: Promise<boolean> | null = null;

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

const persistLive = async (plan: unknown, exp: unknown): Promise<LicenseState | null> => {
  if (!isLicensePlan(plan) || !isLicenseExp(exp) || !licenseIsLive(exp)) return null;
  const key = await getStoredLicenseKey();
  if (!key) return { ok: false, error: 'NO_KEY' };
  await saveLicenseSession({ key, plan, exp });
  return { ok: true, plan, exp };
};

const applyValidateResponse = async (res: ActivateResponse): Promise<LicenseState> => {
  if (res.ok) {
    const live = await persistLive(res.plan, res.exp);
    if (live) return live;
  }
  if (res.ok && isLicenseExp(res.exp) && !licenseIsLive(res.exp)) {
    await clearLicenseSession();
    return { ok: false, error: 'LICENSE_EXPIRED' };
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
  if (!res.ok) return { ok: false, error: res.error ?? 'ACTIVATE_FAILED' };
  if (!isLicensePlan(res.plan) || !isLicenseExp(res.exp) || !licenseIsLive(res.exp)) {
    return { ok: false, error: res.error ?? 'ACTIVATE_FAILED' };
  }
  await saveLicenseSession({ key, plan: res.plan, exp: res.exp });
  return { ok: true, plan: res.plan, exp: res.exp };
};

export const refreshLicense = (): Promise<LicenseState> => validateWithServer();

export const verifyLicense = async (): Promise<boolean> => {
  const session = await getLicenseSession();
  if (session) {
    if (licenseIsLive(session.exp)) return true;
    await clearLicenseSession();
    return false;
  }
  if (!(await getStoredLicenseKey())) return false;
  if (!hydrate) {
    hydrate = validateWithServer()
      .then((state) => state.ok)
      .finally(() => {
        hydrate = null;
      });
  }
  return hydrate;
};
