import { hostnameMatches } from '../../utils/domain-check';
import { MSG_RINKU_CHAIN_ACTIVE, MSG_RINKU_CHAIN_COMPLETE } from './chain';
import { RINKU_MAIN_HOSTS } from './hosts';

const STORAGE_KEY = 'rinku-chain-tabs';
const ALIAS_RE = /^[A-Za-z0-9_-]{3,}$/;
const BACKUP_PATH_RE = /(?:^|\/)backup\/w\/?$/i;

const chains = new Map<number, { alias: string; armed: boolean }>();

const aliasFromShortUrl = (url: URL): string | null => {
  if (!hostnameMatches(url.hostname, RINKU_MAIN_HOSTS)) return null;
  const parts = url.pathname.split('/').filter(Boolean);
  const alias = parts.length === 1 ? parts[0] : null;
  return alias && ALIAS_RE.test(alias) ? alias : null;
};

const aliasFromBackupUrl = (url: URL): string | null => {
  if (!BACKUP_PATH_RE.test(url.pathname)) return null;
  const alias = url.searchParams.get('get');
  const short = url.searchParams.get('short');
  return alias && short && ALIAS_RE.test(alias) && hostnameMatches(short, RINKU_MAIN_HOSTS)
    ? alias
    : null;
};

let queue = chrome.storage.session.get(STORAGE_KEY).then((stored) => {
  const raw: unknown = stored[STORAGE_KEY];
  if (!raw || typeof raw !== 'object') return;
  for (const [tabId, value] of Object.entries(raw)) {
    if (
      value &&
      typeof value === 'object' &&
      'alias' in value &&
      'armed' in value &&
      typeof value.alias === 'string' &&
      typeof value.armed === 'boolean'
    ) {
      const id = Number(tabId);
      if (Number.isInteger(id)) chains.set(id, { alias: value.alias, armed: value.armed });
    }
  }
});

const run = (fn: () => void | Promise<void>): Promise<void> => {
  queue = queue.then(fn, fn);
  return queue;
};

const persist = (): Promise<void> =>
  chrome.storage.session.set({ [STORAGE_KEY]: Object.fromEntries(chains) });

export const initRinkuChainWatch = (): void => {
  chrome.webNavigation.onBeforeNavigate.addListener(({ frameId, tabId, url }) => {
    if (frameId !== 0 || !url.startsWith('http')) return;
    void run(() => {
      const parsed = new URL(url);
      const shortAlias = aliasFromShortUrl(parsed);
      if (shortAlias) {
        chains.set(tabId, { alias: shortAlias, armed: false });
        return persist();
      }
      const backupAlias = aliasFromBackupUrl(parsed);
      if (!backupAlias) return;
      const chain = chains.get(tabId);
      if (chain && chain.alias !== backupAlias) return;
      chains.set(tabId, { alias: backupAlias, armed: true });
      return persist();
    });
  });

  chrome.runtime.onMessage.addListener((message: { type?: string }, sender, reply) => {
    const tabId = sender.tab?.id;
    if (tabId == null) return false;
    if (message.type === MSG_RINKU_CHAIN_ACTIVE) {
      void run(() => {
        reply(chains.get(tabId)?.armed === true);
      });
      return true;
    }
    if (message.type === MSG_RINKU_CHAIN_COMPLETE) {
      void run(() => {
        chains.delete(tabId);
        return persist().then(() => reply(true));
      });
      return true;
    }
    return false;
  });

  chrome.tabs.onRemoved.addListener((tabId) => {
    void run(() => {
      if (!chains.delete(tabId)) return;
      return persist();
    });
  });
};
