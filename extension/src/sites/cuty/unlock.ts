import { isCutyHost } from './hosts';

const ALIAS_PATH_RE = /^\/([A-Za-z0-9_-]{4,16})\/?$/;
const GO_PATH_RE = /^\/go\/([A-Za-z0-9_-]+)\/?$/i;
const QUICK_PATH_RE = /^\/quick\/?$/i;

export function cutyAliasFromPath(pathname = location.pathname): string | null {
  const go = GO_PATH_RE.exec(pathname);
  if (go?.[1]) return go[1];
  return ALIAS_PATH_RE.exec(pathname)?.[1] ?? null;
}

export function isCutyQuickPath(pathname = location.pathname): boolean {
  return QUICK_PATH_RE.test(pathname);
}

export function destinationFromQuickSearch(search = location.search): string | null {
  const raw = new URLSearchParams(search).get('url');
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return isCutyHost(u.hostname) ? null : u.href;
  } catch {
    return null;
  }
}

export function countdownSecFromHtml(html: string): number {
  const m = /countdownValue\s*=\s*(\d+)/.exec(html);
  return m?.[1] ? Math.max(0, parseInt(m[1], 10)) : 0;
}
