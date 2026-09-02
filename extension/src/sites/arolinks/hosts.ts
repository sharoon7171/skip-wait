import { hostMatchesSite } from '../../hosts/check';

export const MSG_ARM = 'AROLINKS_ARM_REFERER' as const;
export const MSG_OPEN = 'AROLINKS_OPEN_DEST' as const;
export const MSG_MEDIATOR = 'AROLINKS_MEDIATOR_REFERER' as const;

export const AROLINKS_UNLOCK_READY_MS = 25_000;
export const AROLINKS_DEST_WAIT_MS = 60_000;

const AROLINKS_ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{3,}$/;
const VPLINK_KEY_RE = /^key-[A-Za-z0-9]+$/;
const AROLINKS_HOSTS = ['arolinks.com', 'vplink.in'] as const;

export const arolinksAliasFromPath = (pathname: string): string | null => {
  const [seg, ...rest] = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (!seg || rest.length > 0 || !(VPLINK_KEY_RE.test(seg) || AROLINKS_ALIAS_RE.test(seg))) return null;
  return seg;
};

const hostMatches = (hostname: string, roots: readonly string[]): boolean => {
  const h = hostname.toLowerCase();
  return roots.some((d) => h === d || h.endsWith(`.${d}`));
};

export const isArolinksAliasNav = (url: string): boolean => {
  try {
    const u = new URL(url);
    return hostMatches(u.hostname, AROLINKS_HOSTS) && !!arolinksAliasFromPath(u.pathname);
  } catch {
    return false;
  }
};

export const isTimedDestUrl = async (href: string): Promise<boolean> => {
  try {
    return hostMatchesSite(new URL(href).hostname, 'arolinks-wait');
  } catch {
    return false;
  }
};
