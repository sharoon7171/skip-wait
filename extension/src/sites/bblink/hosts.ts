export const BBLINK_ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;

export function bblinkAliasFromPath(pathname = location.pathname): boolean {
  const parts = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  return parts.length === 1 && BBLINK_ALIAS_RE.test(parts[0]!);
}
