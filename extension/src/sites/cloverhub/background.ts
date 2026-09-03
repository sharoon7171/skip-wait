import {
  MSG_CLOVER_LOOT_DONE,
  MSG_CLOVER_LOOT_PENDING,
  MSG_CLOVER_LOOT_SCAN,
} from './messages';
import { runCloverLootPostbackInject } from './postback-inject';

const pendingTabs = new Set<number>();
const retryTimers = new Map<number, number>();

const lootLocker = (url: string): boolean => {
  try {
    const u = new URL(url);
    return u.pathname === '/s' && u.search.length > 1;
  } catch {
    return false;
  }
};

const injectFrame = (tabId: number, frameId: number): void => {
  void chrome.scripting
    .executeScript({
      target: { tabId, frameIds: [frameId] },
      world: 'MAIN',
      injectImmediately: true,
      func: runCloverLootPostbackInject,
    })
    .catch(() => {});
};

const scanInject = (tabId: number): void => {
  void chrome.webNavigation.getAllFrames({ tabId }).then((frames) => {
    for (const frame of frames ?? []) {
      if (frame.frameId === undefined || !frame.url || !lootLocker(frame.url)) continue;
      injectFrame(tabId, frame.frameId);
    }
  });
};

const startRetries = (tabId: number): void => {
  const prev = retryTimers.get(tabId);
  if (prev != null) clearInterval(prev);
  let passes = 0;
  const id = setInterval(() => {
    if (!pendingTabs.has(tabId) || passes++ > 40) {
      clearInterval(id);
      retryTimers.delete(tabId);
      return;
    }
    scanInject(tabId);
  }, 400);
  retryTimers.set(tabId, id);
};

const stopRetries = (tabId: number): void => {
  const id = retryTimers.get(tabId);
  if (id != null) clearInterval(id);
  retryTimers.delete(tabId);
};

export function initCloverhubBackground(): void {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const tabId = sender.tab?.id;
    if (tabId === undefined) return false;

    if (message?.type === MSG_CLOVER_LOOT_PENDING) {
      pendingTabs.add(tabId);
      scanInject(tabId);
      startRetries(tabId);
      sendResponse({ ok: true });
      return true;
    }

    if (message?.type === MSG_CLOVER_LOOT_SCAN) {
      if (!pendingTabs.has(tabId)) return false;
      scanInject(tabId);
      sendResponse({ ok: true });
      return true;
    }

    if (message?.type === MSG_CLOVER_LOOT_DONE) {
      pendingTabs.delete(tabId);
      stopRetries(tabId);
      return false;
    }

    return false;
  });

  chrome.webNavigation.onCommitted.addListener((details) => {
    if (!pendingTabs.has(details.tabId) || !lootLocker(details.url)) return;
    injectFrame(details.tabId, details.frameId);
  });
}
