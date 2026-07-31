import { APKTEAL_HOSTS, MSG_APKTEAL_MAIN } from './hosts';
import { runApktealDirectDownload } from './main-world-hook';

function isApktealUrl(url: string): boolean {
  try {
    const h = new URL(url).hostname.toLowerCase();
    return APKTEAL_HOSTS.some((d) => h === d || h.endsWith('.' + d));
  } catch {
    return false;
  }
}

function inject(tabId: number, frameId?: number): void {
  void chrome.scripting.executeScript({
    target: frameId === undefined ? { tabId } : { tabId, frameIds: [frameId] },
    world: 'MAIN',
    injectImmediately: true,
    func: runApktealDirectDownload,
  });
}

export function initApktealMainWorldInject(): void {
  chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId !== 0 || !isApktealUrl(details.url)) return;
    inject(details.tabId, 0);
  });

  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message?.type !== MSG_APKTEAL_MAIN) return false;
    const tabId = sender.tab?.id;
    if (tabId === undefined) return false;
    if (sender.tab?.url && !isApktealUrl(sender.tab.url)) return false;
    inject(tabId, sender.frameId ?? 0);
    return false;
  });
}
