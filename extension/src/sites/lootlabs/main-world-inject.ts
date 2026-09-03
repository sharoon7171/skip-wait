import { isLootLockerPath, isLootLockerUrl } from './locker';
import {
  LOOT_MSG_SOURCE,
  MSG_INJECT_LOOT,
  MSG_INJECT_LOOT_CAPTCHA,
  MSG_LOOT_CAPTCHA_VERIFY,
} from './messages';
import { runLootBootstrap, runLootCaptchaBridge } from './main-world-hook';

type MainInject = (msgSource: string) => void;

const injectFrame = (tabId: number, frameId: number, func: MainInject): void => {
  void chrome.scripting
    .executeScript({
      target: { tabId, frameIds: [frameId] },
      world: 'MAIN',
      injectImmediately: true,
      func,
      args: [LOOT_MSG_SOURCE],
    })
    .catch(() => {});
};

const injectAllFrames = (tabId: number, func: MainInject): void => {
  void chrome.scripting
    .executeScript({
      target: { tabId, allFrames: true },
      world: 'MAIN',
      injectImmediately: true,
      func,
      args: [LOOT_MSG_SOURCE],
    })
    .catch(() => {});
};

const lockerTabUrl = (url: string): boolean => {
  try {
    const u = new URL(url);
    return isLootLockerPath(u.pathname, u.search);
  } catch {
    return false;
  }
};

export function initLootlabsMainWorldInject(): void {
  chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId !== 0) return;
    try {
      const u = new URL(details.url);
      if (isLootLockerPath(u.pathname, u.search)) injectFrame(details.tabId, 0, runLootBootstrap);
    } catch {}
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const tabId = sender.tab?.id;
    if (tabId === undefined) return false;
    const tabUrl = sender.tab?.url ?? '';

    if (message?.type === MSG_INJECT_LOOT) {
      if (!lockerTabUrl(tabUrl)) return false;
      injectFrame(tabId, sender.frameId ?? 0, runLootBootstrap);
      return false;
    }

    if (message?.type === MSG_INJECT_LOOT_CAPTCHA) {
      if (!lockerTabUrl(tabUrl)) return false;
      const frameId = sender.frameId ?? 0;
      if (frameId !== 0) injectFrame(tabId, frameId, runLootCaptchaBridge);
      else injectAllFrames(tabId, runLootCaptchaBridge);
      return false;
    }

    if (message?.type === MSG_LOOT_CAPTCHA_VERIFY && typeof message.url === 'string' && typeof message.token === 'string') {
      void (async () => {
        if (!(await isLootLockerUrl(tabUrl))) {
          sendResponse({ ok: false });
          return;
        }
        const page = new URL(message.url);
        const urid = page.searchParams.get('urid');
        if (!urid) {
          sendResponse({ ok: false });
          return;
        }
        const res = await fetch(`${page.origin}/captcha/verify`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ urid, token: message.token }),
        });
        sendResponse({ ok: res.ok });
      })();
      return true;
    }

    return false;
  });
}
