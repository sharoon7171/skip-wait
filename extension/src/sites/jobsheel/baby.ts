import { pinSiteWidgetOverOverlay } from '../../injected-ui/pin-site-widget';
import { overlayActiveClass } from '../../injected-ui/overlay-styles';
import { isAllowedHost } from '../../utils/domain-check';
import { jobsheelBabyAlias, writeJobsheelChain } from './chain';
import { JOBSHEEL_HOME, JOBSHEEL_HOSTS } from './hosts';
import {
  createJobsheelOverlay,
  JOBSHEEL_CAPTCHA_NOTE,
  JOBSHEEL_NOTE,
} from './overlay';

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

const mount = createJobsheelOverlay(OVERLAY_ID, BOOT_STYLE_ID);
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
  return (): void => observer.disconnect();
}

function pinHost(): HTMLElement | null {
  return (
    document.querySelector<HTMLElement>('.captcha-wrap') ??
    document.querySelector<HTMLElement>('.cf-turnstile')
  );
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
  style.textContent =
    sels
      .map(
        (sel) =>
          `html.${active} ${sel}{transform:none!important;filter:none!important;perspective:none!important;contain:none!important;overflow:visible!important;opacity:1!important}`,
      )
      .join('') +
    TURNSTILE_IFRAMES.map(
      (sel) =>
        `html.${active} ${sel},html.${active} ${sel} *{display:block!important;visibility:visible!important;pointer-events:auto!important;opacity:1!important;z-index:2147483647!important}`,
    ).join('');
}

async function waitToken(): Promise<string> {
  const overlay = mount('Complete the captcha below.', JOBSHEEL_CAPTCHA_NOTE);
  let stopPin: (() => void) | null = null;
  let pinnedFor = '';
  let pinAt = 0;
  const release = (): void => {
    stopPin?.();
    stopPin = null;
    pinnedFor = '';
    document.getElementById(GATE_STYLE_ID)?.remove();
  };
  const pin = (): void => {
    const widget = pinHost();
    if (!widget) return;
    if (!widget.id) widget.id = WIDGET_ID;
    clearPinAncestors(widget);
    if (stopPin && pinnedFor === widget.id && document.getElementById(widget.id)) return;
    stopPin?.();
    pinnedFor = widget.id;
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

function hasTp1(alias: string): boolean {
  return document.cookie.split(';').some((part) => {
    const [name, ...rest] = part.trim().split('=');
    return name === 'tp1' && rest.join('=') === alias;
  });
}

export function initJobsheelBaby(): void {
  if (window !== window.top) return;
  if (!isAllowedHost(JOBSHEEL_HOSTS)) return;
  const alias = jobsheelBabyAlias(location.pathname, location.search);
  if (!alias) return;

  void (async (): Promise<void> => {
    const releaseDisarm = disarmAutoSubmit();
    mount('Starting JobSheel…', JOBSHEEL_NOTE);
    document.querySelector('form')?.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
      },
      true,
    );

    const token = await waitToken();
    mount('Creating JobSheel session…', JOBSHEEL_NOTE);
    await createSession(alias, token);
    releaseDisarm();
    if (!hasTp1(alias)) {
      mount('JobSheel session was not created.', JOBSHEEL_NOTE).setError(
        'Complete the captcha again.',
      );
      return;
    }
    await writeJobsheelChain(alias, location.origin);
    mount('Opening JobSheel…', JOBSHEEL_NOTE);
    location.replace(JOBSHEEL_HOME);
  })();
}
