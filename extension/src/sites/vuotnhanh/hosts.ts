export const SITE = 'vuotnhanh' as const;

const ALIAS_RE = /^[A-Za-z0-9]{3,12}$/;
const SKIP = new Set(['auth', 'go', 'go-to', 'go_to', 'api', 'images', 'frontend', 'cdn-cgi']);

export const isHttpUrl = (href: string): boolean => /^https?:\/\//i.test(href);

export const readAlias = (): string | null => {
  const [seg, ...rest] = location.pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (!seg || rest.length || SKIP.has(seg.toLowerCase()) || seg.startsWith('@')) return null;
  return ALIAS_RE.test(seg) ? seg : null;
};

export const trafficDest = (href: string): string | null => {
  try {
    const u = new URL(href);
    const host = u.hostname.toLowerCase();
    if (host !== 'gtraffic.io' && !host.endsWith('.gtraffic.io')) return null;
    const inner = u.searchParams.get('url')?.trim() ?? '';
    return isHttpUrl(inner) ? inner : null;
  } catch {
    return null;
  }
};

export const csrfToken = (): string | null =>
  document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')?.trim() || null;
