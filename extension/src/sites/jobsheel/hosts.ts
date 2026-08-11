export const JOBSHEEL_HOSTS = ['jobsheel.com'] as const;
export const JOBSHEEL_BABYLINKS_HOSTS = ['go.babylinks.in'] as const;
export const JOBSHEEL_HOME = `https://${JOBSHEEL_HOSTS[0]}/`;

const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{3,16}$/;

export function jobsheelBabyAlias(pathname: string, search: string): string | null {
  if (!/\/baby\.php$/i.test(pathname)) return null;
  const links = new URLSearchParams(search).get('links')?.trim();
  return links && ALIAS_RE.test(links) ? links : null;
}

export function jobsheelAliasFromCookie(): string | null {
  const value = document.cookie.match(/(?:^|;\s*)tp1=([^;]+)/)?.[1]?.trim();
  return value && ALIAS_RE.test(value) ? value : null;
}

export function babylinksAliasFromPath(pathname: string): string | null {
  const [seg, ...rest] = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (!seg || rest.length > 0 || !ALIAS_RE.test(seg)) return null;
  return seg;
}
