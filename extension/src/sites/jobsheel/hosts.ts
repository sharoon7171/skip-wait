export const JOBSHEEL_HOME = 'https://jobsheel.com/';

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
