import { fetchConfig, normalizeMatches } from './config';

export async function unregisterAll(): Promise<void> {
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

export async function registerFromConfig(): Promise<void> {
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
