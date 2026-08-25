import { canBypassHost } from '../../gate';
import { MSG_VEXFILE_VERIFY_HOOK, VEXFILE_CODE_RE } from './hosts';
import { runVexfileVerifyHook } from './main-world-hook';

const isVexfileDownloadNav = async (url: string): Promise<boolean> => {
  try {
    const u = new URL(url);
    if (!VEXFILE_CODE_RE.test(u.pathname)) return false;
    return canBypassHost(u.hostname, 'vexfile');
  } catch {
    return false;
  }
};

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
    if (details.frameId !== 0) return;
    void isVexfileDownloadNav(details.url).then((ok) => {
      if (ok) inject(details.tabId, 0);
    });
  });

  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message?.type !== MSG_VEXFILE_VERIFY_HOOK) return false;
    const tabId = sender.tab?.id;
    const href = sender.tab?.url;
    if (tabId === undefined || !href) return false;
    void isVexfileDownloadNav(href).then((ok) => {
      if (ok) inject(tabId, sender.frameId ?? 0);
    });
    return false;
  });
}
