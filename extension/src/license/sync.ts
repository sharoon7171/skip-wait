import { refreshLicense } from './gate';
import { getLicenseSession, storageKeys } from './storage';
import { verifyLicense } from './verify';

const HOURLY_ALARM = 'skipWaitLicenseHourly';
const EXPIRY_ALARM = 'skipWaitLicenseExpiry';

const ensureHourlyAlarm = async (): Promise<void> => {
  if (await chrome.alarms.get(HOURLY_ALARM)) return;
  await chrome.alarms.create(HOURLY_ALARM, { periodInMinutes: 60 });
};

const scheduleExpiryAlarm = async (): Promise<void> => {
  await chrome.alarms.clear(EXPIRY_ALARM);
  if (!(await verifyLicense())) return;
  const session = await getLicenseSession();
  if (!session) return;
  await chrome.alarms.create(EXPIRY_ALARM, { when: session.exp });
};

const syncLicense = (): void => {
  void verifyLicense();
  void refreshLicense();
};

export const initLicenseSync = (): void => {
  chrome.runtime.onStartup.addListener(syncLicense);
  chrome.runtime.onInstalled.addListener(() => {
    void ensureHourlyAlarm();
    syncLicense();
  });
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === HOURLY_ALARM) syncLicense();
    if (alarm.name === EXPIRY_ALARM) void verifyLicense();
  });
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    if (storageKeys.licenseExp in changes) void scheduleExpiryAlarm();
    const keyChange = changes[storageKeys.licenseKey];
    if (keyChange && keyChange.oldValue !== keyChange.newValue) chrome.runtime.reload();
  });
  void ensureHourlyAlarm();
  void scheduleExpiryAlarm();
  syncLicense();
};
