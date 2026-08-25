import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { pinSiteWidgetOverOverlay } from '../../injected-ui/pin-site-widget';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { GOOST_ALIAS_RE } from './hosts';

const OVERLAY_ID = 'skip-wait-goost-mediator';
const BOOT_STYLE_ID = 'skip-wait-goost-mediator-boot';
const PIN_STYLE_ID = 'skip-wait-goost-captcha-pin';
const WIDGET_ID = 'skip-wait-goost-recaptcha';
const CAPTCHA_RESPONSE = '[name="g-recaptcha-response"]';
const RECAPTCHA_IFRAMES = [
  'iframe[src*="google.com/recaptcha"]',
  'iframe[src*="recaptcha.net"]',
  'iframe[src*="api2/bframe"]',
  'iframe[src*="enterprise/bframe"]',
] as const;
const STATISTICS_HREF_RE = /https?:\/\/(?:www\.)?goo\.st\/links\/statistics\/([A-Za-z0-9]+)/i;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

const CAPTCHA_NOTE = {
  lead: 'Confirm you’re human.',
  detail: 'Tap the checkbox below. We’ll continue automatically when it’s done.',
} as const;

let ui: FullPageOverlay | null = null;
let captchaStarted = false;
let stage2Started = false;

const boot = (): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BOOT_STYLE_ID;
  style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head || document.documentElement).appendChild(style);
};

const mountUi = (
  note: typeof NOTE | typeof CAPTCHA_NOTE = NOTE,
  status = 'Getting things ready…',
): FullPageOverlay => {
  boot();
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

const prepGate = (root: ParentNode): void => {
  (window as unknown as { adblockstatus?: boolean; blurred?: boolean }).adblockstatus = false;
  (window as unknown as { blurred?: boolean }).blurred = false;
  document.getElementById('alertalert')?.remove();
  for (const el of root.querySelectorAll<HTMLElement>('[onclick]')) {
    if (/window\.open|tierande/i.test(el.getAttribute('onclick') || '')) {
      el.removeAttribute('onclick');
      el.onclick = null;
    }
  }
  for (const el of root.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>('button, a.get-link')) {
    el.removeAttribute('disabled');
    if (el instanceof HTMLButtonElement) el.disabled = false;
  }
};

const captchaForm = (root: HTMLElement): HTMLFormElement | null => {
  const form = root.querySelector('form');
  if (!form?.querySelector('.g-recaptcha')) return null;
  const alias = form.querySelector<HTMLInputElement>('input[name="alias"]')?.value.trim() ?? '';
  return GOOST_ALIAS_RE.test(alias) ? form : null;
};

const statisticsUrl = (root: HTMLElement): string | null => {
  if (root.querySelector('form .g-recaptcha, form input[name="alias"]')) return null;
  const m = document.documentElement.innerHTML.match(STATISTICS_HREF_RE);
  return m?.[0] && GOOST_ALIAS_RE.test(m[1]!) ? m[0] : null;
};

const hasCaptchaToken = (form: HTMLFormElement): boolean => {
  const v = form.querySelector<HTMLTextAreaElement>(CAPTCHA_RESPONSE)?.value.trim() ?? '';
  return v.length > 20;
};

const runStage2 = (root: HTMLElement): boolean => {
  if (stage2Started) return true;
  const dest = statisticsUrl(root);
  if (!dest) return false;
  stage2Started = true;
  prepGate(root);
  location.replace(dest);
  return true;
};

const runCaptcha = (root: HTMLElement): boolean => {
  if (captchaStarted) return true;
  const form = captchaForm(root);
  if (!form) return false;
  captchaStarted = true;
  prepGate(form);
  const overlay = mountUi(CAPTCHA_NOTE, 'Waiting for captcha…');
  const box = form.querySelector<HTMLElement>('.g-recaptcha')!;
  if (!box.id) box.id = WIDGET_ID;

  let stopPin: (() => void) | null = null;
  let done = false;
  let raf = 0;

  const pin = (): void => {
    if (done || stopPin) return;
    if (!document.getElementById(WIDGET_ID)) return;
    stopPin = pinSiteWidgetOverOverlay({
      overlayId: OVERLAY_ID,
      mount: overlay.turnstileMount,
      widgetId: WIDGET_ID,
      styleId: PIN_STYLE_ID,
      alsoVisibleSelectors: RECAPTCHA_IFRAMES,
    });
  };

  const finish = (): void => {
    if (done) return;
    done = true;
    cancelAnimationFrame(raf);
    stopPin?.();
    stopPin = null;
    overlay.setNote(NOTE);
    overlay.setStatus('Continuing…');
    prepGate(form);
    form.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
  };

  const tickCaptcha = (): void => {
    if (done) return;
    if (!document.contains(form)) {
      done = true;
      cancelAnimationFrame(raf);
      stopPin?.();
      return;
    }
    pin();
    if (hasCaptchaToken(form)) {
      finish();
      return;
    }
    raf = requestAnimationFrame(tickCaptcha);
  };

  raf = requestAnimationFrame(tickCaptcha);
  return true;
};

const tick = (): void => {
  const root = document.getElementById('secretsecret');
  if (!root) return;
  if (runStage2(root)) return;
  runCaptcha(root);
};

export function initGoostMediator(): void {
  if (window !== window.top) return;
  void canBypass('goost-mediator').then((ok) => {
    if (!ok) return;
    tick();
    const mo = new MutationObserver(tick);
    mo.observe(document.documentElement, { childList: true, subtree: true });
  });
}
