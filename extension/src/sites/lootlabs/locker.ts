import { canBypassHost } from '../../gate';

const locker = (pathname: string, search: string) => pathname === '/s' && search.length > 1;

export const isLootLockerPath = locker;

export async function isLootLockerUrl(url: string): Promise<boolean> {
  try {
    const u = new URL(url);
    return (await canBypassHost(u.hostname, 'lootlabs')) && locker(u.pathname, u.search);
  } catch {
    return false;
  }
}
