import { recordBypassSuccess } from '../../free-bypass';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { pinSiteWidgetOverOverlay } from '../../injected-ui/pin-site-widget';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { MSG_WORKINK_HOOKS, WORKINK_MSG_SOURCE, isWorkinkGateUrl } from './hosts';

const OVERLAY_ID = 'skip-wait-workink-overlay';
const BOOT_ID = 'skip-wait-workink-boot';
const GATE_ID = 'skip-wait-workink-gate';
const PIN_ID = 'skip-wait-workink-pin';
const TURNSTILE_ID = 'skip-wait-workink-turnstile';
const HOST_IDS = ['wk-hcaptcha-container', 'wk-hcaptcha-overlay'] as const;

const VISIBLE = [
  '#wk-hcaptcha-container',
  '#wk-hcaptcha-overlay',
  '.cf-turnstile',
  'iframe[src*="hcaptcha.com"]',
  'iframe[src*="newassets.hcaptcha.com"]',
  'iframe[src*="challenges.cloudflare.com"]',
  'iframe[src*="turnstile"]',
] as const;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "Skip Wait is working. You don't need to tap anything.",
} as const;

const WAIT_NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: 'Captcha can take a few seconds to load. Stay on this page.',
} as const;

const CAPTCHA_NOTE = {
  lead: 'Confirm you’re human.',
  detail: 'Complete the check below. We’ll continue automatically when it’s done.',
} as const;

const WAIT_LINES = ['Getting ready', 'Preparing verification', 'Loading captcha', 'Waiting for challenge'] as const;

let ui: FullPageOverlay | null = null;
let stopPin: (() => void) | null = null;
let pinnedEl: HTMLElement | null = null;
let passed = false;
let unlocked = false;
let pulseTimer = 0;
let pulseLine = 0;
let pulseDots = 0;

const requestHooks = (): void => {
  chrome.runtime.sendMessage({ type: MSG_WORKINK_HOOKS }).catch(() => {});
};

const mount = (
  status: string,
  note: typeof NOTE | typeof WAIT_NOTE | typeof CAPTCHA_NOTE = NOTE,
): FullPageOverlay => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (!document.getElementById(BOOT_ID)) {
    const style = document.createElement('style');
    style.id = BOOT_ID;
    style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
    (document.head || document.documentElement).appendChild(style);
  }
  if (!document.getElementById(GATE_ID)) {
    const style = document.createElement('style');
    style.id = GATE_ID;
    style.textContent =
      VISIBLE.map(
        (sel) =>
          `html.${active} ${sel},html.${active} ${sel} *{visibility:visible!important;pointer-events:auto!important;opacity:1!important}`,
      ).join('') +
      `html.${active} iframe[src*="hcaptcha.com"],html.${active} iframe[src*="newassets.hcaptcha.com"],html.${active} iframe[src*="challenges.cloudflare.com"]{z-index:2147483647!important}`;
    (document.head || document.documentElement).appendChild(style);
  }
  if (ui) {
    ui.setStatus(status);
    ui.setNote(note);
    return ui;
  }
  ui = createFullPageOverlay({ id: OVERLAY_ID, brand: 'Skip Wait', note, status });
  return ui;
};

const stopPulse = (): void => {
  if (!pulseTimer) return;
  window.clearInterval(pulseTimer);
  pulseTimer = 0;
};

const startPulse = (): void => {
  if (pulseTimer || unlocked || passed || stopPin) return;
  mount(`${WAIT_LINES[0]}.`, WAIT_NOTE);
  pulseTimer = window.setInterval(() => {
    if (unlocked || passed || stopPin) {
      stopPulse();
      return;
    }
    pulseDots = (pulseDots + 1) % 3;
    if (pulseDots === 0 && pulseLine < WAIT_LINES.length - 1) pulseLine += 1;
    mount(`${WAIT_LINES[pulseLine]}${'.'.repeat(pulseDots + 1)}`, WAIT_NOTE);
  }, 450);
};

const liveWidget = (): HTMLElement | null => {
  for (const id of HOST_IDS) {
    const el = document.getElementById(id);
    if (el?.querySelector('iframe')) return el;
  }
  for (const el of document.querySelectorAll<HTMLElement>('.cf-turnstile')) {
    if (el.querySelector('iframe')) return el;
  }
  return null;
};

const syncPin = (): void => {
  if (unlocked || passed) return;
  const widget = liveWidget();
  if (!widget) {
    startPulse();
    return;
  }
  if (widget === pinnedEl && document.getElementById(widget.id)) return;

  const overlay = mount('Complete the captcha below.', CAPTCHA_NOTE);
  if (!widget.id) widget.id = TURNSTILE_ID;
  stopPin?.();
  stopPulse();
  pinnedEl = widget;
  stopPin = pinSiteWidgetOverOverlay({
    overlayId: OVERLAY_ID,
    mount: overlay.turnstileMount,
    widgetId: widget.id,
    styleId: PIN_ID,
    alsoVisibleSelectors: VISIBLE,
  });
};

export function initWorkinkGate(): void {
  if (window !== window.top) return;
  void isWorkinkGateUrl(location.href).then((ok) => {
    if (!ok) return;

    requestHooks();
    startPulse();
    syncPin();

    window.addEventListener('message', (ev) => {
      if (ev.origin !== location.origin || ev.data?.source !== WORKINK_MSG_SOURCE || unlocked) return;
      switch (ev.data?.type) {
        case 'gate-start':
          syncPin();
          break;
        case 'gate-done':
          if (ev.data.gate !== 's_hcok') break;
          passed = true;
          stopPulse();
          mount('Captcha verified…');
          break;
        case 'forged':
          mount('Unlocking your link…');
          break;
        case 'unlock':
          if (typeof ev.data.url !== 'string') break;
          unlocked = true;
          stopPulse();
          stopPin?.();
          stopPin = null;
          mount('Opening your link…');
          recordBypassSuccess();
          location.replace(ev.data.url);
          break;
      }
    });

    new MutationObserver(() => {
      if (unlocked || passed) return;
      syncPin();
    }).observe(document.documentElement, { childList: true, subtree: true });
  });
}
