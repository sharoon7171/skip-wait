import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { pinSiteWidgetOverOverlay } from '../../injected-ui/pin-site-widget';
import {
  isCloudflareChallenge,
  rinkuCaptchaWidget,
  rinkuForm,
} from './detect';
import { isRinkuMediatorHost } from './mediator';

const OVERLAY_ID = 'skip-wait-rinku-overlay';
const CAPTCHA_PIN_STYLE_ID = 'skip-wait-rinku-captcha-pin';
const CAPTCHA_WIDGET_ID = 'skip-wait-rinku-captcha';
const FORM_DONE = 'data-skip-wait-submitted';
const FORM_PACED = 'data-skip-wait-paced';
const CAPTCHA_IFRAMES = ['iframe[src*="turnstile"]'] as const;
const UNLOCK_MIN_MS = 21_000;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

const CAPTCHA_NOTE = {
  lead: 'Confirm you’re human.',
  detail: 'Complete the check below. We’ll continue automatically when it’s done.',
} as const;

let ui: FullPageOverlay | null = null;
let captchaStarted = false;

const submitOnce = (form: HTMLFormElement): void => {
  if (form.getAttribute(FORM_DONE) === '1') return;
  form.setAttribute(FORM_DONE, '1');
  HTMLFormElement.prototype.submit.call(form);
};

const submitPaced = (form: HTMLFormElement, overlay: FullPageOverlay): void => {
  form.setAttribute(FORM_PACED, '1');
  const wait = UNLOCK_MIN_MS - performance.now();
  if (wait <= 0) {
    submitOnce(form);
    return;
  }
  overlay.startCountdown(Date.now() + wait);
  window.setTimeout(() => submitOnce(form), wait);
};

const mountUi = (
  status: string,
  note: { lead: string; detail?: string } = NOTE,
): FullPageOverlay => {
  if (ui) {
    ui.setNote(note);
    ui.setStatus(status);
    ui.setError(null);
    return ui;
  }
  ui = createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note,
    status,
    countdownLabel: 'Your link opens in',
  });
  return ui;
};

const hasTurnstileToken = (): boolean => {
  const el = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(
    '[name="cf-turnstile-response"]',
  );
  return (el?.value.trim().length ?? 0) > 20;
};

const revealCaptcha = (widget: HTMLElement): void => {
  document.getElementById('overlay')?.remove();
  for (let el = widget.parentElement; el && el !== document.body; el = el.parentElement) {
    const style = getComputedStyle(el);
    if (style.display === 'none') el.style.setProperty('display', 'block', 'important');
    if (style.visibility === 'hidden') el.style.setProperty('visibility', 'visible', 'important');
    if (style.pointerEvents === 'none') el.style.setProperty('pointer-events', 'auto', 'important');
  }
};

const runCaptchaGate = (form: HTMLFormElement, widget: HTMLElement): void => {
  if (captchaStarted) return;
  captchaStarted = true;
  const overlay = mountUi('Complete the captcha below.', CAPTCHA_NOTE);
  if (!widget.id) widget.id = CAPTCHA_WIDGET_ID;
  document.getElementById('delulu-overlay')?.style.setProperty('display', 'none', 'important');
  revealCaptcha(widget);

  const stopPin = pinSiteWidgetOverOverlay({
    overlayId: OVERLAY_ID,
    mount: overlay.turnstileMount,
    widgetId: widget.id,
    styleId: CAPTCHA_PIN_STYLE_ID,
    alsoVisibleSelectors: CAPTCHA_IFRAMES,
  });
  const poll = window.setInterval(() => {
    if (!document.contains(form)) {
      window.clearInterval(poll);
      stopPin();
      captchaStarted = false;
      return;
    }
    if (!hasTurnstileToken()) return;
    window.clearInterval(poll);
    stopPin();
    document.getElementById('sf-lock')?.style.setProperty('display', 'none', 'important');
    document.getElementById('sf-go-btn')?.style.setProperty('display', 'none', 'important');
    overlay.setNote(NOTE);
    overlay.setStatus('Continuing…');
    submitOnce(form);
  }, 100);
};

const tick = (): boolean => {
  if (isCloudflareChallenge()) return false;
  const form = rinkuForm();
  if (!form) return false;
  const widget = rinkuCaptchaWidget();
  const countdown = document.getElementById('redirect-link');
  if (widget && !countdown) {
    runCaptchaGate(form, widget);
    return true;
  }
  if (!countdown || !document.getElementById('count')) return false;
  if (form.getAttribute(FORM_PACED) !== '1') {
    submitPaced(form, mountUi('Opening destination…'));
  }
  return true;
};

const watch = (): void => {
  let queued = false;
  const observer = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      if (tick()) observer.disconnect();
    });
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  if (tick()) observer.disconnect();
};

export const initRinkuGate = (): void => {
  if (window !== window.top) return;
  void isRinkuMediatorHost().then((mediator) => {
    if (mediator) watch();
  });
};
