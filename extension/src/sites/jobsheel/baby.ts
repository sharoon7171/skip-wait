import { isRemoteSite } from '../../hosts/check';
import { pinSiteWidgetOverOverlay } from '../../injected-ui/pin-site-widget';
import { overlayActiveClass } from '../../injected-ui/overlay-styles';
import { JOBSHEEL_HOME, jobsheelAliasFromCookie, jobsheelBabyAlias } from './hosts';
import { CAPTCHA_NOTE, createOverlay } from './overlay';

const OVERLAY_ID = 'skip-wait-jobsheel-baby';
const BOOT_STYLE_ID = 'skip-wait-jobsheel-baby-boot';
const PIN_STYLE_ID = 'skip-wait-jobsheel-baby-turnstile-pin';
const GATE_STYLE_ID = 'skip-wait-jobsheel-baby-gate';
const WIDGET_ID = 'skip-wait-jobsheel-turnstile';
const ANC_ATTR = 'data-sw-jobsheel-pin';
const TURNSTILE_IFRAMES = [
  'iframe[src*="challenges.cloudflare.com"]',
  'iframe[src*="turnstile"]',
] as const;

const mount = createOverlay(OVERLAY_ID, BOOT_STYLE_ID);
const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

function turnstileToken(): string | null {
  for (const el of document.querySelectorAll('[name="cf-turnstile-response"]')) {
    const v = (el as HTMLInputElement | HTMLTextAreaElement).value?.trim();
    if (v && v.length > 20) return v;
  }
  return null;
}

function disarmAutoSubmit(): () => void {
  const strip = (): void => {
    for (const el of document.querySelectorAll('.cf-turnstile[data-callback]')) {
      el.removeAttribute('data-callback');
    }
  };
  strip();
  const observer = new MutationObserver(strip);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-callback'],
    childList: true,
    subtree: true,
  });
  return () => observer.disconnect();
}

function clearPinAncestors(widget: HTMLElement): void {
  const active = overlayActiveClass(OVERLAY_ID);
  const sels: string[] = [];
  for (
    let el = widget.parentElement, i = 0;
    el && el !== document.body && el !== document.documentElement;
    el = el.parentElement, i++
  ) {
    el.setAttribute(ANC_ATTR, String(i));
    sels.push(`[${ANC_ATTR}="${i}"]`);
  }
  let style = document.getElementById(GATE_STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = GATE_STYLE_ID;
    (document.head ?? document.documentElement).appendChild(style);
  }
  style.textContent = sels
    .map((sel) => `html.${active} ${sel}{transform:none!important}`)
    .join('');
}

async function waitToken(): Promise<string> {
  const overlay = mount('Complete the captcha below.', CAPTCHA_NOTE);
  let stopPin: (() => void) | null = null;
  let pinAt = 0;
  const release = (): void => {
    stopPin?.();
    stopPin = null;
    document.getElementById(GATE_STYLE_ID)?.remove();
  };
  const pin = (): void => {
    const widget =
      document.querySelector<HTMLElement>('.captcha-wrap') ??
      document.querySelector<HTMLElement>('.cf-turnstile');
    if (!widget) return;
    if (!widget.id) widget.id = WIDGET_ID;
    clearPinAncestors(widget);
    if (stopPin && document.getElementById(widget.id)) return;
    stopPin?.();
    stopPin = pinSiteWidgetOverOverlay({
      overlayId: OVERLAY_ID,
      mount: overlay.turnstileMount,
      widgetId: widget.id,
      styleId: PIN_STYLE_ID,
      alsoVisibleSelectors: TURNSTILE_IFRAMES,
    });
    if (!pinAt) pinAt = Date.now();
  };

  for (;;) {
    pin();
    const token = turnstileToken();
    if (token && pinAt && Date.now() - pinAt >= 400) {
      release();
      return token;
    }
    await sleep(200);
  }
}

async function createSession(alias: string, token: string): Promise<void> {
  const form = document.querySelector('form');
  const action = new URL(form?.getAttribute('action') || location.href, location.href).href;
  const body = new URLSearchParams();
  if (form) {
    for (const el of form.elements) {
      if (!(el instanceof HTMLInputElement) && !(el instanceof HTMLTextAreaElement)) continue;
      if (!el.name || el.disabled) continue;
      body.set(el.name, el.value ?? '');
    }
  }
  body.set('links', alias);
  body.set('cf-turnstile-response', token);
  await fetch(action, {
    method: 'POST',
    body,
    credentials: 'include',
    redirect: 'manual',
    headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}

export function initJobsheelBaby(): void {
  if (window !== window.top) return;
  const alias = jobsheelBabyAlias(location.pathname, location.search);
  if (!alias) return;

  void isRemoteSite('jobsheel').then((ok) => {
    if (!ok) return;
    void (async () => {
    const releaseDisarm = disarmAutoSubmit();
    mount('Starting JobSheel…');
    document.querySelector('form')?.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
      },
      true,
    );

    const token = await waitToken();
    mount('Creating JobSheel session…');
    await createSession(alias, token);
    releaseDisarm();
    if (jobsheelAliasFromCookie() !== alias) {
      mount('JobSheel session was not created.').setError('Complete the captcha again.');
      return;
    }
    mount('Opening JobSheel…');
    location.replace(JOBSHEEL_HOME);
    })();
  });
}
