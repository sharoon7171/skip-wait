export const BSTSHRT_HOSTS = ['bstshrt.com', 'bstlar.com', 'boostellar.com'] as const;

export const BSTSHRT_LOCKER_PATH_RE = /^\/u\/([^/]+)\/?$/i;
export const BSTSHRT_LEGACY_PATH_RE = /^\/([^/]+)\/([^/]+)\/?$/i;

export function bstshrtLockerSlug(pathname = location.pathname): string | null {
  const m = BSTSHRT_LOCKER_PATH_RE.exec(pathname);
  return m?.[1] ? decodeURIComponent(m[1]) : null;
}

export function bstshrtLegacyPath(pathname = location.pathname): string | null {
  const m = BSTSHRT_LEGACY_PATH_RE.exec(pathname);
  if (!m?.[1] || !m[2]) return null;
  return `${decodeURIComponent(m[1])}/${decodeURIComponent(m[2])}`;
}
