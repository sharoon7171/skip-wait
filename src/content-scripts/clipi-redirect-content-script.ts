// Clipi redirect. Page sets var longUrl; we redirect to it. Runs when enabled for current URL via Pastebin config.

export function initClipiRedirect(): void {
  fetch(window.location.href)
    .then((r) => r.text())
    .then((html) => {
      const m = html.match(/var\s+longUrl\s*=\s*["']([^"']+)["']/);
      return m?.[1] ? m[1].replace(/\\\//g, '/') : null;
    })
    .then((url) => url && window.location.replace(url))
    .catch(() => {});
}
