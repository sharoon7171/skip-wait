import { hostMatchesSite } from '../../hosts/check';

export const SITE = 'shrinkpe' as const;

export const MSG_RESOLVE = 'SHRINKPE_RESOLVE' as const;
export const MSG_PROGRESS = 'SHRINKPE_PROGRESS' as const;
export const MSG_OPEN = 'SHRINKPE_OPEN_DEST' as const;
export const MSG_ARM = 'SHRINKPE_ARM_REFERER' as const;
export const MSG_DISARM = 'SHRINKPE_DISARM_REFERER' as const;

export type ShrinkpeFields = Record<string, string>;
export type ShrinkpeProgress = { phase?: 'skip' | 'banner' | 'go'; step?: number; waitEndTs?: number };

export type ShrinkKind = 'shrinkpe' | 'shrinkearn';
export type Shortener = { kind: ShrinkKind; mediator: string };

const SHRINKEARN: Record<string, Shortener> = {
  'tpi.li': { kind: 'shrinkearn', mediator: 'https://ssdhostting.com/' },
};

export const shortenerFor = (host: string): Shortener =>
  SHRINKEARN[host.toLowerCase().replace(/^www\./, '')] ?? { kind: 'shrinkpe', mediator: '' };

const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{3,}$/;

export const isHttpUrl = (href: string): boolean => /^https?:\/\//i.test(href);

export const aliasFromPath = (pathname: string): string | null => {
  const [seg, ...rest] = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  return seg && rest.length === 0 && ALIAS_RE.test(seg) ? seg : null;
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
