import { canBypassHost } from '../../gate';

const lootPath = (pathname: string, search: string) =>
  pathname === '/s' && search.length > 1;

export function isLootLockerPath(pathname: string, search: string): boolean {
  return lootPath(pathname, search);
}

export async function isLootLockerUrl(url: string): Promise<boolean> {
  try {
    const u = new URL(url);
    return (await canBypassHost(u.hostname, 'lootlabs')) && lootPath(u.pathname, u.search);
  } catch {
    return false;
  }
}
