import { linksGoFormFromHtml, postLinksGo } from '../adlinkfly/unlock';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { EARNLINKS_UNLOCK_HOSTS } from './hosts';

const OVERLAY_ID = 'skip-wait-earnlinks-overlay';
const BOOT_STYLE_ID = 'skip-wait-earnlinks-boot';
const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;
let done = false;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const boot = (): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = BOOT_STYLE_ID;
  s.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head || document.documentElement).appendChild(s);
};

const mount = (status: string): FullPageOverlay => {
  boot();
  if (ui) {
    ui.setStatus(status);
    return ui;
  }
  ui = createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note: NOTE,
    status,
    countdownLabel: 'Your link opens in',
  });
  return ui;
};

const counterSec = (): number => {
  const m = document.documentElement.innerHTML.match(/["']counter_value["']\s*:\s*["']?(\d+)/);
  if (m?.[1]) return Math.max(0, parseInt(m[1], 10));
  const n = parseInt(document.querySelector('#timer')?.textContent?.trim() ?? '', 10);
  return Number.isFinite(n) && n > 0 ? n : 5;
};

const prep = (): void => {
  chrome.runtime.sendMessage({ type: 'INJECT_VISIBILITY_SPOOF' }).catch(() => {});
  try {
    document.cookie = 'ab=1; path=/';
  } catch {}
  try {
    const w = window as unknown as { blurred?: boolean; onblur?: unknown; onfocus?: unknown };
    w.blurred = false;
    w.onblur = null;
    w.onfocus = null;
  } catch {}
  try {
    const av = (window as unknown as { app_vars?: Record<string, unknown> }).app_vars;
    if (av) av['force_disable_adblock'] = '0';
  } catch {}
};

const unlock = async (): Promise<void> => {
  if (done || !document.querySelector('#go-link input[name="ad_form_data"]')) return;
  done = true;
  prep();
  const overlay = mount('Unlocking…');
  const form = linksGoFormFromHtml(document.documentElement.outerHTML, location.href);
  if (!form) {
    done = false;
    return;
  }
  let url = await postLinksGo(form, location.href);
  if (!url) {
    const sec = counterSec();
    overlay.setStatus('Waiting for timer…');
    overlay.startCountdown(Date.now() + sec * 1000);
    await sleep(sec * 1000 + 400);
    overlay.hideCountdown();
    overlay.setStatus('Unlocking…');
    url = await postLinksGo(form, location.href);
    for (let i = 0; !url && i < 8; i++) {
      await sleep(250);
      url = await postLinksGo(form, location.href);
    }
  }
  if (!url) {
    done = false;
    overlay.setError('Could not unlock. Refresh and try again.');
    return;
  }
  overlay.setStatus('Opening…');
  location.replace(url);
};

export function initEarnlinksUnlock(): void {
  if (window !== window.top || !isAllowedHost(EARNLINKS_UNLOCK_HOSTS)) return;
  whenDomParsed(() => void unlock());
}
