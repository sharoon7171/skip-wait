import { MSG_WORKINK_HOOKS, WORKINK_MSG_SOURCE, isWorkinkGateUrl } from './hosts';
import { runWorkinkWsHooks } from './main-world-hook';

const inject = async (tabId: number, frameId = 0): Promise<void> => {
  await chrome.scripting.executeScript({
    target: { tabId, frameIds: [frameId] },
    world: 'MAIN',
    injectImmediately: true,
    func: runWorkinkWsHooks,
    args: [WORKINK_MSG_SOURCE],
  });
};

export function initWorkinkMainWorldInject(): void {
  chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId !== 0 || !isWorkinkGateUrl(details.url)) return;
    void inject(details.tabId, 0);
  });

  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message?.type !== MSG_WORKINK_HOOKS) return false;
    const tabId = sender.tab?.id;
    if (tabId === undefined) return false;
    if (sender.tab?.url && !isWorkinkGateUrl(sender.tab.url)) return false;
    void inject(tabId, sender.frameId ?? 0);
    return false;
  });
}
