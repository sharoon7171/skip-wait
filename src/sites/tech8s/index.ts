import { isAllowedHost } from '../../utils/domain-check';
import { TECH8S_HOSTS } from './hosts';

const SAFE_PHP_RE = /^\/safe\.php$/i;
const EZ4_ST_RE = /^\/st$/i;
const LINK4M_FULL_RE = /^\/full\/?$/i;
const LOCATION_HREF_RE = /window\.location\.href\s*=\s*"([^"]+)"/;

/** Decode base64 string */
function decodeBase64(s: string): string {
  try {
    return atob(s);
  } catch {
    return '';
  }
}

/** Extract URL from inline JS redirect: window.location.href = "..." */
function extractJsRedirectUrl(): string | null {
  for (const script of document.scripts) {
    const text = script.textContent ?? '';
    if (!text.includes('window.location.href')) continue;
    const m = LOCATION_HREF_RE.exec(text);
    if (!m?.[1]) continue;
    const url = m[1].trim();
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
  }
  return null;
}

/** Extract url param from query string (for /st endpoint) */
function urlFromQueryParam(): string | null {
  try {
    const u = new URL(location.href);
    const target = u.searchParams.get('url')?.trim();
    if (target && (target.startsWith('http://') || target.startsWith('https://'))) return target;
  } catch {}
  return null;
}

/** Decode base64 url param (for link4m.co /full/ endpoint) */
function decodedUrlFromQueryParam(): string | null {
  try {
    const u = new URL(location.href);
    const raw = u.searchParams.get('url')?.trim();
    if (!raw) return null;
    const decoded = decodeBase64(raw);
    if (decoded.startsWith('http://') || decoded.startsWith('https://')) return decoded;
  } catch {}
  return null;
}

export function initTech8sSafeRedirect(): void {
  if (!isAllowedHost(TECH8S_HOSTS)) return;

  // ── link4m.co/full/?api=...&url=<base64>&type=... ──
  if (LINK4M_FULL_RE.test(location.pathname)) {
    const url = decodedUrlFromQueryParam();
    if (url) {
      location.replace(url);
      return;
    }
    // Fallback: poll briefly
    let tries = 0;
    const id = window.setInterval(() => {
      tries++;
      const u = decodedUrlFromQueryParam();
      if (u) {
        window.clearInterval(id);
        location.replace(u);
      } else if (tries >= 20) {
        window.clearInterval(id);
      }
    }, 150);
    return;
  }

  // ── ez4short.com/st?api=...&url=... ──
  if (EZ4_ST_RE.test(location.pathname)) {
    const url = urlFromQueryParam();
    if (url) {
      location.replace(url);
      return;
    }
    let tries = 0;
    const id = window.setInterval(() => {
      tries++;
      const u = urlFromQueryParam();
      if (u) {
        window.clearInterval(id);
        location.replace(u);
      } else if (tries >= 20) {
        window.clearInterval(id);
      }
    }, 150);
    return;
  }

  // ── tech8s.net / game5s.com / ez4short.com /safe.php?link=... ──
  if (!SAFE_PHP_RE.test(location.pathname)) return;

  const url = extractJsRedirectUrl();
  if (url) {
    location.replace(url);
    return;
  }

  let done = false;
  const mo = new MutationObserver(() => {
    if (done) return;
    const u = extractJsRedirectUrl();
    if (u) {
      done = true;
      mo.disconnect();
      location.replace(u);
    }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });

  window.setTimeout(() => {
    if (!done) {
      done = true;
      mo.disconnect();
    }
  }, 5000);
}
