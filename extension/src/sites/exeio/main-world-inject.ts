import {
  type ExeioUnlockResult,
  isExeioUrl,
  MSG_EXEIO_ADBLOCK,
  MSG_EXEIO_GO_UNLOCK,
} from './hosts';
import { runExeioAdblockBypass } from './adblock-bypass';
import { runExeioGoUnlock } from './main-world-unlock';

const injectMain = (tabId: number, frameId: number, func: () => void): void => {
  void chrome.scripting.executeScript({
    target: { tabId, frameIds: [frameId] },
    world: 'MAIN',
    injectImmediately: true,
    func,
  });
};

export function initExeioAdblockInject(): void {
  chrome.webNavigation.onCommitted.addListener(({ frameId, tabId, url }) => {
    if (frameId !== 0) return;
    void (async () => {
      if (!(await isExeioUrl(url))) return;
      injectMain(tabId, 0, runExeioAdblockBypass);
    })();
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const tabId = sender.tab?.id;
    const frameId = sender.frameId ?? 0;
    if (message?.type === MSG_EXEIO_ADBLOCK) {
      void (async () => {
        if (tabId === undefined) return;
        if (sender.tab?.url && !(await isExeioUrl(sender.tab.url))) return;
        injectMain(tabId, frameId, runExeioAdblockBypass);
      })();
      return false;
    }
    if (message?.type !== MSG_EXEIO_GO_UNLOCK || tabId === undefined) return false;
    void (async () => {
      if (sender.tab?.url && !(await isExeioUrl(sender.tab.url))) {
        sendResponse({ ok: false, err: 'not exeio' });
        return;
      }
      void chrome.scripting
        .executeScript({ target: { tabId, frameIds: [frameId] }, world: 'MAIN', func: runExeioGoUnlock })
        .then((r) => sendResponse((r[0]?.result as ExeioUnlockResult | undefined) ?? { ok: false, err: 'no result' }))
        .catch((e: unknown) => sendResponse({ ok: false, err: String(e) }));
    })();
    return true;
  });
}
