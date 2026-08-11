import { isVexfileDownloadUrl, MSG_VEXFILE_VERIFY_HOOK } from './hosts';
import { runVexfileVerifyHook } from './main-world-hook';

function inject(tabId: number, frameId?: number): void {
  void chrome.scripting.executeScript({
    target: frameId === undefined ? { tabId } : { tabId, frameIds: [frameId] },
    world: 'MAIN',
    injectImmediately: true,
    func: runVexfileVerifyHook,
  });
}

export function initVexfileMainWorldInject(): void {
  chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId !== 0 || !isVexfileDownloadUrl(details.url)) return;
    inject(details.tabId, 0);
  });

  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message?.type !== MSG_VEXFILE_VERIFY_HOOK) return false;
    const tabId = sender.tab?.id;
    if (tabId === undefined) return false;
    if (sender.tab?.url && !isVexfileDownloadUrl(sender.tab.url)) return false;
    inject(tabId, sender.frameId ?? 0);
    return false;
  });
}
