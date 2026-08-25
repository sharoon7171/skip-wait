import { HOSTS_STORAGE_KEY, hostMatchesSite, siteHosts } from './hosts/check';
import { storageKeys } from './license/storage';
import { verifyLicense } from './license/verify';

export const canBypassHost = async (hostname: string, site: string): Promise<boolean> => {
  if (!(await hostMatchesSite(hostname, site))) return false;
  return verifyLicense();
};

export const canBypass = (site: string): Promise<boolean> => canBypassHost(location.hostname, site);

export const licensedHosts = async (site: string): Promise<string[]> => {
  const hosts = await siteHosts(site);
  if (!hosts.length) return [];
  if (!(await verifyLicense())) return [];
  return hosts;
};

export const onBypassAccessChange = (fn: () => void): void => {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    if (
      HOSTS_STORAGE_KEY in changes ||
      storageKeys.licenseKey in changes ||
      storageKeys.licenseExp in changes
    ) {
      fn();
    }
  });
};
