const ALIAS_RE = /^\/([A-Za-z0-9_-]+)\/?$/i;

export function shortxAliasFromPath(pathname: string): string | null {
  return ALIAS_RE.exec(pathname)?.[1] ?? null;
}
