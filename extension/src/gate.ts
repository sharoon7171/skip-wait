import { FREE_DAILY_KEY, hasFreeRemaining } from './free-bypass';
import { HOSTS_STORAGE_KEY, hostMatchesSite, siteHosts } from './hosts/check';
import { ensureLicense } from './license/gate';
import { storageKeys } from './license/storage';

export const hasBypassAccess = async (): Promise<boolean> => {
  if (await ensureLicense()) return true;
  return hasFreeRemaining();
};

export const canBypassHost = async (hostname: string, site: string): Promise<boolean> => {
  if (!(await hostMatchesSite(hostname, site))) return false;
  return hasBypassAccess();
};

export const canBypass = (site: string): Promise<boolean> => canBypassHost(location.hostname, site);

export const licensedHosts = async (site: string): Promise<string[]> => {
  const hosts = await siteHosts(site);
  if (!hosts.length) return [];
  if (!(await hasBypassAccess())) return [];
  return hosts;
};

export const onBypassAccessChange = (fn: () => void): void => {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    if (
      HOSTS_STORAGE_KEY in changes ||
      storageKeys.licenseKey in changes ||
      storageKeys.leaseExp in changes ||
      storageKeys.entExp in changes ||
      FREE_DAILY_KEY in changes
    ) {
      fn();
    }
  });
};
