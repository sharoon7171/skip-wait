import { isLicenseExp, isLicensePlan, LICENSE_KEY_RE, type LicenseSession } from './types';
import { newInstanceId } from './lease';

const INSTANCE_ID_KEY = 'skipWaitInstanceId';
const LICENSE_KEY = 'skipWaitLicenseKey';
const PLAN_KEY = 'skipWaitLicensePlan';
const APP_ID_KEY = 'skipWaitApplicationId';
const ACTIVATION_ID_KEY = 'skipWaitActivationId';
const ACTIVATION_TOKEN_KEY = 'skipWaitActivationToken';
const LEASE_KEY = 'skipWaitLease';
const NONCE_KEY = 'skipWaitLeaseNonce';
const LEASE_EXP_KEY = 'skipWaitLeaseExp';
const ENT_EXP_KEY = 'skipWaitEntExp';
const LEGACY_KEYS = ['skipWaitDeviceId', 'skipWaitLicenseExp'] as const;

const SESSION_KEYS = [
  LICENSE_KEY,
  PLAN_KEY,
  APP_ID_KEY,
  ACTIVATION_ID_KEY,
  ACTIVATION_TOKEN_KEY,
  LEASE_KEY,
  NONCE_KEY,
  LEASE_EXP_KEY,
  ENT_EXP_KEY,
] as const;

export const storageKeys = {
  licenseKey: LICENSE_KEY,
  leaseExp: LEASE_EXP_KEY,
  entExp: ENT_EXP_KEY,
} as const;

export const leaseIsLive = (exp: number): boolean => Date.now() < exp;

export const entitlementIsLive = (entExp: number | null): boolean =>
  entExp === null || Date.now() < entExp;

export const dropExpiredLicense = async (session?: LicenseSession | null): Promise<boolean> => {
  const current = session ?? (await getLicenseSession());
  if (!current || entitlementIsLive(current.entExp)) return false;
  await clearLicenseSession();
  return true;
};

export const getInstanceId = async (): Promise<string> => {
  const stored = await chrome.storage.local.get(INSTANCE_ID_KEY);
  const current = stored[INSTANCE_ID_KEY];
  if (
    typeof current === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(current)
  ) {
    return current;
  }
  const id = newInstanceId();
  await chrome.storage.local.set({ [INSTANCE_ID_KEY]: id });
  return id;
};

export const getStoredLicenseKey = async (): Promise<string | null> => {
  const stored = await chrome.storage.local.get(LICENSE_KEY);
  const key = stored[LICENSE_KEY];
  return typeof key === 'string' && LICENSE_KEY_RE.test(key) ? key : null;
};

export const getLicenseSession = async (): Promise<LicenseSession | null> => {
  const stored = await chrome.storage.local.get([...SESSION_KEYS, INSTANCE_ID_KEY]);
  const key = stored[LICENSE_KEY];
  const plan = stored[PLAN_KEY];
  const applicationId = stored[APP_ID_KEY];
  const activationId = stored[ACTIVATION_ID_KEY];
  const activationToken = stored[ACTIVATION_TOKEN_KEY];
  const instanceId = stored[INSTANCE_ID_KEY];
  const lease = stored[LEASE_KEY];
  const nonce = stored[NONCE_KEY];
  const leaseExp = stored[LEASE_EXP_KEY];
  const entExp = stored[ENT_EXP_KEY];
  if (
    typeof key !== 'string' ||
    !LICENSE_KEY_RE.test(key) ||
    !isLicensePlan(plan) ||
    typeof applicationId !== 'string' ||
    typeof activationId !== 'string' ||
    typeof activationToken !== 'string' ||
    typeof instanceId !== 'string' ||
    typeof lease !== 'string' ||
    typeof nonce !== 'string' ||
    !isLicenseExp(leaseExp) ||
    !(entExp === null || isLicenseExp(entExp))
  ) {
    return null;
  }
  return {
    key,
    plan,
    applicationId,
    activationId,
    activationToken,
    instanceId,
    lease,
    nonce,
    leaseExp,
    entExp,
  };
};

export const saveLicenseSession = async (session: LicenseSession): Promise<void> => {
  await chrome.storage.local.remove([...LEGACY_KEYS]);
  await chrome.storage.local.set({
    [INSTANCE_ID_KEY]: session.instanceId,
    [LICENSE_KEY]: session.key,
    [PLAN_KEY]: session.plan,
    [APP_ID_KEY]: session.applicationId,
    [ACTIVATION_ID_KEY]: session.activationId,
    [ACTIVATION_TOKEN_KEY]: session.activationToken,
    [LEASE_KEY]: session.lease,
    [NONCE_KEY]: session.nonce,
    [LEASE_EXP_KEY]: session.leaseExp,
    [ENT_EXP_KEY]: session.entExp,
  });
};

export const clearLicenseSession = async (): Promise<void> => {
  await chrome.storage.local.remove([...SESSION_KEYS, ...LEGACY_KEYS]);
  if (chrome.tabs?.query) {
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
      if (tab.id !== undefined) void chrome.tabs.reload(tab.id);
    }
  }
};
