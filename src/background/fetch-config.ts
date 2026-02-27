import { CONFIG_URL } from './config';

export type PastebinRule = { js: string; matches: string[] };

/** Separator between content script name and domain list (space-pipe-space). Avoids ":" so URL patterns like *://domain/* work. */
const LINE_SEP = ' | ';

/**
 * Parse simple line-based format (easy to edit on Pastebin):
 *   script-name | domain1, domain2, domain3
 * Empty lines and lines starting with # are ignored.
 * Use " | " to separate content script name from domains. Domains separated by comma or space.
 */
function parseLineConfig(text: string): PastebinRule[] {
  const rules: PastebinRule[] = [];
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const sepIdx = trimmed.indexOf(LINE_SEP);
    if (sepIdx < 0) continue;
    const js = trimmed.slice(0, sepIdx).trim() ?? '';
    const rest = trimmed.slice(sepIdx + LINE_SEP.length).trim();
    const matches = rest ? rest.split(/[\s,]+/).filter(Boolean) : [];
    if (js && matches.length > 0) rules.push({ js: js, matches });
  }
  return rules;
}

export async function fetchPastebinConfig(): Promise<PastebinRule[]> {
  const res = await fetch(CONFIG_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Config fetch failed: ${res.status}`);
  const text = (await res.text()).trim();
  if (text.startsWith('[')) {
    const parsed = JSON.parse(text) as unknown;
    if (!Array.isArray(parsed)) throw new Error('Config must be a JSON array');
    return (parsed as Array<{ js?: string; matches?: unknown }>)
      .filter((r) => r && typeof r.js === 'string' && Array.isArray(r.matches))
      .map((r) => ({ js: r.js!, matches: r.matches as string[] }));
  }
  return parseLineConfig(text);
}
