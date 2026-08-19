import { isRemoteSite } from '../../hosts/check';
import { whenDomParsed } from '../../utils/domain-check';

const GO = /^\/go\/?$/i;
const DEST = /decodeURIComponent\s*\(\s*atob\s*\(\s*['"]([A-Za-z0-9+/=]+)['"]\s*\)\s*\)/;
const BRAND = 'skipwait-haxpc-brand';

function mountBrand(): void {
  if (document.getElementById(BRAND)) return;
  const tabs = document.getElementById('wps-tabs');
  const svg = document.querySelector('.app-box-label svg');
  if (!tabs || !svg || !document.querySelector('.entry-content a.cp-download')) return;

  const box = Object.assign(document.createElement('div'), { id: BRAND, className: 'app-box' });
  box.setAttribute('role', 'status');
  box.innerHTML =
    `<div class="app-box-head"><span class="app-box-label">${svg.outerHTML}Skip Wait</span>` +
    `<span class="share-label">Waiting page skipped — download buttons open the host directly.</span></div>`;
  tabs.before(box);
}

function unlockListing(): void {
  document.querySelectorAll('a.haxpc-intercept').forEach((a) => a.classList.remove('haxpc-intercept'));
  mountBrand();
}

export function initHaxpcListing(): void {
  if (GO.test(location.pathname)) return;
  void isRemoteSite('haxpc').then((ok) => {
    if (!ok) return;
    whenDomParsed(() => {
      document.addEventListener('DOMContentLoaded', () => setTimeout(unlockListing), { once: true });
    });
  });
}

export function initHaxpcGoPage(): void {
  if (!GO.test(location.pathname)) return;
  void isRemoteSite('haxpc').then((ok) => {
    if (!ok) return;
    const open = (): void => {
      const hash = DEST.exec(document.documentElement.innerHTML)?.[1];
      if (!hash) return;
      location.replace(decodeURIComponent(atob(hash)));
    };
    open();
    whenDomParsed(open);
  });
}
