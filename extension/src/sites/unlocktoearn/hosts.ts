const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,12}$/;

export function unlocktoearnAliasFromPath(pathname: string): string | null {
  const [seg, ...rest] = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (!seg || rest.length > 0 || !ALIAS_RE.test(seg)) return null;
  return seg;
}
