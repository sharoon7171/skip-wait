import { FILECRYPT_HOSTS, MSG_FILECRYPT_POW } from './hosts';
import { runFilecryptPowBypass } from './pow-hook';

function isFilecryptUrl(url: string): boolean {
  try {
    const h = new URL(url).hostname.toLowerCase();
    return FILECRYPT_HOSTS.some((d) => h === d || h.endsWith('.' + d));
  } catch {
    return false;
  }
}

function inject(tabId: number, frameId?: number): void {
  void chrome.scripting.executeScript({
    target: frameId === undefined ? { tabId } : { tabId, frameIds: [frameId] },
    world: 'MAIN',
    injectImmediately: true,
    func: runFilecryptPowBypass,
  });
}

export function initFilecryptPowInject(): void {
  chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId !== 0 || !isFilecryptUrl(details.url)) return;
    if (!/\/Container\//i.test(details.url)) return;
    inject(details.tabId, 0);
  });

  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message?.type !== MSG_FILECRYPT_POW) return false;
    const tabId = sender.tab?.id;
    if (tabId === undefined) return false;
    inject(tabId, sender.frameId ?? 0);
    return false;
  });
}
