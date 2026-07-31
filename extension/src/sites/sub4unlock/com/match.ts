export type Sub4unlockComPage = 'landing' | 'loader' | 'lp' | 'lpd';

const ID_RE = /^[A-Za-z0-9_-]+$/;
const LANDING_RE = /^\/S\/([A-Za-z0-9_-]+)\/?$/i;
const LOADER_RE = /^\/LinkShortner\/sub4unlock\/LP\/LP\.php$/i;
const LP_RE = /^\/LP\/LP\.php$/i;
const LPD_RE = /^\/LP\/LPD\.php$/i;

const queryId = (): string | null => {
  const id = new URLSearchParams(location.search).get('id');
  return id && ID_RE.test(id) ? id : null;
};

export const sub4unlockComLinkId = (): string | null => {
  const fromPath = location.pathname.match(LANDING_RE)?.[1];
  if (fromPath) return fromPath;
  if (LOADER_RE.test(location.pathname) || LP_RE.test(location.pathname) || LPD_RE.test(location.pathname)) {
    return queryId();
  }
  return null;
};

export const sub4unlockComPage = (): Sub4unlockComPage | null => {
  if (!sub4unlockComLinkId()) return null;
  if (LANDING_RE.test(location.pathname)) return 'landing';
  if (LOADER_RE.test(location.pathname)) return 'loader';
  if (LP_RE.test(location.pathname)) return 'lp';
  if (LPD_RE.test(location.pathname)) return 'lpd';
  return null;
};
