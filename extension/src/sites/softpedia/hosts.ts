export const SOFTPEDIA_HOSTS = ['softpedia.com'] as const;

export function isSoftpediaWaitPath(pathname: string = location.pathname): boolean {
  return /\/dyn-postdownload\.php(?:\/|$)/i.test(pathname);
}

export function isDynPostdownloadUrl(href: string): boolean {
  try {
    const u = new URL(href, location.href);
    return u.hostname.toLowerCase().endsWith('softpedia.com') && isSoftpediaWaitPath(u.pathname);
  } catch {
    return false;
  }
}
