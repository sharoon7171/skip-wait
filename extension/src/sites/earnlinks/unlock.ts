import { linksGoFormFromHtml, postLinksGo } from '../adlinkfly/unlock';
import { createFullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { whenDomReady } from '../../utils/domain-check';
import { isEarnlinksShortUrl } from './chain';

const ID = 'skip-wait-earnlinks-overlay';
const BOOT = 'skip-wait-earnlinks-boot';
const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let done = false;

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const counterSec = (): number => {
  const m = document.documentElement.innerHTML.match(/["']counter_value["']\s*:\s*["']?(\d+)/);
  return m?.[1] ? parseInt(m[1], 10) : 0;
};

const mount = (status: string) => {
  const active = overlayActiveClass(ID);
  document.documentElement.classList.add(active);
  if (!document.getElementById(BOOT)) {
    const s = document.createElement('style');
    s.id = BOOT;
    s.textContent = buildFullPageOverlayCss(ID, active);
    document.documentElement.appendChild(s);
  }
  return createFullPageOverlay({ id: ID, brand: 'Skip Wait', note: NOTE, status });
};

export const initEarnlinksUnlock = (): void => {
  if (window !== window.top || !isEarnlinksShortUrl() || done) return;
  done = true;
  const overlay = mount('Starting Earnlinks…');
  void (async () => {
    await whenDomReady(
      () => !!document.querySelector('#go-link input[name="ad_form_data"]') && counterSec() > 0,
    );
    void chrome.runtime.sendMessage({ type: 'INJECT_VISIBILITY_SPOOF' }).catch(() => undefined);
    try {
      document.cookie = 'ab=1; path=/';
    } catch {}
    const sec = counterSec();
    overlay.setStatus('Unlocking…');
    overlay.startCountdown(Date.now() + sec * 1000);
    await sleep(sec * 1000);
    overlay.hideCountdown();
    const form = linksGoFormFromHtml(document.documentElement.outerHTML, location.href);
    const url = form ? await postLinksGo(form, location.href) : null;
    if (!url) {
      overlay.setError('Could not unlock. Reload and try again.');
      return;
    }
    overlay.setStatus('Opening…');
    location.replace(url);
  })();
};
