import { EAS_API, LICENSE_APPS, type LicenseApp } from './config';
import { randomBase64Url, verifyLease } from './lease';
import {
  clearLicenseSession,
  getInstanceId,
  getLicenseSession,
  saveLicenseSession,
} from './storage';
import { LICENSE_KEY_RE, type EasLicenseResult, type LicenseSession, type LicenseState } from './types';
import { verifyLicense } from './verify';

const REVOKE_ERRORS = new Set(['LICENSE_NOT_VALID', 'ACTIVATION_NOT_VALID', 'LICENSE_EXPIRED']);

type PostResult =
  | { kind: 'network' }
  | { kind: 'response'; data: EasLicenseResult };

const hasGrant = (data: EasLicenseResult): data is EasLicenseResult & {
  lease: string;
  activation_token: string;
} => typeof data.lease === 'string' && typeof data.activation_token === 'string';

const isoMs = (value: string | null | undefined): number | null => {
  if (typeof value !== 'string' || !value) return null;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
};

const mergeEntExp = (jwtEntExp: number | null, apiEntExp: number | null): number | null => {
  if (jwtEntExp !== null && apiEntExp !== null) return Math.min(jwtEntExp, apiEntExp);
  return jwtEntExp ?? apiEntExp;
};

const postJson = async (
  path: string,
  body: Record<string, string>,
  idempotency: boolean,
): Promise<PostResult> => {
  try {
    const headers: Record<string, string> = { 'content-type': 'application/json' };
    if (idempotency) headers['idempotency-key'] = randomBase64Url(32);
    const res = await fetch(`${EAS_API}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      cache: 'no-store',
    });
    let data: EasLicenseResult;
    try {
      data = (await res.json()) as EasLicenseResult;
    } catch {
      return { kind: 'network' };
    }
    return { kind: 'response', data };
  } catch {
    return { kind: 'network' };
  }
};

const normalizeKey = (raw: string): string | null => {
  const key = raw.trim().toUpperCase();
  return LICENSE_KEY_RE.test(key) ? key : null;
};

const sessionState = (session: LicenseSession): LicenseState => ({
  ok: true,
  plan: session.plan,
  leaseExp: session.leaseExp,
  entExp: session.entExp,
});

const offlineWhileUnreachable = async (): Promise<LicenseState> => {
  const session = await getLicenseSession();
  if (!session) return { ok: false, error: 'NO_KEY' };
  if (await verifyLicense()) return sessionState(session);
  return { ok: false, error: 'LEASE_EXPIRED' };
};

const acceptGrant = async (
  key: string,
  instanceId: string,
  nonce: string,
  applicationId: string,
  data: EasLicenseResult,
): Promise<LicenseState> => {
  if (!data.valid || !hasGrant(data)) return { ok: false, error: data.error ?? 'GRANT_INCOMPLETE' };
  const appId = typeof data.application_id === 'string' ? data.application_id : applicationId;
  const verified = await verifyLease(data.lease, { applicationId: appId, nonce });
  if (!verified) return { ok: false, error: 'LEASE_INVALID' };
  if (typeof data.activation_id === 'string' && data.activation_id !== verified.activationId) {
    return { ok: false, error: 'LEASE_INVALID' };
  }
  const session: LicenseSession = {
    key,
    plan: verified.plan,
    applicationId: verified.applicationId,
    activationId: verified.activationId,
    activationToken: data.activation_token,
    instanceId,
    lease: data.lease,
    nonce,
    leaseExp: verified.leaseExp,
    entExp: mergeEntExp(verified.entExp, isoMs(data.entitlement_expires_at)),
  };
  await saveLicenseSession(session);
  return sessionState(session);
};

const validateWithServer = async (session: LicenseSession): Promise<LicenseState> => {
  const nonce = randomBase64Url(32);
  const res = await postJson(
    '/validate',
    {
      activation_token: session.activationToken,
      instance_id: session.instanceId,
      nonce,
    },
    false,
  );
  if (res.kind === 'network') return offlineWhileUnreachable();
  if (!res.data.valid) {
    const error = res.data.error ?? 'VALIDATE_FAILED';
    if (REVOKE_ERRORS.has(error)) await clearLicenseSession();
    return { ok: false, error };
  }
  if (hasGrant(res.data)) {
    const granted = await acceptGrant(session.key, session.instanceId, nonce, session.applicationId, res.data);
    if (!granted.ok) await clearLicenseSession();
    return granted;
  }
  if (!(await verifyLicense())) return { ok: false, error: 'LEASE_EXPIRED' };
  const current = await getLicenseSession();
  return current ? sessionState(current) : { ok: false, error: 'NO_KEY' };
};

const activateOnApp = async (app: LicenseApp, key: string, instanceId: string): Promise<LicenseState> => {
  const nonce = randomBase64Url(32);
  const res = await postJson(
    '/activate',
    {
      application_id: app.id,
      license_key: key,
      instance_id: instanceId,
      nonce,
    },
    true,
  );
  if (res.kind === 'network') return { ok: false, error: 'NETWORK' };
  if (!res.data.valid) return { ok: false, error: res.data.error ?? 'ACTIVATE_FAILED' };
  return acceptGrant(key, instanceId, nonce, app.id, res.data);
};

export const activateLicense = async (rawKey: string): Promise<LicenseState> => {
  const key = normalizeKey(rawKey);
  if (!key) return { ok: false, error: 'INVALID_KEY' };
  const instanceId = await getInstanceId();
  let last: LicenseState = { ok: false, error: 'LICENSE_NOT_VALID' };
  for (const app of LICENSE_APPS) {
    const state = await activateOnApp(app, key, instanceId);
    if (state.ok) return state;
    if (state.error === 'NETWORK') return state;
    if (state.error === 'DEVICE_LIMIT_REACHED') {
      const session = await getLicenseSession();
      if (session?.key === key && session.instanceId === instanceId) {
        return validateWithServer(session);
      }
      return state;
    }
    if (state.error === 'LICENSE_NOT_VALID') {
      last = state;
      continue;
    }
    return state;
  }
  return last;
};

export const refreshLicense = async (): Promise<LicenseState> => {
  const session = await getLicenseSession();
  if (!session) return { ok: false, error: 'NO_KEY' };
  return validateWithServer(session);
};

export const ensureLicense = async (): Promise<boolean> => {
  if (await verifyLicense()) return true;
  const session = await getLicenseSession();
  if (!session) return false;
  const now = Date.now();
  if (session.entExp !== null && session.entExp <= now) return false;
  if (session.leaseExp <= now) return (await refreshLicense()).ok;
  return false;
};

export const deactivateLicense = async (): Promise<void> => {
  const session = await getLicenseSession();
  if (session) {
    await postJson(
      '/deactivate',
      {
        activation_token: session.activationToken,
        instance_id: session.instanceId,
      },
      true,
    );
  }
  await clearLicenseSession();
};
