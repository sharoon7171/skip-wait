// PRMovies countdown bypass. Runs when enabled for current URL via Pastebin config.

export function initPrmoviesRedirect(): void {
  fetch('https://rep.prmovies3.online/api/get?v=' + Date.now(), { cache: 'no-cache' })
    .then((r) => r.json())
    .then((data: { key?: string }) => {
      if (data?.key) window.location.href = 'https://' + atob(data.key);
    })
    .catch(() => {});
}
