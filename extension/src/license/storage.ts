const DEVICE_ID_KEY = 'skipWaitDeviceId';
const LICENSE_KEY = 'skipWaitLicenseKey';

export const storageKeys = {
  deviceId: DEVICE_ID_KEY,
  licenseKey: LICENSE_KEY,
} as const;

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
  return typeof key === 'string' && /^SW-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(key) ? key : null;
};

export const saveLicenseKey = async (key: string): Promise<void> => {
  await chrome.storage.local.set({ [LICENSE_KEY]: key });
};

export const clearLicenseSession = async (): Promise<void> => {
  await chrome.storage.local.remove([
    LICENSE_KEY,
    'skipWaitLicenseTicket',
    'skipWaitLicenseExp',
    'skipWaitLicensePlan',
    'skipWaitLicenseRev',
  ]);
  if (typeof chrome !== 'undefined' && chrome.tabs?.query) {
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
      if (tab.id !== undefined) void chrome.tabs.reload(tab.id);
    }
  }
};
