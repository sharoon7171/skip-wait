const STORAGE_KEY = 'skipWaitHosts';
const HOSTS_URL =
  'https://raw.githubusercontent.com/sharoon7171/skip-wait-bypass-timers-countdowns-extension/main/hosts.json';
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

export const pullHosts = async (): Promise<boolean> => {
  const res = await fetch(`${HOSTS_URL}?t=${Date.now()}`, { cache: 'no-store', credentials: 'omit' });
  if (!res.ok) return false;
  const parsed = parseHosts(await res.json());
  if (!parsed) return false;
  await chrome.storage.local.set({ [STORAGE_KEY]: parsed });
  return true;
};

export const isRemoteSite = async (site: string): Promise<boolean> => {
  try {
    const stored = await chrome.storage.local.get(STORAGE_KEY);
    const file = parseHosts(stored[STORAGE_KEY]);
    if (!file) return false;
    return hostMatches(location.hostname, file[site]?.hosts ?? []);
  } catch {
    return false;
  }
};
