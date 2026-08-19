import { type CutyUnlockResult, isCutyUrl, MSG_CUTY_GO_UNLOCK } from './hosts';
import { runCutyGoUnlock } from './main-world-unlock';

export function initCutyGoUnlockInject(): void {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const tabId = sender.tab?.id;
    if (message?.type !== MSG_CUTY_GO_UNLOCK || tabId === undefined) return false;

    void (async () => {
      if (sender.tab?.url && !(await isCutyUrl(sender.tab.url))) {
        sendResponse({ ok: false, err: 'not cuty' });
        return;
      }

      void chrome.scripting
        .executeScript({
          target: { tabId, frameIds: [sender.frameId ?? 0] },
          world: 'MAIN',
          func: runCutyGoUnlock,
        })
        .then((r) =>
          sendResponse((r[0]?.result as CutyUnlockResult | undefined) ?? { ok: false, err: 'no result' }),
        )
        .catch((e: unknown) => sendResponse({ ok: false, err: String(e) }));
    })();
    return true;
  });
}
