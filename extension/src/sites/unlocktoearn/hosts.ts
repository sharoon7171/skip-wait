export const UNLOCKTOEARN_HOSTS = ['unlocktoearn.com'] as const;
export const UNLOCKTOEARN_MEDIATOR_HOSTS = ['cocoboxmod.com'] as const;

const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,12}$/;

export function unlocktoearnAliasFromPath(pathname: string): string | null {
  const [seg, ...rest] = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (!seg || rest.length > 0 || !ALIAS_RE.test(seg)) return null;
  return seg;
}
