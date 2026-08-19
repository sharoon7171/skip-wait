import { hostIsRemoteSite } from '../../hosts/check';
import { MSG_ANYGAME_MAIN } from './hosts';
import { runAnygameDirectDownload } from './main-world-hook';

async function isAnygameUrl(url: string): Promise<boolean> {
  try {
    return hostIsRemoteSite(new URL(url).hostname, 'anygame');
  } catch {
    return false;
  }
}

function inject(tabId: number, frameId?: number): void {
  void chrome.scripting.executeScript({
    target: frameId === undefined ? { tabId } : { tabId, frameIds: [frameId] },
    world: 'MAIN',
    injectImmediately: true,
    func: runAnygameDirectDownload,
  });
}

export function initAnygameMainWorldInject(): void {
  chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId !== 0) return;
    void isAnygameUrl(details.url).then((ok) => {
      if (!ok) return;
      inject(details.tabId, 0);
    });
  });

  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message?.type !== MSG_ANYGAME_MAIN) return false;
    const tabId = sender.tab?.id;
    if (tabId === undefined) return false;
    void (async () => {
      if (sender.tab?.url && !(await isAnygameUrl(sender.tab.url))) return;
      inject(tabId, sender.frameId ?? 0);
    })();
    return false;
  });
}
