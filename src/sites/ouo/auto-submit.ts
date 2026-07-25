import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { OUO_HOSTS } from './hosts';

const OVERLAY_ID = 'skip-wait-ouo-overlay';
const BOOT_STYLE_ID = 'skip-wait-ouo-boot';
const FORM = '#form-captcha';
const TURNSTILE = '[name="cf-turnstile-response"]';

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;
let done = false;

const bootOverlayLock = (): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BOOT_STYLE_ID;
  style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head || document.documentElement).appendChild(style);
};

const mountUi = (status: string): FullPageOverlay => {
  bootOverlayLock();
  if (ui) {
    ui.setStatus(status);
    ui.setError(null);
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

function captchaForm(): HTMLFormElement | null {
  const form = document.querySelector<HTMLFormElement>(FORM);
  if (!form) return null;
  const action = form.getAttribute('action') || form.action || '';
  if (!/\/(?:go|x)\//i.test(action)) return null;
  return form;
}

function turnstileReady(form: HTMLFormElement): boolean {
  const el = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(TURNSTILE);
  if (!el) return true;
  const v = el.value?.trim() ?? '';
  return v.length > 20;
}

const requestVisibilitySpoof = (): void => {
  try { chrome.runtime.sendMessage({ type: 'INJECT_VISIBILITY_SPOOF' }); } catch {}
};

/** Find a "Get Link" / "Continue" button on the /go/ page and click it */
function clickGetLinkButton(): HTMLElement | null {
  // Try common button/link text patterns
  const textPatterns = ['get link', 'continue', 'proceed', 'click here', 'redirect', 'download'];

  // 1. Look for buttons/anchors by text content (skip disabled)
  for (const el of document.querySelectorAll<HTMLElement>('a, button, input[type="submit"], input[type="button"]')) {
    if ((el as HTMLButtonElement).disabled) continue;
    const text = (el.textContent ?? '').trim().toLowerCase();
    if (textPatterns.some((p) => text.includes(p))) {
      el.click();
      return el;
    }
  }

  // 2. Look for elements by common IDs
  const ids = ['btn-main', 'get-link', 'getlink', 'redirect-link', 'continue', 'go-link', 'submit-btn', 'download-btn'];
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el && !(el as HTMLButtonElement).disabled && 'click' in HTMLElement.prototype) {
      (el as HTMLElement).click();
      return el;
    }
  }

  // 3. Look for elements with data attributes
  const sel = [
    '[data-get-link]', '[data-redirect]', '[data-url]',
    '.get-link', '.btn-get-link', '.download-link',
  ].join(',');
  const el = document.querySelector<HTMLElement>(sel);
  if (el && !(el as HTMLButtonElement).disabled) {
    el.click();
    return el;
  }

  return null;
}

/**
 * On /go/ page: find the actual destination via JS redirect, meta refresh,
 * or by clicking the "Get Link" button.
 */
function handleGoPage(): string | null {
  // 1. window.location.href redirect in inline script
  for (const script of document.scripts) {
    const text = script.textContent ?? '';
    const m = text.match(/window\.location\.href\s*=\s*"([^"]+)"/);
    if (m?.[1] && (m[1].startsWith('http://') || m[1].startsWith('https://'))) return m[1];
  }

  // 2. Meta refresh
  const meta = document.querySelector<HTMLMetaElement>('meta[http-equiv="refresh"]');
  if (meta) {
    const m = (meta.getAttribute('content') ?? '').match(/url=\s*([^\s;]+)/i);
    if (m?.[1] && (m[1].startsWith('http://') || m[1].startsWith('https://'))) return m[1];
  }

  // 3. Click "Get Link" / "Continue" button
  const btn = clickGetLinkButton();
  if (btn) {
    done = true; // button clicked, let browser follow the resulting redirect
    return '';
  }

  return null;
}

export function initOuoBypass(): void {
  if (!isAllowedHost(OUO_HOSTS)) return;

  // ── /go/ redirect page ──
  if (/^\/go\//.test(location.pathname)) {
    requestVisibilitySpoof(); // keep countdown running
    const url = handleGoPage();
    if (url === '' || done) return; // button was clicked, browser handling it
    if (url) {
      done = true;
      location.replace(url);
      return;
    }
    // Keep trying for a bit (page might load dynamically)
    let tries = 0;
    const id = window.setInterval(() => {
      tries++;
      const u = handleGoPage();
      if (done || u !== null) {
        window.clearInterval(id);
        return;
      }
      if (tries >= 30) window.clearInterval(id);
    }, 200);
    return;
  }

  // ── Standard captcha page ──
  requestVisibilitySpoof();
  whenDomParsed(() => {
    const form = captchaForm();
    if (!form) return;

    const overlay = mountUi('Waiting for verification…');

    const check = (): void => {
      if (done || !document.contains(form)) return;
      if (!turnstileReady(form)) {
        window.setTimeout(check, 150);
        return;
      }
      done = true;
      overlay.setStatus('Continuing…');
      form.submit();
    };
    check();
  });
}
