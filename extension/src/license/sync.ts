import { refreshLicense } from './gate';
import { clearLicenseSession, getLicenseSession, licenseIsLive, storageKeys } from './storage';

const HOURLY_ALARM = 'skipWaitLicenseHourly';
const EXPIRY_ALARM = 'skipWaitLicenseExpiry';

const ensureHourlyAlarm = async (): Promise<void> => {
  if (await chrome.alarms.get(HOURLY_ALARM)) return;
  await chrome.alarms.create(HOURLY_ALARM, { periodInMinutes: 60 });
};

const scheduleExpiryAlarm = async (): Promise<void> => {
  await chrome.alarms.clear(EXPIRY_ALARM);
  const session = await getLicenseSession();
  if (!session) return;
  if (!licenseIsLive(session.exp)) {
    await clearLicenseSession();
    return;
  }
  await chrome.alarms.create(EXPIRY_ALARM, { when: session.exp });
};

const expireIfDue = async (): Promise<void> => {
  const session = await getLicenseSession();
  if (session && !licenseIsLive(session.exp)) await clearLicenseSession();
};

export const initLicenseSync = (): void => {
  chrome.runtime.onStartup.addListener(() => {
    void refreshLicense();
  });
  chrome.runtime.onInstalled.addListener(() => {
    void ensureHourlyAlarm();
    void refreshLicense();
  });
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === HOURLY_ALARM) void refreshLicense();
    if (alarm.name === EXPIRY_ALARM) void expireIfDue();
  });
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    if (storageKeys.licenseExp in changes) void scheduleExpiryAlarm();
    const keyChange = changes[storageKeys.licenseKey];
    if (keyChange && keyChange.oldValue !== keyChange.newValue) chrome.runtime.reload();
  });
  void ensureHourlyAlarm();
  void scheduleExpiryAlarm();
};
