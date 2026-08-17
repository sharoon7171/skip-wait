import { isCutyHost } from './hosts';
import { destinationFromQuickSearch, isCutyQuickPath } from './unlock';

function quickDestination(url: string): string | null {
  try {
    const u = new URL(url);
    return isCutyHost(u.hostname) && isCutyQuickPath(u.pathname)
      ? destinationFromQuickSearch(u.search)
      : null;
  } catch {
    return null;
  }
}

export function initCutyQuickRedirect(): void {
  chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    if (details.frameId !== 0) return;
    const dest = quickDestination(details.url);
    if (!dest) return;
    void chrome.tabs.update(details.tabId, { url: dest });
  });
}
