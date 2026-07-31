import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { TECH8S_HOSTS } from './hosts';

const SAFE_PHP_RE = /^\/safe2?\.php$/i;
const ST_RE = /^\/st$/i;
const LOCATION_HREF_RE = /window\.location\.href\s*=\s*["']([^"']+)["']/;

const httpUrl = (v: string | null | undefined): string | null => {
  const s = v?.trim();
  return s && /^https?:\/\//i.test(s) ? s : null;
};

const urlFromQuery = (): string | null => httpUrl(new URLSearchParams(location.search).get('url'));

const unwrapOuter = (raw: string): string => {
  try {
    const u = new URL(raw);
    if (/(^|\.)google\./i.test(u.hostname) && u.pathname === '/url') {
      return httpUrl(u.searchParams.get('url')) ?? raw;
    }
    if (/(^|\.)bing\.com$/i.test(u.hostname) && u.pathname.startsWith('/ck')) {
      const packed = u.searchParams.get('u')?.trim();
      if (packed?.startsWith('a1')) {
        const b64 = packed.slice(2).replace(/-/g, '+').replace(/_/g, '/');
        const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
        return httpUrl(atob(padded)) ?? raw;
      }
    }
  } catch {}
  return raw;
};

const urlFromScripts = (): string | null => {
  for (const script of document.scripts) {
    const text = script.textContent ?? '';
    if (!text.includes('window.location.href')) continue;
    const raw = httpUrl(LOCATION_HREF_RE.exec(text)?.[1]);
    if (!raw) continue;
    return unwrapOuter(raw);
  }
  return null;
};

export function initTech8sRedirect(): void {
  if (!isAllowedHost(TECH8S_HOSTS)) return;

  if (ST_RE.test(location.pathname)) {
    const url = urlFromQuery();
    if (url) location.replace(url);
    return;
  }

  if (!SAFE_PHP_RE.test(location.pathname)) return;

  const go = (): void => {
    const url = urlFromScripts();
    if (url) location.replace(url);
  };

  whenDomParsed(go);
  const mo = new MutationObserver(() => {
    const url = urlFromScripts();
    if (!url) return;
    mo.disconnect();
    location.replace(url);
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => mo.disconnect(), 5000);
}
