export const GOOST_HOSTS = ['goo.st'] as const;

export const GOOST_MEDIATOR_HOSTS = ['kreditexperte.online'] as const;

export const GOOST_ALIAS_RE = /^[A-Za-z0-9]{4,}$/;

export function goostAliasFromPath(pathname = location.pathname): string | null {
  const parts = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (parts.length !== 1) return null;
  const alias = parts[0]!;
  return GOOST_ALIAS_RE.test(alias) ? alias : null;
}
