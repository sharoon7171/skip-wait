import { hostnameMatches } from '../../utils/domain-check';
import { RINKU_MAIN_HOSTS } from './hosts';

const STORAGE_KEY = 'rinku-flow-tabs';
const MESSAGE = 'RINKU_FLOW_TAB' as const;
const ALIAS_RE = /^[A-Za-z0-9_-]{3,}$/;
const BACKUP_PATH_RE = /(?:^|\/)backup\/w\/?$/i;

const startsRinkuFlow = (raw: string): boolean => {
  const url = new URL(raw);
  if (BACKUP_PATH_RE.test(url.pathname)) {
    const alias = url.searchParams.get('get');
    const short = url.searchParams.get('short');
    return (
      alias !== null &&
      short !== null &&
      ALIAS_RE.test(alias) &&
      hostnameMatches(short, RINKU_MAIN_HOSTS)
    );
  }
  if (!hostnameMatches(url.hostname, RINKU_MAIN_HOSTS)) return false;
  const [alias, ...rest] = url.pathname.split('/').filter(Boolean);
  return alias !== undefined && rest.length === 0 && ALIAS_RE.test(alias);
};

export const initRinkuFlowWatch = (): void => {
  const tabs = new Set<number>();
  let queue = chrome.storage.session.get(STORAGE_KEY).then((stored) => {
    const raw: unknown = stored[STORAGE_KEY];
    if (Array.isArray(raw)) {
      for (const id of raw) {
        if (typeof id === 'number') tabs.add(id);
      }
    }
  });
  const run = (fn: () => void | Promise<void>): void => {
    queue = queue.then(fn);
  };
  const persist = (): Promise<void> =>
    chrome.storage.session.set({ [STORAGE_KEY]: [...tabs] });

  chrome.webNavigation.onBeforeNavigate.addListener(({ frameId, tabId, url }) => {
    if (frameId !== 0 || !url.startsWith('http') || !startsRinkuFlow(url)) return;
    run(() => {
      if (tabs.has(tabId)) return;
      tabs.add(tabId);
      return persist();
    });
  });

  chrome.runtime.onMessage.addListener((message: { type?: string }, sender, reply) => {
    const tabId = sender.tab?.id;
    if (message.type !== MESSAGE || tabId == null) return false;
    run(() => {
      reply(tabs.has(tabId));
    });
    return true;
  });

  chrome.tabs.onRemoved.addListener((tabId) => {
    run(() => {
      if (!tabs.delete(tabId)) return;
      return persist();
    });
  });
};

export const isRinkuFlowTab = async (): Promise<boolean> =>
  (await chrome.runtime.sendMessage({ type: MESSAGE })) === true;
