import { recordBypassSuccess } from '../../free-bypass';
import { canBypassHost } from '../../gate';
import { destinationFromQuickSearch, isCutyQuickPath } from './unlock';

function quickDestination(url: string): Promise<string | null> {
  try {
    const u = new URL(url);
    return canBypassHost(u.hostname, 'cuty').then(
      (ok) => (ok && isCutyQuickPath(u.pathname) ? destinationFromQuickSearch(u.search) : null),
    );
  } catch {
    return Promise.resolve(null);
  }
}

export function initCutyQuickRedirect(): void {
  chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    if (details.frameId !== 0) return;
    void quickDestination(details.url).then((dest) => {
      if (!dest) return;
      recordBypassSuccess();
      void chrome.tabs.update(details.tabId, { url: dest });
    });
  });
}
