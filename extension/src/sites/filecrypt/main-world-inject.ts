import { hostIsRemoteSite } from '../../hosts/check';
import { MSG_FILECRYPT_POW } from './hosts';
import { runFilecryptPowBypass } from './pow-hook';

async function isFilecryptUrl(url: string): Promise<boolean> {
  try {
    return hostIsRemoteSite(new URL(url).hostname, 'filecrypt');
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
    if (details.frameId !== 0 || !/\/Container\//i.test(details.url)) return;
    void (async () => {
      if (!(await isFilecryptUrl(details.url))) return;
      inject(details.tabId, 0);
    })();
  });

  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message?.type !== MSG_FILECRYPT_POW) return false;
    const tabId = sender.tab?.id;
    if (tabId === undefined) return false;
    inject(tabId, sender.frameId ?? 0);
    return false;
  });
}
