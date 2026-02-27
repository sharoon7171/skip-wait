// Sub2Get redirect. #butunlock a holds real href. Runs when enabled for current URL via Pastebin config.

export function initSub2getRedirect(): void {
  const el = document.getElementById('butunlock')?.querySelector('a');
  const raw = el?.getAttribute('href');
  if (!raw?.trim()) return;
  const s = raw.trim();
  const url = /^https?:\/\//i.test(s) ? s : s.startsWith('//') ? 'https:' + s : 'https://' + s.replace(/^\//, '');
  window.location.href = url;
}
