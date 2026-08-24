import { clearLicenseSession, getLicenseSession, licenseIsLive } from '../license/storage';

const STORAGE_KEY = 'skipWaitHosts';
export const HOSTS_UPDATED_AT_KEY = 'skipWaitHostsUpdatedAt';
const HOSTS_URL =
  'https://raw.githubusercontent.com/sharoon7171/skip-wait-bypass-timers-countdowns-extension/main/extension/public/hosts.json';
const HOST_RE = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/;
const SITE_RE = /^[a-z][a-z0-9-]{0,63}$/;

type SiteHosts = { hosts: string[] };
type HostsFile = Record<string, SiteHosts>;

const parseHosts = (raw: unknown): HostsFile | null => {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const out: HostsFile = {};
  for (const [site, value] of Object.entries(raw)) {
    if (!SITE_RE.test(site) || !value || typeof value !== 'object' || Array.isArray(value)) return null;
    const hosts = (value as { hosts?: unknown }).hosts;
    if (!Array.isArray(hosts) || !hosts.every((h) => typeof h === 'string' && HOST_RE.test(h.toLowerCase()))) {
      return null;
    }
    out[site] = { hosts: hosts.map((h) => h.toLowerCase()) };
  }
  return out;
};

const hostMatches = (hostname: string, roots: readonly string[]): boolean => {
  const h = hostname.toLowerCase();
  return roots.some((d) => h === d || h.endsWith(`.${d}`));
};

export const parseHostsUpdatedAt = (value: unknown): number | null =>
  typeof value === 'number' && Number.isFinite(value) ? value : null;

const storeHosts = async (parsed: HostsFile): Promise<void> => {
  await chrome.storage.local.set({ [STORAGE_KEY]: parsed, [HOSTS_UPDATED_AT_KEY]: Date.now() });
};

const loadBundledHosts = async (): Promise<HostsFile | null> => {
  try {
    const res = await fetch(chrome.runtime.getURL('hosts.json'));
    if (!res.ok) return null;
    return parseHosts(await res.json());
  } catch {
    return null;
  }
};

const readStoredHosts = async (): Promise<HostsFile | null> => {
  const stored = await chrome.storage.local.get(STORAGE_KEY);
  return parseHosts(stored[STORAGE_KEY]);
};

export const pullHosts = async (): Promise<boolean> => {
  const res = await fetch(`${HOSTS_URL}?t=${Date.now()}`, { cache: 'no-store', credentials: 'omit' });
  if (!res.ok) return false;
  const parsed = parseHosts(await res.json());
  if (!parsed) return false;
  await storeHosts(parsed);
  return true;
};

export const ensureHosts = async (): Promise<boolean> => {
  if (await readStoredHosts()) return true;
  const bundled = await loadBundledHosts();
  if (!bundled) return false;
  await storeHosts(bundled);
  return true;
};

export const remoteSiteHosts = async (site: string): Promise<string[]> => {
  try {
    const file = (await readStoredHosts()) ?? (await loadBundledHosts());
    return file?.[site]?.hosts ?? [];
  } catch {
    return [];
  }
};

export const hostIsRemoteSite = async (hostname: string, site: string): Promise<boolean> => {
  if (!hostMatches(hostname, await remoteSiteHosts(site))) return false;
  const session = await getLicenseSession();
  if (!session) return false;
  if (!licenseIsLive(session.exp)) {
    await clearLicenseSession();
    return false;
  }
  return true;
};

export const isRemoteSite = (site: string): Promise<boolean> => hostIsRemoteSite(location.hostname, site);
