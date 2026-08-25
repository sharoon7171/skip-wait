import { canBypassHost } from '../../gate';

export const MSG_FCLC_ALERT_SUPPRESS = 'FCLC_ALERT_SUPPRESS' as const;

function suppressAlert(): void {
  window.alert = function () {};
}

export function initFclcAlertSuppress(): void {
  chrome.runtime.onMessage.addListener((msg: { type?: string }, sender, sendResponse) => {
    if (msg?.type !== MSG_FCLC_ALERT_SUPPRESS) return false;
    const tabId = sender.tab?.id;
    const href = sender.tab?.url ?? '';
    if (tabId === undefined || !href) return false;
    void (async () => {
      try {
        if (!(await canBypassHost(new URL(href).hostname, 'fclc'))) {
          sendResponse(undefined);
          return;
        }
      } catch {
        sendResponse(undefined);
        return;
      }
      chrome.scripting
        .executeScript({ target: { tabId }, func: suppressAlert, world: 'MAIN', injectImmediately: true })
        .then(sendResponse)
        .catch(sendResponse);
    })();
    return true;
  });
}
