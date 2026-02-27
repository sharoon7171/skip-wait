// fc-lc redirect. Runs when enabled for current URL via Pastebin config.

export function initFcLcRedirect(): void {
  const scripts = document.querySelectorAll<HTMLScriptElement>('script');
  let redirectUrl = '';
  for (const script of scripts) {
    if (script.textContent?.includes('REDIRECT_URL')) {
      const match = script.textContent.match(/REDIRECT_URL\s*=\s*"([^"]+)"/);
      if (match?.[1]) {
        redirectUrl = match[1];
        break;
      }
    }
  }
  if (redirectUrl) window.location.replace(redirectUrl);
}
