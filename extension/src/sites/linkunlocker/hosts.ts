export function linkunlockerLockerSlug(pathname = location.pathname): string | null {
  const seg = pathname.replace(/^\/+|\/+$/g, '').split('/')[0]?.trim() ?? '';
  if (!seg) return null;
  try {
    return decodeURIComponent(seg);
  } catch {
    return seg;
  }
}

export const isLinkunlockerVerifyPath = (pathname = location.pathname): boolean =>
  /^\/verify\/?$/i.test(pathname);
