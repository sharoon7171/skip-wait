export const EARNLINKS_HOSTS = ['earnlinks.in', 'linksgo.in'] as const;
export const EARNLINKS_MEDIATOR_HOSTS = [
  'itiexamshala.com',
  'nameefy.com',
  'jobustecher.letest25.co',
] as const;
export const EARNLINKS_UNLOCK_ORIGIN = 'https://earnlinks.in';
export const EARNLINKS_ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;

export function earnlinksAliasFromPath(pathname: string): string | null {
  const [seg, ...rest] = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (!seg || rest.length > 0 || !EARNLINKS_ALIAS_RE.test(seg)) return null;
  return seg;
}

export function earnlinksShortenerUrl(alias: string): string {
  return `${EARNLINKS_UNLOCK_ORIGIN}/${alias}`;
}
