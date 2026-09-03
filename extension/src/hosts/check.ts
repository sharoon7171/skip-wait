export const HOSTS_STORAGE_KEY = 'skipWaitHosts';
export const HOSTS_UPDATED_AT_KEY = 'skipWaitHostsUpdatedAt';
const HOSTS_URL =
  'https://raw.githubusercontent.com/sharoon7171/skip-wait-bypass-timers-countdowns/main/extension/public/hosts.json';
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

const mergeHosts = (...files: Array<HostsFile | null | undefined>): HostsFile => {
  const out: HostsFile = {};
  for (const file of files) {
    if (!file) continue;
    for (const [site, { hosts }] of Object.entries(file)) {
      const set = new Set(out[site]?.hosts ?? []);
      for (const host of hosts) set.add(host);
      out[site] = { hosts: [...set] };
    }
  }
  return out;
};

export const parseHostsUpdatedAt = (value: unknown): number | null =>
  typeof value === 'number' && Number.isFinite(value) ? value : null;

const storeRefreshedHosts = async (parsed: HostsFile): Promise<void> => {
  await chrome.storage.local.set({ [HOSTS_STORAGE_KEY]: parsed, [HOSTS_UPDATED_AT_KEY]: Date.now() });
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

const loadRefreshedHosts = async (): Promise<HostsFile | null> => {
  const stored = await chrome.storage.local.get(HOSTS_STORAGE_KEY);
  return parseHosts(stored[HOSTS_STORAGE_KEY]);
};

const activeHosts = async (): Promise<HostsFile> =>
  mergeHosts(await loadBundledHosts(), await loadRefreshedHosts());

export const pullHosts = async (): Promise<boolean> => {
  const res = await fetch(`${HOSTS_URL}?t=${Date.now()}`, { cache: 'no-store', credentials: 'omit' });
  if (!res.ok) return false;
  const fetched = parseHosts(await res.json());
  if (!fetched) return false;
  await storeRefreshedHosts(fetched);
  return true;
};

export const initHostsSync = (): void => {
  chrome.runtime.onStartup.addListener(() => {
    void pullHosts();
  });
  chrome.runtime.onInstalled.addListener(() => {
    void pullHosts();
  });
  void pullHosts();
};

export const siteHosts = async (site: string): Promise<string[]> => {
  try {
    return (await activeHosts())[site]?.hosts ?? [];
  } catch {
    return [];
  }
};

export const hostMatchesSite = async (hostname: string, site: string): Promise<boolean> =>
  hostMatches(hostname, await siteHosts(site));
