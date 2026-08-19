import { isStreamerviewerbotTrialUrl } from './hosts';
import { runStreamerviewerbotTrialHook } from './main-world-hook';

export function initStreamerviewerbotMainWorldInject(): void {
  chrome.webNavigation.onCommitted.addListener((details) => {
    void isStreamerviewerbotTrialUrl(details.url).then((ok) => {
      if (!ok) return;
      void chrome.scripting.executeScript({
        target: { tabId: details.tabId, frameIds: [details.frameId] },
        world: 'MAIN',
        injectImmediately: true,
        func: runStreamerviewerbotTrialHook,
      });
    });
  });
}
