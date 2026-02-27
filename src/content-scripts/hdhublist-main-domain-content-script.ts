// HDHubList main-domain redirect. Runs when enabled for current URL via Pastebin config.

const REDIRECT_URL = 'https://hdhublist.com/?re=hdhub';

export function initHdhublistMainDomain(): void {
  if (window.location.href.includes('re=hdhub')) return;
  window.location.href = REDIRECT_URL;
}
