import { siteHosts } from '../../hosts/check';

export const SITE = 'unlocktoearn' as const;

export const MSG_RESOLVE = 'UNLOCKTOEARN_RESOLVE' as const;
export const MSG_OPEN = 'UNLOCKTOEARN_OPEN_DEST' as const;

const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,12}$/;

export const isHttpUrl = (href: string): boolean => /^https?:\/\//i.test(href);

export const aliasFromPath = (pathname: string): string | null => {
  const [seg, ...rest] = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  return seg && rest.length === 0 && ALIAS_RE.test(seg) ? seg : null;
};

export const aliasPageUrl = async (alias: string): Promise<string> => {
  const host = (await siteHosts(SITE))[0];
  if (!host) throw new Error('hosts');
  return `https://${host}/${encodeURIComponent(alias)}`;
};
