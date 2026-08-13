import { arolinksAliasFromPath } from './hosts';

const MSG_AROLINKS_REMEMBER = 'AROLINKS_REMEMBER_ORIGIN' as const;
const MSG_AROLINKS_RESOLVE = 'AROLINKS_RESOLVE_ORIGIN' as const;

type RememberReq = { type: typeof MSG_AROLINKS_REMEMBER; alias: string; origin: string };
type ResolveReq = { type: typeof MSG_AROLINKS_RESOLVE };
type Msg = RememberReq | ResolveReq;
type Stored = { alias: string; origin: string };

const byTab = new Map<number, Stored>();

export const initArolinksOrigin = (): void => {
  chrome.runtime.onMessage.addListener((msg: Partial<Msg>, sender, reply) => {
    const tabId = sender.tab?.id;
    if (tabId == null) return false;
    if (msg.type === MSG_AROLINKS_REMEMBER) {
      const alias = typeof msg.alias === 'string' ? msg.alias : '';
      const origin = typeof msg.origin === 'string' ? msg.origin.replace(/\/$/, '') : '';
      if (alias && /^https?:\/\//i.test(origin)) byTab.set(tabId, { alias, origin });
      reply(true);
      return false;
    }
    if (msg.type === MSG_AROLINKS_RESOLVE) {
      reply(byTab.get(tabId) ?? null);
      return false;
    }
    return false;
  });
  chrome.tabs.onRemoved.addListener((tabId) => {
    byTab.delete(tabId);
  });
};

export const rememberArolinksOrigin = (alias: string, origin: string): void => {
  chrome.runtime
    .sendMessage({ type: MSG_AROLINKS_REMEMBER, alias, origin } satisfies RememberReq)
    .catch(() => {});
};

export const unlockHrefFor = (href: string): Promise<string> =>
  new Promise((resolve) => {
    try {
      const alias = arolinksAliasFromPath(new URL(href).pathname);
      if (!alias) {
        resolve(href);
        return;
      }
      chrome.runtime.sendMessage({ type: MSG_AROLINKS_RESOLVE } satisfies ResolveReq, (stored?: Stored | null) => {
        if (chrome.runtime.lastError || !stored || stored.alias !== alias) {
          resolve(href);
          return;
        }
        resolve(`${stored.origin}/${alias}`);
      });
    } catch {
      resolve(href);
    }
  });
