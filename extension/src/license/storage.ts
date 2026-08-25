import { isLicenseExp, isLicensePlan, LICENSE_KEY_RE, type LicenseSession } from './types';

const DEVICE_ID_KEY = 'skipWaitDeviceId';
const LICENSE_KEY = 'skipWaitLicenseKey';
const LICENSE_EXP_KEY = 'skipWaitLicenseExp';
const LICENSE_PLAN_KEY = 'skipWaitLicensePlan';

export const storageKeys = {
  licenseKey: LICENSE_KEY,
  licenseExp: LICENSE_EXP_KEY,
} as const;

export const licenseIsLive = (exp: number): boolean => Date.now() < exp;

export const getDeviceId = async (): Promise<string> => {
  const stored = await chrome.storage.local.get(DEVICE_ID_KEY);
  const current = stored[DEVICE_ID_KEY];
  if (typeof current === 'string' && /^[a-f0-9]{32}$/.test(current)) return current;
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const id = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  await chrome.storage.local.set({ [DEVICE_ID_KEY]: id });
  return id;
};

export const getStoredLicenseKey = async (): Promise<string | null> => {
  const stored = await chrome.storage.local.get(LICENSE_KEY);
  const key = stored[LICENSE_KEY];
  return typeof key === 'string' && LICENSE_KEY_RE.test(key) ? key : null;
};

export const getLicenseSession = async (): Promise<LicenseSession | null> => {
  const stored = await chrome.storage.local.get([LICENSE_KEY, LICENSE_EXP_KEY, LICENSE_PLAN_KEY]);
  const key = stored[LICENSE_KEY];
  const exp = stored[LICENSE_EXP_KEY];
  const plan = stored[LICENSE_PLAN_KEY];
  if (typeof key !== 'string' || !LICENSE_KEY_RE.test(key) || !isLicensePlan(plan) || !isLicenseExp(exp)) {
    return null;
  }
  return { key, plan, exp };
};

export const saveLicenseSession = async (session: LicenseSession): Promise<void> => {
  await chrome.storage.local.set({
    [LICENSE_KEY]: session.key,
    [LICENSE_EXP_KEY]: session.exp,
    [LICENSE_PLAN_KEY]: session.plan,
  });
};

export const clearLicenseSession = async (): Promise<void> => {
  await chrome.storage.local.remove([LICENSE_KEY, LICENSE_EXP_KEY, LICENSE_PLAN_KEY]);
  if (chrome.tabs?.query) {
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
      if (tab.id !== undefined) void chrome.tabs.reload(tab.id);
    }
  }
};
