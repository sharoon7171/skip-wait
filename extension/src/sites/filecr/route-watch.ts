import { hostIsRemoteSite } from '../../hosts/check';
import { MSG_FILECR_ROUTE } from './hosts';

export function initFilecrRouteWatch(): void {
  chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    if (details.frameId !== 0) return;
    void (async () => {
      let host: string;
      try {
        host = new URL(details.url).hostname;
      } catch {
        return;
      }
      if (!(await hostIsRemoteSite(host, 'filecr'))) return;
      void chrome.tabs.sendMessage(details.tabId, { type: MSG_FILECR_ROUTE }).catch(() => {});
    })();
  });
}
