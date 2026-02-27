/**
 * Pastebin config: which content script (by file name) runs on which URL patterns.
 * Fetched via background script to avoid CORS (content script fetch is blocked).
 */
type PastebinRule = { js: string; matches: string[] };

function toPattern(entry: string): string {
  const t = entry.trim();
  if (t === '<all_urls>') return '*://*/*';
  if (t.includes('://')) return t;
  return `*://${t}/*`;
}

/** Chrome-style match pattern: scheme://host/path. * = any. */
function urlMatchesPattern(url: string, pattern: string): boolean {
  if (pattern === '*://*/*') return true;
  try {
    const u = new URL(url);
    const [scheme, hostPath] = pattern.split('://', 2);
    if (!hostPath) return false;
    const slash = hostPath.indexOf('/');
    const host = slash >= 0 ? hostPath.slice(0, slash) : hostPath;
    const path = slash >= 0 ? hostPath.slice(slash) || '/*' : '/*';
    if (scheme !== '*' && scheme !== u.protocol.replace(':', '')) return false;
    if (host.startsWith('*.')) {
      const domain = host.slice(2);
      if (u.hostname !== domain && !u.hostname.endsWith('.' + domain)) return false;
    } else if (host !== '*' && u.hostname !== host) return false;
    if (path !== '/*' && path !== '/') {
      const pathPrefix = path.replace(/\*$/, '');
      if (!u.pathname.startsWith(pathPrefix)) return false;
    }
    return true;
  } catch {
    return false;
  }
}

/** Request config from background (avoids CORS when fetching Pastebin from content script). */
export function fetchPastebinConfig(): Promise<PastebinRule[]> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'getPastebinConfig' }, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      if (response && typeof (response as { error?: string }).error === 'string') {
        reject(new Error((response as { error: string }).error));
        return;
      }
      resolve(Array.isArray(response) ? response : []);
    });
  });
}

/** Returns content script file names that should run on this URL (from Pastebin rules). */
export function getEnabledScriptNames(rules: PastebinRule[], url: string): string[] {
  const enabled = new Set<string>();
  for (const rule of rules) {
    const patterns = rule.matches.map((m) => toPattern(m));
    if (patterns.some((p) => urlMatchesPattern(url, p))) enabled.add(rule.js);
  }
  return Array.from(enabled);
}
