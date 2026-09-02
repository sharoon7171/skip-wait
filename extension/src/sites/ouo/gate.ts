import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { isOuoGoGate, isOuoLandingGate, ouoGoForm, ouoLandingForm } from './detect';

const OVERLAY_ID = 'skip-wait-ouo-overlay';
const BOOT_STYLE_ID = 'skip-wait-ouo-boot';
const FORM_DONE = 'data-skip-wait-submitted';
const STATUS = 'Opening your link…';

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;
let landingStarted = false;
let goStarted = false;

const requestVisibilitySpoof = (): void => {
  chrome.runtime.sendMessage({ type: 'INJECT_VISIBILITY_SPOOF' }).catch(() => {});
};

const clearSiteTimers = (): void => {
  const highest = window.setTimeout(() => {}, 0);
  for (let i = 0; i <= highest; i++) {
    window.clearTimeout(i);
    window.clearInterval(i);
  }
};

const bootOverlayLock = (): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BOOT_STYLE_ID;
  style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head || document.documentElement).appendChild(style);
};

const mountUi = (): FullPageOverlay => {
  bootOverlayLock();
  if (ui) {
    ui.setStatus(STATUS);
    ui.setError(null);
    return ui;
  }
  ui = createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note: NOTE,
    status: STATUS,
    countdownLabel: 'Your link opens in',
  });
  return ui;
};

const submitOnce = (form: HTMLFormElement): void => {
  if (form.getAttribute(FORM_DONE) === '1') return;
  form.setAttribute(FORM_DONE, '1');
  clearSiteTimers();
  HTMLFormElement.prototype.submit.call(form);
};

const unlockGoTimerUi = (): void => {
  const timer = document.getElementById('timer');
  if (timer) timer.textContent = '0';
  const countdown = document.getElementById('countdown');
  if (countdown) countdown.className = 'countdown end';
  const btn = document.getElementById('btn-main');
  if (btn) btn.className = 'btn btn-main';
};

const runLandingGate = (): void => {
  if (landingStarted) return;
  const form = ouoLandingForm();
  if (!form) return;
  landingStarted = true;
  mountUi();
  submitOnce(form);
};

const runGoGate = (): void => {
  if (goStarted) return;
  const form = ouoGoForm();
  if (!form) return;
  goStarted = true;
  mountUi();
  unlockGoTimerUi();
  recordBypassSuccess();
  submitOnce(form);
};

const tick = (): void => {
  if (isOuoGoGate()) {
    bootOverlayLock();
    runGoGate();
    return;
  }
  if (isOuoLandingGate()) {
    bootOverlayLock();
    runLandingGate();
  }
};

export function initOuoBypass(): void {
  void canBypass('ouo').then((ok) => {
    if (!ok) return;
    requestVisibilitySpoof();
    tick();
    const mo = new MutationObserver(tick);
    mo.observe(document.documentElement, { childList: true, subtree: true });
  });
}
