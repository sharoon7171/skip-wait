/**
 * Remote config: Pastebin. Uses registerContentScripts so injection runs at document_start/end (works).
 * Re-fetches config from Pastebin when user navigates (no timer) so new domains apply on next page load.
 */
const CONFIG_URL = 'https://pastebin.com/raw/TSYzqUDe';

type ConfigRule = {
  js: string;
  matches: string[];
  run_at: 'document_start' | 'document_end' | 'document_idle';
};

/** Convert simple "domain.com" or "sub.domain.com" into Chrome match pattern "*://domain.com/*" */
function normalizeMatches(matches: string[]): string[] {
  return matches.map((m) => {
    const t = m.trim();
    if (t === '<all_urls>') return '*://*/*';
    // Already a match pattern (contains ://)
    if (t.includes('://')) return t;
    // Plain domain → full URL pattern
    return `*://${t}/*`;
  });
}

async function fetchConfig(): Promise<ConfigRule[]> {
  const res = await fetch(CONFIG_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Config fetch failed: ${res.status}`);
  const parsed = JSON.parse((await res.text()).trim()) as ConfigRule[];
  if (!Array.isArray(parsed)) throw new Error('Config must be a JSON array');
  return parsed;
}

async function unregisterAll(): Promise<void> {
  try {
    const scripts = await chrome.scripting.getRegisteredContentScripts();
    if (scripts.length === 0) return;
    await chrome.scripting.unregisterContentScripts({
      ids: scripts.map((s) => s.id),
    });
  } catch {
    // None registered
  }
}

async function registerFromConfig(): Promise<void> {
  const rules = await fetchConfig();
  const scripts: chrome.scripting.RegisteredContentScript[] = rules.map(
    (rule, index) => ({
      id: `skip-wait-${index}-${rule.js.replace(/\.js$/, '')}`,
      js: [rule.js],
      matches: normalizeMatches(rule.matches),
      runAt: rule.run_at ?? 'document_idle',
      persistAcrossSessions: false,
    })
  );
  await unregisterAll();
  await chrome.scripting.registerContentScripts(scripts);
}

// On install/startup: register so extension works from first load
chrome.runtime.onStartup.addListener(() => registerFromConfig().catch(() => {}));
chrome.runtime.onInstalled.addListener(() =>
  registerFromConfig().catch(() => {})
);

// When user opens a page: re-fetch from Pastebin and re-register (no timer). Throttle to avoid hammering Pastebin.
const THROTTLE_MS = 30_000; // at most once per 30 sec when user is browsing
let lastRegisterTime = 0;

chrome.tabs.onUpdated.addListener((_tabId, changeInfo) => {
  if (changeInfo.status !== 'complete') return;
  if (Date.now() - lastRegisterTime < THROTTLE_MS) return;
  lastRegisterTime = Date.now();
  registerFromConfig().catch(() => {});
});
