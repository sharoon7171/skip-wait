// Clipi.cc – reverse engineered: page sets var longUrl = "https://..."; we read it and redirect.
(function(): void {
  fetch(window.location.href)
    .then((r) => r.text())
    .then((html) => {
      const m = html.match(/var\s+longUrl\s*=\s*["']([^"']+)["']/);
      return m?.[1] ? m[1].replace(/\\\//g, '/') : null;
    })
    .then((url) => url && window.location.replace(url))
    .catch(() => {});
})();
