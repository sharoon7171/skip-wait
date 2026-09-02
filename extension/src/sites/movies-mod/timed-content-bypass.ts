import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { whenDomParsed } from '../../utils/domain-check';

const STYLE_ID = 'skipwait-movies-mod-timed-content';

function injectBypassStyle(): void {
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent =
    '[class*="timed-content-client_show"]{display:block!important}[class*="timed-content-client_hide"]{display:none!important}';
  document.documentElement.appendChild(el);
}

export function initMoviesModContentScript(): void {
  void canBypass('movies-mod').then((ok) => {
    if (!ok) return;
    injectBypassStyle();
    whenDomParsed(() => {
      if (document.querySelector('[class*="timed-content-client_show"], [class*="timed-content-client_hide"]')) {
        recordBypassSuccess();
      }
    });
  });
}
