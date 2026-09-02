import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { whenDomParsed } from '../../utils/domain-check';

const BRAND = 'skipwait-an1';
const STYLE = 'skipwait-an1-css';
let counted = false;

function paint(): void {
  if (document.getElementById(STYLE)) return;
  const s = document.createElement('style');
  s.id = STYLE;
  s.textContent = '#timer,#after_download{display:none!important}#pre_download{display:inline!important}';
  document.documentElement.append(s);
}

function reveal(): boolean {
  const btn = document.querySelector<HTMLAnchorElement>('a#pre_download[href]');
  if (!btn) return false;
  document.getElementById('timer')?.remove();
  btn.style.display = 'inline';
  btn.removeAttribute('onclick');
  if (document.getElementById(BRAND) || counted) return true;
  counted = true;
  recordBypassSuccess();
  const foot = document.querySelector('.box-file > .foot');
  if (!foot) return true;
  const notice = Object.assign(document.createElement('div'), {
    id: BRAND,
    className: 'dopinfo',
    innerHTML: '<h2>Skip Wait</h2><h3>Countdown skipped — APK download is ready.</h3>',
  });
  notice.setAttribute('role', 'status');
  foot.before(notice);
  return true;
}

export function initAn1Bypass(): void {
  void canBypass('an1').then((ok) => {
    if (!ok) return;
    paint();
    const go = (): void => {
      if (reveal()) return;
      new MutationObserver((_, mo) => {
        if (reveal()) mo.disconnect();
      }).observe(document.documentElement, { childList: true, subtree: true });
    };
    whenDomParsed(go);
  });
}
