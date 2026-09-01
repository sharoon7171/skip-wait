import { refreshLicense } from './gate';
import {
  clearLicenseSession,
  dropExpiredLicense,
  getLicenseSession,
  leaseIsLive,
  storageKeys,
} from './storage';

const LEASE_EXPIRY_ALARM = 'skipWaitLeaseExpiry';
const ENT_EXPIRY_ALARM = 'skipWaitEntExpiry';
const LEGACY_ALARMS = ['skipWaitLicenseRefresh', 'skipWaitLicenseHourly', 'skipWaitLicenseExpiry'] as const;

const scheduleAlarms = async (): Promise<void> => {
  for (const name of LEGACY_ALARMS) await chrome.alarms.clear(name);
  await chrome.alarms.clear(LEASE_EXPIRY_ALARM);
  await chrome.alarms.clear(ENT_EXPIRY_ALARM);
  const session = await getLicenseSession();
  if (!session || (await dropExpiredLicense(session))) return;
  if (session.entExp !== null) {
    await chrome.alarms.create(ENT_EXPIRY_ALARM, { when: session.entExp });
  }
  if (leaseIsLive(session.leaseExp)) {
    await chrome.alarms.create(LEASE_EXPIRY_ALARM, { when: session.leaseExp });
    return;
  }
  void refreshLicense();
};

export const initLicenseSync = (): void => {
  chrome.runtime.onStartup.addListener(() => void scheduleAlarms());
  chrome.runtime.onInstalled.addListener(() => void scheduleAlarms());
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === LEASE_EXPIRY_ALARM) void refreshLicense();
    if (alarm.name === ENT_EXPIRY_ALARM) void clearLicenseSession();
  });
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    if (storageKeys.leaseExp in changes || storageKeys.entExp in changes || storageKeys.licenseKey in changes) {
      void scheduleAlarms();
    }
    const keyChange = changes[storageKeys.licenseKey];
    if (keyChange && keyChange.oldValue !== keyChange.newValue) chrome.runtime.reload();
  });
  void scheduleAlarms();
};
