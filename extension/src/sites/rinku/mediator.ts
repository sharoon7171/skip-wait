import { hostnameMatches } from '../../utils/domain-check';
import { RINKU_MAIN_HOSTS } from './hosts';

const STORAGE_KEY = 'rinku-mediator-hosts';
const MESSAGE = 'RINKU_MEDIATOR_HOST' as const;
const ALIAS_RE = /^[A-Za-z0-9_-]{3,}$/;
const BACKUP_PATH_RE = /(?:^|\/)backup\/w\/?$/i;

const mediatorHost = (raw: string): string | null => {
  const url = new URL(raw);
  const alias = url.searchParams.get('get');
  const short = url.searchParams.get('short');
  return BACKUP_PATH_RE.test(url.pathname) &&
    alias &&
    short &&
    ALIAS_RE.test(alias) &&
    hostnameMatches(short, RINKU_MAIN_HOSTS)
    ? url.hostname
    : null;
};

export const initRinkuMediatorWatch = (): void => {
  const hosts = new Set<string>();
  let queue = chrome.storage.session.get(STORAGE_KEY).then((stored) => {
    const raw: unknown = stored[STORAGE_KEY];
    if (Array.isArray(raw)) {
      for (const host of raw) {
        if (typeof host === 'string') hosts.add(host);
      }
    }
  });
  const run = (fn: () => void | Promise<void>): void => {
    queue = queue.then(fn);
  };

  chrome.webNavigation.onBeforeNavigate.addListener(({ frameId, url }) => {
    if (frameId !== 0 || !url.startsWith('http')) return;
    run(() => {
      const host = mediatorHost(url);
      if (!host || hosts.has(host)) return;
      hosts.add(host);
      return chrome.storage.session.set({ [STORAGE_KEY]: [...hosts] });
    });
  });

  chrome.runtime.onMessage.addListener((message: { type?: string }, sender, reply) => {
    const url = sender.url;
    if (message.type !== MESSAGE || !url) return false;
    run(() => {
      reply(hosts.has(new URL(url).hostname));
    });
    return true;
  });
};

export const isRinkuMediatorHost = async (): Promise<boolean> =>
  (await chrome.runtime.sendMessage({ type: MESSAGE })) === true;
