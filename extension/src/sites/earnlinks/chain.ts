import { hostnameMatches } from '../../utils/domain-check';
import { EARNLINKS_HOSTS } from './hosts';

export const EARNLINKS_ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;
export const EARNLINKS_CHAIN_GET = 'EARNLINKS_CHAIN_GET' as const;

export type EarnlinksChain = { alias: string; origin: string };

const tabs = new Map<number, EarnlinksChain>();

export const earnlinksAliasFromPath = (pathname: string): string | null => {
  const parts = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  return parts.length === 1 && EARNLINKS_ALIAS_RE.test(parts[0]!) ? parts[0]! : null;
};

export const isEarnlinksShortUrl = (href = location.href): boolean => {
  try {
    const u = new URL(href);
    return hostnameMatches(u.hostname, EARNLINKS_HOSTS) && !!earnlinksAliasFromPath(u.pathname);
  } catch {
    return false;
  }
};

export const readEarnlinksChain = async (): Promise<EarnlinksChain | null> => {
  try {
    const res = (await chrome.runtime.sendMessage({ type: EARNLINKS_CHAIN_GET })) as {
      chain?: EarnlinksChain | null;
    };
    const c = res?.chain;
    if (!c || !EARNLINKS_ALIAS_RE.test(c.alias) || !/^https?:\/\//i.test(c.origin)) return null;
    return { alias: c.alias, origin: c.origin.replace(/\/$/, '') };
  } catch {
    return null;
  }
};

export const initEarnlinksChain = (): void => {
  chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    if (details.frameId !== 0) return;
    try {
      const u = new URL(details.url);
      const alias = hostnameMatches(u.hostname, EARNLINKS_HOSTS) ? earnlinksAliasFromPath(u.pathname) : null;
      if (alias) tabs.set(details.tabId, { alias, origin: u.origin });
    } catch {}
  });
  chrome.tabs.onRemoved.addListener((id) => tabs.delete(id));
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.type !== EARNLINKS_CHAIN_GET) return false;
    const id = sender.tab?.id;
    sendResponse({ chain: id === undefined ? null : (tabs.get(id) ?? null) });
    return false;
  });
};
