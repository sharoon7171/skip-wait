import { canBypass } from '../../gate';
import { whenDomParsed } from '../../utils/domain-check';

const LABEL = 'Direct Instant · Skip Wait';
const DOWNLOAD = /^\/download\/?$/i;
const STYLE = 'skipwait-latestmodapks';

const bootStyle = (): void => {
  if (document.getElementById(STYLE)) return;
  const s = document.createElement('style');
  s.id = STYLE;
  s.textContent =
    'a.download-btn-main.faded-disabled-btn{opacity:1!important;pointer-events:auto!important;filter:none!important}' +
    'a.download-btn-main .spinner-wait{display:none!important}' +
    'a.download-btn-main .icon-download{display:block!important}' +
    'a.download-btn-main .dld-btn-text p{color:#f1f5f9!important}' +
    'a.download-btn-main .dld-btn-text p:last-child{color:#38bdf8!important;font-weight:800!important}' +
    '#download-loading{display:none!important}' +
    'a.download-page-download-btn.hidden{display:flex!important}' +
    'a.download-page-download-btn span{color:#38bdf8!important;font-weight:800!important}';
  (document.head ?? document.documentElement).appendChild(s);
};

const hopFromDownload = async (downloadUrl: string): Promise<string> => {
  const res = await fetch(downloadUrl, { credentials: 'include', cache: 'no-store' });
  if (!res.ok) throw new Error('download page');
  const href = new DOMParser()
    .parseFromString(await res.text(), 'text/html')
    .querySelector('a.download-page-download-btn')
    ?.getAttribute('href');
  if (!href) throw new Error('download hop');
  return new URL(href, downloadUrl).href;
};

const wire = (btn: HTMLAnchorElement, hop: Promise<string>, labelEl: Element | null): void => {
  btn.classList.remove('faded-disabled-btn', 'hidden');
  if (labelEl) labelEl.textContent = LABEL;
  void hop.then((url) => {
    btn.href = url;
    btn.removeAttribute('target');
  });
  btn.addEventListener(
    'click',
    (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      void hop.then((url) => location.assign(url));
    },
    true,
  );
};

export function initLatestmodapksDirectDownload(): void {
  void canBypass('latestmodapks').then((ok) => {
    if (!ok) return;
    bootStyle();

    let done = false;
    const arm = (): boolean => {
      if (done) return true;
      if (DOWNLOAD.test(location.pathname)) {
        const btn = document.querySelector<HTMLAnchorElement>('a.download-page-download-btn');
        if (!btn?.href) return false;
        done = true;
        wire(btn, Promise.resolve(btn.href), btn.querySelector('span'));
        return true;
      }
      const btn = document.querySelector<HTMLAnchorElement>('a.download-btn-main[href]');
      if (!btn || !URL.canParse(btn.href) || !DOWNLOAD.test(new URL(btn.href).pathname)) return false;
      done = true;
      wire(btn, hopFromDownload(btn.href), btn.querySelector('.dld-btn-text p:last-child'));
      return true;
    };

    if (arm()) return;
    const mo = new MutationObserver(() => {
      if (arm()) mo.disconnect();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
    whenDomParsed(() => {
      if (arm()) mo.disconnect();
    });
  });
}
