import { hostnameMatches } from '../../utils/domain-check';

export const LOOT_HOSTS = [
  'lootlabs.gg',
  'loot-link.com',
  'lootlinks.com',
  'lootlinks.co',
  'lootdest.org',
  'lootdest.com',
  'lootdest.net',
  'speedy-links.com',
  'best-links.org',
  'free-leaks.com',
  'fast-links.org',
  'free-content.pro',
  'rapid-links.com',
  'rapid-links.net',
  'direct-links.net',
  'direct-links.org',
  'ultra-links.net',
] as const;

const lootPath = (pathname: string, search: string) =>
  pathname === '/s' && search.length > 1;

export function isLootLockerUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return hostnameMatches(u.hostname, LOOT_HOSTS) && lootPath(u.pathname, u.search);
  } catch {
    return false;
  }
}

export function isLootLockerPage(): boolean {
  return hostnameMatches(location.hostname, LOOT_HOSTS) && lootPath(location.pathname, location.search);
}
