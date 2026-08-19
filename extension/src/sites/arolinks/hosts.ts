import { hostIsRemoteSite } from '../../hosts/check';

export const AROLINKS_UNLOCK_READY_MS = 25_000;
export const AROLINKS_DEST_WAIT_MS = 60_000;
export const AROLINKS_GATE_VALUE = 'insurance,online_colleges,study_abroad,finance,loan';
export const AROLINKS_GATE_COOKIE_NAMES = ['adcadg', 'eonstudb', 'eonudb', 'uopusi'] as const;

const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;

export const arolinksAliasFromPath = (pathname: string): string | null => {
  const [seg, ...rest] = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (!seg || rest.length > 0 || !ALIAS_RE.test(seg)) return null;
  return seg;
};

export const isArolinksShortenerHref = async (href: string): Promise<boolean> => {
  try {
    const { hostname, pathname } = new URL(href);
    return (await hostIsRemoteSite(hostname, 'arolinks')) && !!arolinksAliasFromPath(pathname);
  } catch {
    return false;
  }
};

export const isTimedDestUrl = async (href: string): Promise<boolean> => {
  try {
    return hostIsRemoteSite(new URL(href).hostname, 'arolinks-wait');
  } catch {
    return false;
  }
};
