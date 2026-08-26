import { hostMatchesSite, siteHosts } from '../../hosts/check';

export const SITE = 'liteshort' as const;

export const MSG_RESOLVE = 'LITESHORT_RESOLVE' as const;
export const MSG_PROGRESS = 'LITESHORT_PROGRESS' as const;
export const MSG_OPEN = 'LITESHORT_OPEN_DEST' as const;

export type LiteshortProgress = { waitEndTs: number };

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
    if (!isHttpUrl(u.href)) return false;
    if (!(await hostMatchesSite(u.hostname, SITE))) return false;
    return aliasFromPath(u.pathname) != null;
  } catch {
    return false;
  }
};

export const siteOrigins = async (): Promise<{ entry: string; unlock: string }> => {
  const hosts = await siteHosts(SITE);
  const entryHost = hosts[0];
  const unlockHost = hosts[1];
  if (!entryHost || !unlockHost) throw new Error('hosts');
  return { entry: `https://${entryHost}`, unlock: `https://${unlockHost}` };
};
