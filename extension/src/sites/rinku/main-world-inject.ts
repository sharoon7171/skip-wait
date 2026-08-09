import { runDocumentVisibilitySpoof } from '../../background/document-visibility-spoof';
import { hostnameMatches } from '../../utils/domain-check';
import { MSG_RINKU_PAGE_HOOKS, RINKU_GATE_HOSTS, RINKU_MEDIATOR_HOSTS } from './hosts';
import { runRinkuPageHooks } from './page-hooks';

const isRinkuHookUrl = (url: string): boolean => {
  try {
    const hostname = new URL(url).hostname;
    return hostnameMatches(hostname, RINKU_MEDIATOR_HOSTS) || hostnameMatches(hostname, RINKU_GATE_HOSTS);
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
    if (details.frameId !== 0 || !isRinkuHookUrl(details.url)) return;
    inject(details.tabId);
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
    if (sender.tab?.url && !isRinkuHookUrl(sender.tab.url)) return false;
    inject(tabId, sender.frameId ?? 0);
    return false;
  });
};
