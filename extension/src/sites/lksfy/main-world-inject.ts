import { canBypassHost } from '../../gate';
import { runLksfyAdblockBypass } from './adblock-bypass';
import { MSG_LKSFY_ADBLOCK } from './hosts';

async function isLksfyUrl(url: string): Promise<boolean> {
  try {
    return canBypassHost(new URL(url).hostname, 'lksfy');
  } catch {
    return false;
  }
}

function inject(tabId: number, frameId?: number): void {
  void chrome.scripting.executeScript({
    target: frameId === undefined ? { tabId } : { tabId, frameIds: [frameId] },
    world: 'MAIN',
    injectImmediately: true,
    func: runLksfyAdblockBypass,
  });
}

export function initLksfyAdblockInject(): void {
  chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId !== 0) return;
    void isLksfyUrl(details.url).then((ok) => {
      if (!ok) return;
      inject(details.tabId, 0);
    });
  });

  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message?.type !== MSG_LKSFY_ADBLOCK) return false;
    const tabId = sender.tab?.id;
    if (tabId === undefined) return false;
    inject(tabId, sender.frameId ?? 0);
    return false;
  });
}
