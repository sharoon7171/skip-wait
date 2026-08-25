import { canBypassHost } from '../../gate';
import { ANKERGAMES_MEDIATOR_PATH } from './hosts';
import { runAnkergamesInstantReady } from './main-world-hook';

async function isMediatorUrl(url: string): Promise<boolean> {
  try {
    const { hostname, pathname } = new URL(url);
    return (await canBypassHost(hostname, 'ankergames')) && ANKERGAMES_MEDIATOR_PATH.test(pathname);
  } catch {
    return false;
  }
}

export function initAnkergamesMainWorldInject(): void {
  chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId !== 0) return;
    void isMediatorUrl(details.url).then((ok) => {
      if (!ok) return;
      void chrome.scripting.executeScript({
        target: { tabId: details.tabId, frameIds: [0] },
        world: 'MAIN',
        injectImmediately: true,
        func: runAnkergamesInstantReady,
      });
    });
  });
}
