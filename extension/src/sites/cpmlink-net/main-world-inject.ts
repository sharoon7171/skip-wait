import { canBypassHost } from '../../gate';
import { runCpmlinkNetAdblockBypass } from './adblock-bypass';
import { MSG_RESET_CAPTCHA, SITE } from './hosts';

const resetRecaptcha = (): void => {
  try {
    (window as Window & { grecaptcha?: { reset: () => void } }).grecaptcha?.reset();
  } catch {}
};

const inject = (tabId: number, frameId: number, func: () => void): void => {
  void chrome.scripting.executeScript({
    target: { tabId, frameIds: [frameId] },
    world: 'MAIN',
    injectImmediately: true,
    func,
  });
};

export function initCpmlinkNetAdblockInject(): void {
  chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId !== 0) return;
    try {
      void canBypassHost(new URL(details.url).hostname, SITE).then((ok) => {
        if (ok) inject(details.tabId, 0, runCpmlinkNetAdblockBypass);
      });
    } catch {}
  });

  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message?.type !== MSG_RESET_CAPTCHA) return false;
    const tabId = sender.tab?.id;
    if (tabId === undefined) return false;
    inject(tabId, sender.frameId ?? 0, resetRecaptcha);
    return false;
  });
}
