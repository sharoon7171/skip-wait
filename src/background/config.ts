/**
 * Remote config: Pastebin. Fetches and parses content script rules.
 */
const CONFIG_URL = 'https://pastebin.com/raw/TSYzqUDe';

export type ConfigRule = {
  js: string;
  matches: string[];
  run_at: 'document_start' | 'document_end' | 'document_idle';
};

/** Convert simple "domain.com" or "sub.domain.com" into Chrome match pattern "*://domain.com/*" */
export function normalizeMatches(matches: string[]): string[] {
  return matches.map((m) => {
    const t = m.trim();
    if (t === '<all_urls>') return '*://*/*';
    if (t.includes('://')) return t;
    return `*://${t}/*`;
  });
}

export async function fetchConfig(): Promise<ConfigRule[]> {
  const res = await fetch(CONFIG_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Config fetch failed: ${res.status}`);
  const parsed = JSON.parse((await res.text()).trim()) as ConfigRule[];
  if (!Array.isArray(parsed)) throw new Error('Config must be a JSON array');
  return parsed;
}
