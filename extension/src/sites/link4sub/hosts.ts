export const SITE = 'link4sub' as const;
export const API_ORIGIN = 'https://link4sub.com';

const ALIAS_RE = /^[A-Za-z0-9_-]{3,}$/;

export const isHttpUrl = (href: string): boolean => /^https?:\/\//i.test(href);

export const readAlias = (): string | null => {
  const q = new URLSearchParams(location.search);
  for (const key of ['alias', 'a'] as const) {
    const v = q.get(key)?.trim();
    if (v && ALIAS_RE.test(v)) return v;
  }

  const fromPage = document.documentElement.innerHTML.match(
    /window\.SLB_alias\s*=\s*["']([^"']+)["']/,
  )?.[1];
  if (fromPage && ALIAS_RE.test(fromPage)) return fromPage;

  const raw = document.cookie.match(/(?:^|;\s*)SLB_alias=([^;]+)/)?.[1];
  if (!raw) return null;
  try {
    const v = decodeURIComponent(raw).trim();
    return ALIAS_RE.test(v) ? v : null;
  } catch {
    return null;
  }
};

export const apiOrigin = (): string => {
  const raw = document.documentElement.innerHTML.match(
    /window\.SLB_api_url\s*=\s*["'](https?:\/\/[^"']+)["']/,
  )?.[1];
  if (!raw) return API_ORIGIN;
  try {
    return new URL(raw).origin;
  } catch {
    return API_ORIGIN;
  }
};
