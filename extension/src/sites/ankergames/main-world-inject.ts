import { hostnameMatches } from '../../utils/domain-check';
import { ANKERGAMES_HOSTS, ANKERGAMES_MEDIATOR_PATH } from './hosts';
import { runAnkergamesInstantReady } from './main-world-hook';

function isMediatorUrl(url: string): boolean {
  try {
    const { hostname, pathname } = new URL(url);
    return hostnameMatches(hostname, ANKERGAMES_HOSTS) && ANKERGAMES_MEDIATOR_PATH.test(pathname);
  } catch {
    return false;
  }
}

export function initAnkergamesMainWorldInject(): void {
  chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId !== 0 || !isMediatorUrl(details.url)) return;
    void chrome.scripting.executeScript({
      target: { tabId: details.tabId, frameIds: [0] },
      world: 'MAIN',
      injectImmediately: true,
      func: runAnkergamesInstantReady,
    });
  });
}
