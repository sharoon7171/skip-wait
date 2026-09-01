import { EAS_API, LICENSE_APPS, type LicenseApp } from './config';
import { randomBase64Url, verifyLease } from './lease';
import {
  clearLicenseSession,
  dropExpiredLicense,
  getInstanceId,
  getLicenseSession,
  leaseIsLive,
  saveLicenseSession,
} from './storage';
import { LICENSE_KEY_RE, type EasLicenseResult, type LicenseSession, type LicenseState } from './types';
import { verifyLicense } from './verify';

const REVOKE_ERRORS = new Set(['LICENSE_NOT_VALID', 'ACTIVATION_NOT_VALID']);

type PostResult =
  | { kind: 'network' }
  | { kind: 'response'; data: EasLicenseResult };

const hasLease = (data: EasLicenseResult): data is EasLicenseResult & { lease: string } =>
  typeof data.lease === 'string';

const isoMs = (value: string | null | undefined): number | null => {
  if (typeof value !== 'string' || !value) return null;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
};

const mergeEntExp = (jwt: number | null, api: number | null, prior: number | null): number | null => {
  const fromGrant = jwt !== null && api !== null ? Math.min(jwt, api) : jwt ?? api;
  return fromGrant ?? prior;
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

const acceptGrant = async (
  key: string,
  instanceId: string,
  nonce: string,
  applicationId: string,
  data: EasLicenseResult,
  prior?: { token?: string; entExp: number | null },
): Promise<LicenseState> => {
  if (!data.valid || !hasLease(data)) return { ok: false, error: data.error ?? 'GRANT_INCOMPLETE' };
  const activationToken = data.activation_token ?? prior?.token;
  if (!activationToken) return { ok: false, error: 'GRANT_INCOMPLETE' };
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
    activationToken,
    instanceId,
    lease: data.lease,
    nonce,
    leaseExp: verified.leaseExp,
    entExp: mergeEntExp(verified.entExp, isoMs(data.entitlement_expires_at), prior?.entExp ?? null),
  };
  await saveLicenseSession(session);
  return sessionState(session);
};

const validateWithServer = async (session: LicenseSession): Promise<LicenseState> => {
  if (await dropExpiredLicense(session)) return { ok: false, error: 'LICENSE_EXPIRED' };
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
  if (res.kind === 'network') {
    return (await verifyLicense()) ? sessionState(session) : { ok: false, error: 'LEASE_EXPIRED' };
  }
  if (!res.data.valid) {
    const error = res.data.error ?? 'VALIDATE_FAILED';
    if (error === 'LICENSE_EXPIRED' || REVOKE_ERRORS.has(error)) await clearLicenseSession();
    return { ok: false, error };
  }
  if (hasLease(res.data)) {
    return acceptGrant(session.key, session.instanceId, nonce, session.applicationId, res.data, {
      token: session.activationToken,
      entExp: session.entExp,
    });
  }
  return (await verifyLicense()) ? sessionState(session) : { ok: false, error: 'LEASE_EXPIRED' };
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

let refreshInFlight: Promise<LicenseState> | null = null;

export const refreshLicense = async (): Promise<LicenseState> => {
  if (refreshInFlight) return refreshInFlight;
  const run = async (): Promise<LicenseState> => {
    const session = await getLicenseSession();
    if (!session) return { ok: false, error: 'NO_KEY' };
    if (await dropExpiredLicense(session)) return { ok: false, error: 'LICENSE_EXPIRED' };
    return validateWithServer(session);
  };
  refreshInFlight = run().finally(() => {
    refreshInFlight = null;
  });
  return refreshInFlight;
};

export const ensureLicense = async (): Promise<boolean> => {
  if (await verifyLicense()) return true;
  const session = await getLicenseSession();
  if (!session || (await dropExpiredLicense(session))) return false;
  if (leaseIsLive(session.leaseExp)) return false;
  const refreshed = await refreshLicense();
  return refreshed.ok && (await verifyLicense());
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
