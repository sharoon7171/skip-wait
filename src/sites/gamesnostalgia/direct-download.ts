import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { GAMESNOSTALGIA_HOSTS } from './hosts';

const API = '/download_post_call.php';
const QUERY_RE = /\?g=(\d+)&f=(\d+)&gpath=([^&"']+)&lang=([^&"']+)/;
const CDN_RE = /href=['"](https:\/\/cdn\.gamesnostalgia\.com[^'"]+)/i;
const BRAND_ID = 'skipwait-gamesnostalgia-brand';
const SPINNER = '//t.gamesnostalgia.com/img/loading3.gif';

function resolveCdn(g: string, f: string, gpath: string, lang: string): Promise<string | null> {
  return fetch(`${API}?g=${g}&f=${f}&gpath=${gpath}&lang=${lang}&rnd=${Math.random()}`, {
    credentials: 'same-origin',
    cache: 'no-store',
  })
    .then((r) => (r.ok ? r.text() : ''))
    .then((html) => html.match(CDN_RE)?.[1] ?? null);
}

function setBrand(btn: HTMLElement, text: string): void {
  let el = document.getElementById(BRAND_ID);
  if (!el) {
    el = Object.assign(document.createElement('p'), {
      id: BRAND_ID,
      className: 'small text-success mt-2 mb-0',
    });
    el.setAttribute('role', 'status');
    btn.after(el);
  }
  el.textContent = text;
}

function wire(btn: HTMLButtonElement, g: string, f: string, gpath: string, lang: string): void {
  const it = lang === 'it';
  const saved = btn.innerHTML;

  btn.removeAttribute('data-bs-toggle');
  btn.removeAttribute('data-bs-target');
  btn.disabled = true;
  btn.innerHTML = `<img src="${SPINNER}" alt=""> ${it ? 'Generazione…' : 'Generating…'}`;
  setBrand(btn, it ? 'Skip Wait — generazione del link CDN…' : 'Skip Wait — generating CDN link…');

  const pending = resolveCdn(g, f, gpath, lang).then((url) => {
    btn.disabled = false;
    btn.innerHTML = saved;
    setBrand(
      btn,
      url
        ? it
          ? 'Skip Wait — link CDN pronto, clicca per scaricare'
          : 'Skip Wait — CDN link ready, click to download'
        : it
          ? 'Skip Wait — generazione non riuscita, riprova'
          : 'Skip Wait — could not generate link, try again'
    );
    return url;
  });

  btn.addEventListener(
    'click',
    (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      void pending.then((url) => {
        if (url) location.assign(url);
      });
    },
    true
  );
}

export function initGamesnostalgiaDirectDownload(): void {
  if (!isAllowedHost(GAMESNOSTALGIA_HOSTS)) return;
  if (!/\/download\//i.test(location.pathname)) return;
  whenDomParsed(() => {
    const btn = document.getElementById('download-button');
    const q = document.documentElement.innerHTML.match(QUERY_RE);
    if (!(btn instanceof HTMLButtonElement) || !q?.[1] || !q[2] || !q[3] || !q[4]) return;
    wire(btn, q[1], q[2], q[3], q[4]);
  });
}
