import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { pinSiteWidgetOverOverlay } from '../../injected-ui/pin-site-widget';
import { ALIAS_RE, MSG_RESET_CAPTCHA, SITE } from './hosts';

const OVERLAY_ID = 'skip-wait-cpmlink-net-gate';
const BOOT_STYLE_ID = 'skip-wait-cpmlink-net-gate-boot';
const PIN_STYLE_ID = 'skip-wait-cpmlink-net-captcha-pin';
const BFRAME_STYLE_ID = 'skip-wait-cpmlink-net-bframe';
const WIDGET_ID = 'captcha';
const OVERLAY_Z = 2147483646;
const CHALLENGE_Z = 2147483647;
const ANCHOR_FRAMES = ['iframe[src*="api2/anchor"]', 'iframe[title="reCAPTCHA"]'] as const;

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
let goStarted = false;

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
  ui = createFullPageOverlay({ id: OVERLAY_ID, brand: 'Skip Wait', note, status });
  return ui;
};

const isGatePath = (): boolean => {
  const parts = location.pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (parts.length === 1) return ALIAS_RE.test(parts[0]!);
  return parts.length === 2 && parts[0]!.toLowerCase() === 'go' && ALIAS_RE.test(parts[1]!);
};

const captchaForm = (): HTMLFormElement | null => {
  const form = document.querySelector<HTMLFormElement>('form#skip');
  if (!form?.querySelector('#captcha, .g-recaptcha')) return null;
  return (form.getAttribute('action') || '').toLowerCase().includes('/go/') ? form : null;
};

const destinationHref = (): string | null => {
  const href = document.querySelector<HTMLAnchorElement>('#btn-main[href]')?.href.trim() ?? '';
  if (!/^https?:\/\//i.test(href)) return null;
  try {
    const url = new URL(href);
    return url.hostname === location.hostname ? null : url.href;
  } catch {
    return null;
  }
};

const captchaTokenReady = (form: HTMLFormElement): boolean => {
  const el = form.querySelector<HTMLInputElement | HTMLTextAreaElement>('[name="g-recaptcha-response"]');
  return (el?.value.trim().length ?? 0) > 20;
};

const prepareCaptchaWidget = (form: HTMLFormElement): HTMLElement | null => {
  const box = form.querySelector<HTMLElement>('#captcha, .g-recaptcha');
  if (!box) return null;
  if (!box.id) box.id = WIDGET_ID;
  if (form.closest('#continue')) (document.body || document.documentElement).appendChild(form);
  document.getElementById('disable')?.remove();
  return box;
};

const fillViewportFields = (form: HTMLFormElement): void => {
  const width = form.querySelector<HTMLInputElement>('input[name="s_width"]');
  const height = form.querySelector<HTMLInputElement>('input[name="s_height"]');
  if (width && !width.value) width.value = String(window.innerWidth || 1920);
  if (height && !height.value) height.value = String(window.innerHeight || 1080);
};

const bframeOpen = (): boolean => {
  const iframe = document.querySelector('body > div > div > iframe[src*="api2/bframe"]');
  const shell = iframe?.parentElement?.parentElement;
  return (
    shell instanceof HTMLElement &&
    shell.parentElement === document.body &&
    shell.style.visibility === 'visible' &&
    shell.style.opacity === '1'
  );
};

const syncBframeLayer = (open: boolean): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  let style = document.getElementById(BFRAME_STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = BFRAME_STYLE_ID;
    document.documentElement.appendChild(style);
  }
  if (!open) {
    style.textContent = '';
    return;
  }
  const popup = `html.${active} body>div:has(>div>iframe[src*="api2/bframe"])`;
  style.textContent =
    `html.${active} #${OVERLAY_ID},html.${active} #${OVERLAY_ID} *{visibility:visible!important}` +
    `html.${active} #${OVERLAY_ID}{z-index:${OVERLAY_Z}!important}` +
    `html.${active} #${WIDGET_ID}{z-index:${OVERLAY_Z}!important;pointer-events:none!important}` +
    `html.${active} #${WIDGET_ID} *{pointer-events:none!important}` +
    `${popup}{z-index:${CHALLENGE_Z}!important;visibility:visible!important;pointer-events:auto!important}` +
    `${popup}>div[style*="position: fixed"]{pointer-events:none!important}` +
    `${popup}>div[style*="position: relative"]{z-index:${CHALLENGE_Z}!important;pointer-events:auto!important;visibility:visible!important}` +
    `${popup} iframe[src*="api2/bframe"]{visibility:visible!important;pointer-events:auto!important;position:relative!important;z-index:${CHALLENGE_Z}!important}` +
    `html.${active} grammarly-extension,html.${active} grammarly-desktop-integration,` +
    `html.${active} [data-grammarly-shadow-root],html.${active} #grammarly-desktop-integration{pointer-events:none!important;visibility:hidden!important}`;
};

const runGo = (): boolean => {
  if (goStarted) return true;
  const dest = destinationHref();
  if (!dest) return false;
  goStarted = true;
  mountUi(NOTE, 'Opening your link…');
  location.replace(dest);
  return true;
};

const runCaptcha = (): boolean => {
  if (captchaStarted) return true;
  const form = captchaForm();
  if (!form) return false;
  const box = prepareCaptchaWidget(form);
  if (!box) return false;
  captchaStarted = true;

  const overlay = mountUi(CAPTCHA_NOTE, 'Waiting for captcha…');
  let stopPin: (() => void) | null = null;
  let done = false;
  let raf = 0;
  let hadBframe = false;

  const stop = (): void => {
    done = true;
    cancelAnimationFrame(raf);
    stopPin?.();
    stopPin = null;
    document.getElementById(BFRAME_STYLE_ID)?.remove();
  };

  const pinWidget = (): void => {
    if (done || stopPin || !document.getElementById(box.id)) return;
    stopPin = pinSiteWidgetOverOverlay({
      overlayId: OVERLAY_ID,
      mount: overlay.turnstileMount,
      widgetId: box.id,
      styleId: PIN_STYLE_ID,
      alsoVisibleSelectors: ANCHOR_FRAMES,
    });
    overlay.setStatus('Complete the captcha below.');
  };

  const submit = (): void => {
    if (done) return;
    stop();
    overlay.setNote(NOTE);
    overlay.setStatus('Continuing…');
    fillViewportFields(form);
    HTMLFormElement.prototype.submit.call(form);
  };

  const tickCaptcha = (): void => {
    if (done) return;
    if (!document.contains(form) || !document.contains(box)) {
      stop();
      captchaStarted = false;
      return;
    }

    pinWidget();
    const open = bframeOpen();
    syncBframeLayer(open);

    if (open) {
      hadBframe = true;
      overlay.setStatus('Solve the image challenge.');
    } else if (hadBframe && !captchaTokenReady(form)) {
      hadBframe = false;
      chrome.runtime.sendMessage({ type: MSG_RESET_CAPTCHA }).catch(() => {});
      overlay.setStatus('Complete the captcha below.');
    }

    if (captchaTokenReady(form)) {
      submit();
      return;
    }
    raf = requestAnimationFrame(tickCaptcha);
  };

  raf = requestAnimationFrame(tickCaptcha);
  return true;
};

const tick = (): void => {
  if (runGo()) return;
  runCaptcha();
};

export function initCpmlinkNetGate(): void {
  if (window !== window.top || !isGatePath()) return;
  void canBypass(SITE).then((ok) => {
    if (!ok) return;
    tick();
    new MutationObserver(tick).observe(document.documentElement, { childList: true, subtree: true });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tick, true);
    window.addEventListener('load', tick, true);
  });
}
