import { hostnameMatches } from '../../utils/domain-check';

export const AROLINKS_HOSTS = ['arolinks.com', 'vplink.in'] as const;
export const AROLINKS_MEDIATOR_HOSTS = [
  'apnahirework.com',
  'crimejasoos.in',
  'darkguruji.com',
  'howdyrecipes.com',
  'shikshaads.in',
  'srtak.com',
  'techcornernews.com',
  'theimmigrationworld.com',
] as const;
export const AROLINKS_UNLOCK_READY_MS = 25_000;
export const AROLINKS_DEST_WAIT_MS = 60_000;
export const AROLINKS_DEST_WAIT_HOSTS = ['studyspark.study'] as const;
export const AROLINKS_GATE_VALUE = 'insurance,online_colleges,study_abroad,finance,loan';
export const AROLINKS_GATE_COOKIE_NAMES = ['adcadg', 'eonstudb', 'eonudb', 'uopusi'] as const;
export const AROLINKS_ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;

export const arolinksAliasFromPath = (pathname: string): string | null => {
  const [seg, ...rest] = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (!seg || rest.length > 0 || !AROLINKS_ALIAS_RE.test(seg)) return null;
  return seg;
};

export const isArolinksShortenerHref = (href: string): boolean => {
  try {
    const { hostname, pathname } = new URL(href);
    return hostnameMatches(hostname, AROLINKS_HOSTS) && !!arolinksAliasFromPath(pathname);
  } catch {
    return false;
  }
};

export const isTimedDestUrl = (href: string): boolean => {
  try {
    return hostnameMatches(new URL(href).hostname, AROLINKS_DEST_WAIT_HOSTS);
  } catch {
    return false;
  }
};
