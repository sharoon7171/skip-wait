import { linksGoFormFromHtml, postLinksGo, revealTimerLinks } from '../adlinkfly/unlock';
import { isRemoteSite } from '../../hosts/check';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { pinSiteWidgetOverOverlay } from '../../injected-ui/pin-site-widget';

const OVERLAY_ID = 'skip-wait-gplinks-links-go';
const BOOT_STYLE_ID = 'skip-wait-gplinks-links-go-boot';
const TURNSTILE_PIN_STYLE_ID = 'skip-wait-gplinks-turnstile-pin';
const TURNSTILE_WIDGET_ID = 'captchaLinksGo';
const LINKS_GO_SHELL_SEL = '#go-link,form[action*="/links/go"],a.get-link';
const TURNSTILE_RESPONSE = '[name="cf-turnstile-response"]';
const TURNSTILE_IFRAMES = [
  'iframe[src*="challenges.cloudflare.com"]',
  'iframe[src*="turnstile"]',
] as const;
const OLA_DRIVE_HOST = 'drive.olamovies.download';
const OLA_DRIVE_HOLD_MS = 5_000;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

const TURNSTILE_NOTE = {
  lead: 'Confirm you’re human.',
  detail: 'Complete the Turnstile check below. We’ll continue automatically when it’s done.',
} as const;

type TurnstilePhase = {
  started: boolean;
  done: boolean;
  stopPin: (() => void) | null;
};

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const isRealUrl = (s: string): boolean => s.startsWith('http://') || s.startsWith('https://');

const isOlaDriveDest = (url: string): boolean => {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host === OLA_DRIVE_HOST || host.endsWith(`.${OLA_DRIVE_HOST}`);
  } catch {
    return false;
  }
};

const isUnlockQuery = (): boolean => /[?&](?:pid|vid)=/.test(location.search);

const isLinksGoShell = (doc: Document = document): boolean => !!doc.querySelector(LINKS_GO_SHELL_SEL);

const hasLinksGoHint = (): boolean => {
  if (isUnlockQuery() || isLinksGoShell()) return true;
  for (const s of document.scripts) {
    if (s.textContent?.includes('/links/go') || s.textContent?.includes('counter_value')) return true;
  }
  return false;
};

const goLinkForm = (): HTMLFormElement | null =>
  document.querySelector<HTMLFormElement>('#go-link, form[action*="/links/go"]');

const needsTurnstile = (form: HTMLFormElement): boolean =>
  !!form.querySelector(`#${TURNSTILE_WIDGET_ID}, .cf-turnstile, ${TURNSTILE_RESPONSE}`);

const hasTurnstileToken = (form: HTMLFormElement): boolean => {
  for (const el of form.querySelectorAll(TURNSTILE_RESPONSE)) {
    const v = (el as HTMLInputElement | HTMLTextAreaElement).value?.trim();
    if (v && v.length > 20) return true;
  }
  return false;
};

const counterSec = (): number => {
  const html = document.documentElement.innerHTML;
  const m = html.match(/"counter_value"\s*:\s*"?(\d+)/);
  if (m?.[1]) return Math.max(0, parseInt(m[1], 10));
  const t = document.querySelector('#timer, #countdown, .timer, #counter');
  const n = parseInt(t?.textContent?.trim() ?? '', 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

const requestVisibilitySpoof = (): void => {
  chrome.runtime.sendMessage({ type: 'INJECT_VISIBILITY_SPOOF' }).catch(() => {});
};

let ui: FullPageOverlay | null = null;

const bootOverlayLock = (): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BOOT_STYLE_ID;
  style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head || document.documentElement).appendChild(style);
};

const mountUi = (
  note: typeof NOTE | typeof TURNSTILE_NOTE = NOTE,
  status = 'Getting things ready…',
): FullPageOverlay => {
  bootOverlayLock();
  if (ui) {
    ui.setNote(note);
    ui.setStatus(status);
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

const postFromPage = (): Promise<string | null> => {
  const form = linksGoFormFromHtml(document.documentElement.innerHTML, location.href);
  if (!form) return Promise.resolve(null);
  return postLinksGo(form, location.href);
};

const finishTimerUnlock = async (overlay: FullPageOverlay): Promise<string | null> => {
  const sec = counterSec();
  if (sec > 0) {
    requestVisibilitySpoof();
    overlay.setStatus('Waiting for timer…');
    overlay.startCountdown(Date.now() + sec * 1000);
    await sleep(sec * 1000);
    overlay.hideCountdown();
  }

  revealTimerLinks();
  const pollEnd = Date.now() + 2500;
  while (Date.now() < pollEnd) {
    const link = document.querySelector<HTMLAnchorElement>('a.get-link');
    if (link?.href && isRealUrl(link.href)) return link.href;
    await sleep(250);
  }

  return postFromPage();
};

const redirectTo = async (url: string): Promise<void> => {
  const overlay = mountUi();
  if (isOlaDriveDest(url)) {
    overlay.setStatus('Opening soon…');
    overlay.startCountdown(Date.now() + OLA_DRIVE_HOLD_MS);
    await sleep(OLA_DRIVE_HOLD_MS);
    overlay.hideCountdown();
  }
  overlay.setStatus('Redirecting now…');
  location.assign(url);
};

const exitTurnstilePhase = (phase: TurnstilePhase): void => {
  phase.stopPin?.();
  phase.stopPin = null;
  phase.done = true;
};

const runTurnstilePhase = (form: HTMLFormElement, phase: TurnstilePhase): void => {
  if (phase.started || phase.done) return;
  phase.started = true;
  const overlay = mountUi(TURNSTILE_NOTE, 'Waiting for Turnstile…');

  const ensurePin = (): void => {
    if (phase.done || phase.stopPin) return;
    if (!document.getElementById(TURNSTILE_WIDGET_ID)) return;
    phase.stopPin = pinSiteWidgetOverOverlay({
      overlayId: OVERLAY_ID,
      mount: overlay.turnstileMount,
      widgetId: TURNSTILE_WIDGET_ID,
      styleId: TURNSTILE_PIN_STYLE_ID,
      alsoVisibleSelectors: TURNSTILE_IFRAMES,
    });
  };

  ensurePin();

  const tick = (): void => {
    if (phase.done) return;
    if (!document.contains(form)) {
      exitTurnstilePhase(phase);
      return;
    }
    ensurePin();
    if (!hasTurnstileToken(form)) {
      requestAnimationFrame(tick);
      return;
    }
    exitTurnstilePhase(phase);
    mountUi(NOTE, 'Getting things ready…');
  };
  requestAnimationFrame(tick);
};

const runTimerPhase = async (state: { done: boolean; inFlight: boolean }): Promise<boolean> => {
  if (state.done || state.inFlight) return state.done;

  const form = goLinkForm();
  if (!form) return false;
  if (needsTurnstile(form) && !hasTurnstileToken(form)) return false;

  state.inFlight = true;
  try {
    const overlay = mountUi(NOTE, 'Getting things ready…');
    const url = await finishTimerUnlock(overlay);
    state.done = true;
    if (url) {
      await redirectTo(url);
      return true;
    }
    overlay.setStatus('Opening destination…');
    form.submit();
    return true;
  } finally {
    state.inFlight = false;
  }
};

const startGplinksLinksGo = (): void => {
  requestVisibilitySpoof();
  mountUi(NOTE, 'Getting things ready…');
  const turnstilePhase: TurnstilePhase = { started: false, done: false, stopPin: null };
  const timerState = { done: false, inFlight: false };
  let finished = false;

  const run = (): void => {
    if (finished) return;
    const form = goLinkForm();
    if (form && needsTurnstile(form) && !hasTurnstileToken(form)) {
      runTurnstilePhase(form, turnstilePhase);
      return;
    }
    void runTimerPhase(timerState).then((ok) => {
      if (ok) finished = true;
    });
  };

  const observer = new MutationObserver(run);
  run();
  observer.observe(document.documentElement, {
    attributeFilter: ['href', 'value'],
    attributes: true,
    childList: true,
    subtree: true,
  });

  let micro = 0;
  const microBurst = (): void => {
    if (finished) return;
    run();
    if (++micro < 48) queueMicrotask(microBurst);
  };
  queueMicrotask(microBurst);

  let frames = 0;
  const rafLoop = (): void => {
    if (finished) return;
    run();
    if (++frames < 960) requestAnimationFrame(rafLoop);
  };
  requestAnimationFrame(rafLoop);
};

const runWhenNotLoading = (run: () => void): void => {
  if (document.readyState !== 'loading') {
    run();
    return;
  }
  const onReady = (): void => {
    if (document.readyState === 'loading') return;
    document.removeEventListener('readystatechange', onReady);
    run();
  };
  document.addEventListener('readystatechange', onReady);
};

export function initGplinksLinksGo(): void {
  void isRemoteSite('gplinks').then((ok) => {
    if (!ok) return;
    if (hasLinksGoHint()) {
      requestVisibilitySpoof();
      bootOverlayLock();
    }

    let engaged = false;
    const tryStart = (): void => {
      if (engaged || !isLinksGoShell()) return;
      engaged = true;
      startGplinksLinksGo();
    };

    tryStart();
    if (engaged) return;
    if (document.readyState === 'complete') return;
    if (document.readyState === 'interactive' && !hasLinksGoHint()) return;

    const root = document.documentElement;
    if (!root) return void runWhenNotLoading(tryStart);

    let mo: MutationObserver | null = null;
    const stop = (): void => {
      mo?.disconnect();
      mo = null;
      document.removeEventListener('readystatechange', onReadyState);
    };
    const onReadyState = (): void => {
      if (document.readyState === 'loading') return;
      tryStart();
      if (engaged) return stop();
      if (document.readyState === 'interactive' && !hasLinksGoHint()) stop();
      else if (document.readyState === 'complete') stop();
    };

    mo = new MutationObserver(() => {
      tryStart();
      if (engaged) stop();
    });
    mo.observe(root, { childList: true, subtree: true });
    document.addEventListener('readystatechange', onReadyState);
    onReadyState();
  });
}
