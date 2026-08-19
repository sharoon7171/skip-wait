export const ADFOCUS_ALIAS_RE = /^[A-Za-z0-9]+$/;

export function adfocusAliasFromPath(pathname = location.pathname): string | null {
  const parts = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (parts.length !== 1) return null;
  const alias = parts[0]!;
  return ADFOCUS_ALIAS_RE.test(alias) ? alias : null;
}
