import { isAllowedHost } from '../../utils/domain-check';
import { TECH8S_HOSTS } from './hosts';

const SAFE_PHP_RE = /^\/safe\.php$/i;
const EZ4_ST_RE = /^\/st$/i;
const LOCATION_HREF_RE = /window\.location\.href\s*=\s*"([^"]+)"/;

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
    const target = new URL(location.href).searchParams.get('url')?.trim();
    if (target && (target.startsWith('http://') || target.startsWith('https://'))) return target;
  } catch {}
  return null;
}

export function initTech8sSafeRedirect(): void {
  if (!isAllowedHost(TECH8S_HOSTS)) return;

  // ── ez4short.com/st?api=...&url=... ──
  if (EZ4_ST_RE.test(location.pathname)) {
    const url = urlFromQueryParam();
    if (url) {
      location.replace(url);
      return;
    }
    // Fallback: wait briefly for auto-submit to finish, then check again
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

  // Check immediately (scripts already parsed)
  const url = extractJsRedirectUrl();
  if (url) {
    location.replace(url);
    return;
  }

  // Wait for script tag to appear
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

  // Timeout: stop observer after 5s to avoid resource leak
  window.setTimeout(() => {
    if (!done) {
      done = true;
      mo.disconnect();
    }
  }, 5000);
}
