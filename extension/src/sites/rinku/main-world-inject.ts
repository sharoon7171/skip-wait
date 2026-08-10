import { runDocumentVisibilitySpoof } from '../../background/document-visibility-spoof';
import { hostnameMatches } from '../../utils/domain-check';
import { readRinkuChain, rinkuAliasFromPath, writeRinkuChain } from './chain';
import { RINKU_MAIN_HOSTS, MSG_RINKU_PAGE_HOOKS } from './hosts';
import { runRinkuPageHooks } from './page-hooks';

const seedChainFromShortUrl = async (url: string): Promise<void> => {
  try {
    const u = new URL(url);
    if (!hostnameMatches(u.hostname, RINKU_MAIN_HOSTS)) return;
    const alias = rinkuAliasFromPath(u.pathname);
    if (alias) await writeRinkuChain(alias, u.origin);
  } catch {}
};

const isRinkuHookUrl = (url: string): boolean => {
  try {
    return /^\/rinku\/(land|out)\/?$/i.test(new URL(url).pathname);
  } catch {
    return false;
  }
};

const inject = (tabId: number, frameId = 0): void => {
  const target: chrome.scripting.InjectionTarget = { tabId, frameIds: [frameId] };
  void chrome.scripting.executeScript({
    target,
    world: 'MAIN',
    injectImmediately: true,
    func: runDocumentVisibilitySpoof,
  });
  void chrome.scripting.executeScript({
    target,
    world: 'MAIN',
    injectImmediately: true,
    func: runRinkuPageHooks,
  });
};

export const initRinkuPageHooksInject = (): void => {
  chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId !== 0) return;
    void (async () => {
      await seedChainFromShortUrl(details.url);
      if (!isRinkuHookUrl(details.url)) return;
      if (!(await readRinkuChain())) return;
      inject(details.tabId);
    })();
  });

  chrome.runtime.onMessage.addListener((message: unknown, sender) => {
    if (
      !message ||
      typeof message !== 'object' ||
      !('type' in message) ||
      message.type !== MSG_RINKU_PAGE_HOOKS
    ) {
      return false;
    }
    const tabId = sender.tab?.id;
    if (tabId === undefined) return false;
    void (async () => {
      if (!(await readRinkuChain())) return;
      inject(tabId, sender.frameId ?? 0);
    })();
    return false;
  });
};
