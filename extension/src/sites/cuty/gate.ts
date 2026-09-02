import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { pinSiteWidgetOverOverlay } from '../../injected-ui/pin-site-widget';
import { overlayActiveClass, buildFullPageOverlayCss } from '../../injected-ui/overlay-styles';
import { type CutyUnlockResult, MSG_CUTY_GO_UNLOCK } from './hosts';
import { countdownSecFromHtml, cutyAliasFromPath, destinationFromQuickSearch, isCutyQuickPath } from './unlock';

const OVERLAY_ID = 'skip-wait-cuty-overlay';
const BOOT_STYLE_ID = 'skip-wait-cuty-boot';
const CAPTCHA_PIN_STYLE_ID = 'skip-wait-cuty-captcha-pin';
const TURNSTILE_WIDGET_ID = 'turnstile-container';
const TURNSTILE_RESPONSE = '[name="cf-turnstile-response"]';
const TURNSTILE_IFRAMES = [
  'iframe[src*="challenges.cloudflare.com"]',
  'iframe[src*="turnstile"]',
] as const;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

const CAPTCHA_NOTE = {
  lead: 'Confirm you’re human.',
  detail: 'Complete the Turnstile check below. We’ll continue automatically when it’s done.',
} as const;

const ADBLOCK_ERROR =
  'cuty blocked this visit because it detected your adblocker. Pause it for this site, then reload.';

type PinPhase = { stopPin: (() => void) | null };

let ui: FullPageOverlay | null = null;
let started = false;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const requestVisibilitySpoof = (): void => {
  chrome.runtime.sendMessage({ type: 'INJECT_VISIBILITY_SPOOF' }).catch(() => {});
};

const requestGoUnlock = (): Promise<CutyUnlockResult> =>
  new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: MSG_CUTY_GO_UNLOCK }, (res) => {
      if (chrome.runtime.lastError) {
        resolve({ ok: false, err: chrome.runtime.lastError.message ?? 'runtime error' });
        return;
      }
      const out = res as CutyUnlockResult | undefined;
      resolve(out?.ok ? { ok: true } : { ok: false, err: out?.err ?? 'no response' });
    });
  });

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
  note: typeof NOTE | typeof CAPTCHA_NOTE = NOTE,
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
    countdownLabel: 'Continue in',
  });
  return ui;
};

const waitFor = async <T>(
  pick: () => T | null | undefined | false,
  timeoutMs: number,
  everyMs = 100,
): Promise<T | null> => {
  const end = Date.now() + timeoutMs;
  while (Date.now() < end) {
    const v = pick();
    if (v) return v;
    await sleep(everyMs);
  }
  return pick() || null;
};

const freeForm = (): HTMLFormElement | null =>
  document.querySelector<HTMLFormElement>('#free-submit-form');

const gateRef = (): string | null =>
  document.querySelector<HTMLElement>('[data-ref]')?.getAttribute('data-ref') ?? null;

const goForm = (): HTMLFormElement | null => {
  const form = document.querySelector<HTMLFormElement>('#submit-form');
  return form?.querySelector('[name="data"]') && form.querySelector('[name="_token"]') ? form : null;
};

const isCaptchaStep = (form: HTMLFormElement): boolean =>
  !!form.querySelector(
    `[data-ref="captcha"], #${TURNSTILE_WIDGET_ID}, .cf-turnstile, ${TURNSTILE_RESPONSE}`,
  );

const isAdblockGate = (): boolean => !!document.querySelector('button.ab');

const isGatePage = (): boolean => {
  if (goForm() || isAdblockGate()) return true;
  const form = freeForm();
  return !!form && (gateRef() === 'first' || isCaptchaStep(form));
};

const turnstileToken = (root: ParentNode = document): string | null => {
  for (const sel of [
    TURNSTILE_RESPONSE,
    'input[id^="cf-chl-widget"][id$="_response"]',
  ]) {
    for (const el of root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(sel)) {
      const v = el.value.trim();
      if (v && v.length > 20) return v;
    }
  }
  return null;
};

const lastStep = (): { sec: number } | null => {
  const html = document.documentElement.innerHTML;
  return goForm() && /countdownValue\s*=\s*\d+/.test(html)
    ? { sec: countdownSecFromHtml(html) }
    : null;
};

const waitLastStep = async (): Promise<{ sec: number } | null> => waitFor(lastStep, 30_000, 100);

const putTokenOnForm = (form: HTMLFormElement, token: string): void => {
  let input = form.querySelector<HTMLInputElement>(TURNSTILE_RESPONSE);
  if (!input) {
    input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'cf-turnstile-response';
    form.appendChild(input);
  }
  input.value = token;
};

const findTurnstileWidget = (form: HTMLFormElement): HTMLElement | null => {
  const box =
    form.querySelector<HTMLElement>(`#${TURNSTILE_WIDGET_ID}`) ||
    form.querySelector<HTMLElement>('.cf-turnstile');
  if (box) {
    if (!box.id) box.id = TURNSTILE_WIDGET_ID;
    return box;
  }
  const parent = form.querySelector(TURNSTILE_RESPONSE)?.parentElement;
  if (parent && !parent.id) parent.id = TURNSTILE_WIDGET_ID;
  return parent ?? null;
};

const releasePin = (phase: PinPhase): void => {
  phase.stopPin?.();
  phase.stopPin = null;
};

async function waitPageTurnstile(overlay: FullPageOverlay): Promise<string | null> {
  overlay.setNote(CAPTCHA_NOTE);
  overlay.setStatus('Complete the captcha below.');

  return new Promise((resolve) => {
    const phase: PinPhase = { stopPin: null };
    let done = false;
    let finishing = false;
    let pinAt = 0;

    const finish = (token: string | null): void => {
      if (done) return;
      done = true;
      window.clearInterval(burst);
      obs.disconnect();
      releasePin(phase);
      resolve(token);
    };

    const pin = (): void => {
      if (done) return;
      const live = freeForm();
      if (!live) return;
      const widget = findTurnstileWidget(live);
      if (!widget) return;
      const widgetId = widget.id || TURNSTILE_WIDGET_ID;
      if (!widget.id) widget.id = widgetId;
      if (phase.stopPin && document.getElementById(widgetId)) return;
      releasePin(phase);
      phase.stopPin = pinSiteWidgetOverOverlay({
        overlayId: OVERLAY_ID,
        mount: overlay.turnstileMount,
        widgetId,
        styleId: CAPTCHA_PIN_STYLE_ID,
        alsoVisibleSelectors: TURNSTILE_IFRAMES,
      });
      if (!pinAt) pinAt = Date.now();
    };

    const check = (): void => {
      if (done || finishing) return;
      pin();
      const form = freeForm();
      const token = (form ? turnstileToken(form) : null) || turnstileToken(document);
      if (!token || !pinAt || Date.now() - pinAt < 400) return;
      finishing = true;
      overlay.setStatus('Captcha verified…');
      window.setTimeout(() => finish(token), 300);
    };

    pin();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { childList: true, subtree: true });
    const burst = window.setInterval(check, 250);
    window.setTimeout(() => {
      if (done) return;
      const form = freeForm();
      finish((form ? turnstileToken(form) : null) || turnstileToken(document));
    }, 180_000);
  });
}

async function finishFromLast(overlay: FullPageOverlay): Promise<void> {
  overlay.setNote(NOTE);
  overlay.setStatus('Getting things ready…');

  const step = await waitLastStep();
  if (!step) {
    overlay.setError('Unlock payload missing. Reload and try again.');
    return;
  }

  if (step.sec > 0) {
    overlay.setStatus('Unlock timer');
    const endAt = Date.now() + step.sec * 1000;
    overlay.startCountdown(endAt);
    await sleep(Math.max(0, endAt - Date.now()));
    overlay.hideCountdown();
  }

  overlay.setStatus('Opening destination…');
  const res = await requestGoUnlock();
  if (!res.ok) {
    overlay.setError(res.err ?? 'Unlock failed.');
    return;
  }
  recordBypassSuccess();
}

async function runCaptchaThenGo(overlay: FullPageOverlay): Promise<void> {
  overlay.setNote(CAPTCHA_NOTE);
  overlay.setStatus('Complete the captcha below.');

  const ready = await waitFor(
    () => freeForm()?.querySelector(`#${TURNSTILE_WIDGET_ID}, .cf-turnstile, ${TURNSTILE_RESPONSE}`),
    60_000,
    250,
  );
  if (!ready) {
    overlay.setError(isAdblockGate() ? ADBLOCK_ERROR : 'Captcha never loaded. Reload and try again.');
    return;
  }

  const token = await waitPageTurnstile(overlay);
  if (!token) {
    overlay.setError('Turnstile was not completed. Finish the check above.');
    return;
  }

  const form = freeForm();
  if (!form) {
    overlay.setError('Captcha form missing. Reload and try again.');
    return;
  }

  putTokenOnForm(form, token);
  overlay.setNote(NOTE);
  overlay.setStatus('Submitting captcha…');
  form.submit();
}

async function runUnlock(): Promise<void> {
  const overlay = mountUi(NOTE, 'Getting things ready…');
  requestVisibilitySpoof();

  const ref = gateRef();
  if (goForm()) {
    await finishFromLast(overlay);
    return;
  }

  const free = freeForm();
  if (isAdblockGate() && !free) {
    overlay.setError(ADBLOCK_ERROR);
    return;
  }

  if (free && isCaptchaStep(free)) {
    await runCaptchaThenGo(overlay);
    return;
  }

  if (free && (ref === 'first' || !ref)) {
    if (!free.querySelector('[name="_token"]')) {
      overlay.setError('CSRF token missing. Reload and try again.');
      return;
    }
    overlay.setStatus('Skipping continue gate…');
    free.submit();
    return;
  }

  overlay.setError('cuty gate not found on this page.');
}

export function initCutyGate(): void {
  void canBypass('cuty').then((ok) => {
    if (!ok) return;

    if (isCutyQuickPath()) {
      const dest = destinationFromQuickSearch();
      if (dest) {
        recordBypassSuccess();
        location.replace(dest);
        return;
      }
    }
    if (!cutyAliasFromPath()) return;

    const tryStart = (): void => {
      if (started || !isGatePage()) return;
      started = true;
      void runUnlock();
    };

    tryStart();
    if (started) return;

    const mo = new MutationObserver(() => {
      tryStart();
      if (started) mo.disconnect();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
    document.addEventListener('DOMContentLoaded', tryStart, { once: true });
  });
}
