// HubCDN redirect. Runs when enabled for current URL via Pastebin config.

export function initHubcdnRedirect(): void {
  const url = window.location.href;
  if (!url.includes('/dl/')) return;
  const linkMatch = url.match(/\/dl\/\?link=(.+)/);
  if (linkMatch?.[1]) {
    window.location.href = decodeURIComponent(linkMatch[1]);
  }
}
