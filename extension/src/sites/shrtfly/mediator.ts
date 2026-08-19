import { isRemoteSite } from '../../hosts/check';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { pinSiteWidgetOverOverlay } from '../../injected-ui/pin-site-widget';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { whenDomParsed } from '../../utils/domain-check';
import { finishUnlock, formAction, postUnlock, unlockForm } from './api';

const OVERLAY_ID = 'skip-wait-shrtfly-mediator-overlay';
const BOOT_STYLE_ID = 'skip-wait-shrtfly-mediator-boot';
const PIN_STYLE_ID = 'skip-wait-shrtfly-mediator-turnstile-pin';
const WIDGET_ID = 'skip-wait-shrtfly-mediator-turnstile';
const TURNSTILE_IFRAMES = [
  'iframe[src*="challenges.cloudflare.com"]',
  'iframe[src*="turnstile"]',
] as const;

const MEDIATOR_ACTIONS = new Set(['captcha', 'progressbar', 'countdown']);

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

const CAPTCHA_NOTE = {
  lead: 'Confirm you’re human.',
  detail: 'Complete the Turnstile check below. We’ll continue automatically when it’s done.',
} as const;

let ui: FullPageOverlay | null = null;
let started = false;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const mountUi = (
  note: typeof NOTE | typeof CAPTCHA_NOTE = NOTE,
  status = 'Getting things ready…',
): FullPageOverlay => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (!document.getElementById(BOOT_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = BOOT_STYLE_ID;
    style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
    (document.head || document.documentElement).appendChild(style);
  }
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

const isMediatorPage = (hostOk: boolean): boolean => {
  const form = unlockForm();
  if (!form || !MEDIATOR_ACTIONS.has(formAction(form))) return false;
  if (!form.querySelector('input[name="payload"]')) return false;
  return hostOk || !!document.querySelector('a[href*="shrtfly.com/account/premium-access"]');
};

const revealGate = (): void => {
  for (const el of document.querySelectorAll<HTMLElement>('[id$="_start_area"]')) el.classList.add('hidden');
  for (const el of document.querySelectorAll<HTMLElement>('[id$="_area"]')) {
    if (el.id.includes('_start_') || el.id.endsWith('_final')) continue;
    el.classList.remove('hidden');
  }
};

const turnstileToken = (): string | null => {
  for (const el of document.querySelectorAll('[name="cf-turnstile-response"]')) {
    const v = (el as HTMLInputElement | HTMLTextAreaElement).value?.trim();
    if (v && v.length > 20) return v;
  }
  return null;
};

const waitTurnstile = async (overlay: FullPageOverlay): Promise<void> => {
  overlay.setNote(CAPTCHA_NOTE);
  overlay.setStatus('Waiting for captcha…');
  let stopPin: (() => void) | null = null;
  let pinnedAt = 0;
  const release = (): void => {
    stopPin?.();
    stopPin = null;
  };
  const pin = (): void => {
    const widget = document.querySelector<HTMLElement>('.cf-turnstile') ?? document.getElementById(WIDGET_ID);
    if (!widget) return;
    if (!widget.id) widget.id = WIDGET_ID;
    if (stopPin && document.getElementById(widget.id)) return;
    release();
    stopPin = pinSiteWidgetOverOverlay({
      overlayId: OVERLAY_ID,
      mount: overlay.turnstileMount,
      widgetId: widget.id,
      styleId: PIN_STYLE_ID,
      alsoVisibleSelectors: TURNSTILE_IFRAMES,
    });
    if (!pinnedAt) pinnedAt = Date.now();
    overlay.setStatus('Complete the captcha below.');
  };
  const end = Date.now() + 180_000;
  while (Date.now() < end) {
    pin();
    if (turnstileToken() && Date.now() - pinnedAt >= 400) {
      release();
      overlay.setNote(NOTE);
      return;
    }
    await sleep(200);
  }
  release();
  if (!turnstileToken()) throw new Error('turnstile');
  overlay.setNote(NOTE);
};

const pageLoadAt = (): number => {
  const w = window as unknown as Record<string, unknown>;
  for (const key of Object.keys(w)) {
    if (!key.startsWith('_page_load_time_')) continue;
    const value = w[key];
    if (typeof value === 'number') return value;
  }
  return performance.timeOrigin;
};

const timerSeconds = (action: string): number => {
  for (const s of document.scripts) {
    const t = s.textContent ?? '';
    const progress = /progress_original\s*=\s*(\d+)/.exec(t);
    if (action === 'progressbar' && progress) return Number(progress[1]);
    const total = /var total = (\d+);/.exec(t);
    if (action === 'countdown' && total) return Number(total[1]);
  }
  return 10;
};

const waitServerTimer = async (overlay: FullPageOverlay, action: string): Promise<void> => {
  const loadAt = pageLoadAt();
  const need = (timerSeconds(action) + 2) * 1000;
  overlay.setStatus('Waiting for unlock timer…');
  overlay.startCountdown(loadAt + need);
  while (Date.now() - loadAt < need) await sleep(100);
  overlay.hideCountdown();
};

const stampTimeSpent = (form: HTMLFormElement): void => {
  const input = form.querySelector<HTMLInputElement>('input[name="time_spent"]');
  if (!input) return;
  input.value = String(Math.max(0, Math.round((Date.now() - pageLoadAt()) / 1000)));
};

const unlock = async (): Promise<void> => {
  const form = unlockForm();
  if (!form) throw new Error('missing form');
  const action = formAction(form);
  if (!MEDIATOR_ACTIONS.has(action)) throw new Error('not mediator');

  const overlay = mountUi(NOTE, 'Unlocking your link…');
  revealGate();
  if (action === 'captcha') {
    if (!turnstileToken()) await waitTurnstile(overlay);
  } else {
    await waitServerTimer(overlay, action);
  }
  stampTimeSpent(form);
  overlay.setStatus('Unlocking…');
  const res = await postUnlock(form);
  if (res.status !== 'success' || !res.data || typeof res.data === 'string') {
    throw new Error(typeof res.data === 'string' ? res.data : 'unlock failed');
  }
  finishUnlock(overlay, res.data);
};

export function initShrtflyMediator(): void {
  if (window !== window.top) return;
  void isRemoteSite('shrtfly-mediator').then((hostOk) => {
    const mo = new MutationObserver(() => tick());
    const stop = (): void => {
      mo.disconnect();
      window.removeEventListener('load', tick, true);
    };
    const tick = (): void => {
      if (started || !isMediatorPage(hostOk)) return;
      started = true;
      stop();
      void unlock().catch((err: unknown) => {
        const overlay = mountUi();
        overlay.setStatus('Something went wrong.');
        overlay.setError(err instanceof Error ? err.message : String(err));
      });
    };
    whenDomParsed(tick);
    mo.observe(document.documentElement, { childList: true, subtree: true });
    window.addEventListener('load', tick, true);
  });
}
