import { canBypassHost } from '../../gate';
import { decodeProlinkDest } from './hosts';

export const TIPSGURU_GET_DEST = 'TIPSGURU_GET_DEST';

const PREFERRED_COOKIE_NAMES = new Set([
  'tipsguru',
  'vidyays',
  'mineverse',
  'mineverse360',
]);

const SKIP_COOKIE_NAMES = new Set(['phpsessid', 'wppro_steps', 'wppro_geo']);

function destFromCookieValue(value: string): string | null {
  try {
    return decodeProlinkDest(decodeURIComponent(value.trim()));
  } catch {
    return decodeProlinkDest(value.trim());
  }
}

function readDest(pageUrl: string): Promise<string | null> {
  return new Promise((resolve) => {
    chrome.cookies.getAll({ url: pageUrl }, (cookies) => {
      if (chrome.runtime.lastError || !cookies?.length) {
        resolve(null);
        return;
      }

      const preferred = cookies.filter((cookie) =>
        PREFERRED_COOKIE_NAMES.has(cookie.name.toLowerCase()),
      );
      const rest = cookies.filter(
        (cookie) => !PREFERRED_COOKIE_NAMES.has(cookie.name.toLowerCase()),
      );

      for (const cookie of [...preferred, ...rest]) {
        if (SKIP_COOKIE_NAMES.has(cookie.name.toLowerCase())) continue;
        const url = destFromCookieValue(cookie.value);
        if (url) {
          resolve(url);
          return;
        }
      }
      resolve(null);
    });
  });
}

export function initTipsguruCookieDest(): void {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.type !== TIPSGURU_GET_DEST) return false;
    const href = sender.tab?.url ?? sender.url ?? '';
    if (!href) {
      sendResponse({ url: null });
      return false;
    }
    void (async () => {
      try {
        if (!(await canBypassHost(new URL(href).hostname, 'tipsguru'))) {
          sendResponse({ url: null });
          return;
        }
      } catch {
        sendResponse({ url: null });
        return;
      }
      sendResponse({ url: await readDest(href) });
    })();
    return true;
  });
}
