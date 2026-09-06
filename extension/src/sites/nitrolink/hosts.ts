import { hostMatchesSite } from '../../hosts/check';

export const SITE = 'nitrolink' as const;
export const BRAND = 'Nitro Link' as const;

export const MSG_RESOLVE = 'NITROLINK_RESOLVE' as const;
export const MSG_PROGRESS = 'NITROLINK_PROGRESS' as const;
export const MSG_OPEN = 'NITROLINK_OPEN_DEST' as const;

export type NitrolinkProgress = {
  lead: string;
  detail: string;
  status: string;
  waitEndTs?: number;
};

const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;

export const isHttpUrl = (href: string): boolean => /^https?:\/\//i.test(href);

export const aliasFromPath = (pathname: string): string | null => {
  const [seg, ...rest] = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  return seg && rest.length === 0 && ALIAS_RE.test(seg) ? seg : null;
};

export const aliasFromUrl = (href: string): string | null => {
  try {
    return aliasFromPath(new URL(href).pathname);
  } catch {
    return null;
  }
};

export const isAliasUrl = async (href: string): Promise<boolean> => {
  try {
    const u = new URL(href);
    if (!isHttpUrl(u.href) || !(await hostMatchesSite(u.hostname, SITE))) return false;
    return aliasFromPath(u.pathname) != null;
  } catch {
    return false;
  }
};
