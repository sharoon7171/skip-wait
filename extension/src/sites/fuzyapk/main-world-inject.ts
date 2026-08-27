import { canBypassHost } from '../../gate';
import { FUZYAPK_GATE_PAGE } from './hosts';
import { runFuzyapkReveal } from './main-world-hook';

export function initFuzyapkMainWorldInject(): void {
  chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId !== 0 || !URL.canParse(details.url)) return;
    const u = new URL(details.url);
    if (!FUZYAPK_GATE_PAGE.test(u.pathname)) return;
    void canBypassHost(u.hostname, 'fuzyapk').then((ok) => {
      if (!ok) return;
      void chrome.scripting.executeScript({
        target: { tabId: details.tabId, frameIds: [0] },
        world: 'MAIN',
        injectImmediately: true,
        func: runFuzyapkReveal,
      });
    });
  });
}
