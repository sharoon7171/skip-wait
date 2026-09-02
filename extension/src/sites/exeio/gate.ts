import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { pinSiteWidgetOverOverlay } from '../../injected-ui/pin-site-widget';
import { whenDomReady } from '../../utils/domain-check';
import { MSG_EXEIO_ADBLOCK, MSG_EXEIO_GO_UNLOCK, type ExeioUnlockResult } from './hosts';

const OVERLAY_ID = 'skip-wait-exeio-overlay';
const CAPTCHA_PIN_STYLE_ID = 'skip-wait-exeio-captcha-pin';
const CAPTCHA_WIDGET_ID = 'captchaShortlink';
const TURNSTILE = '[name="cf-turnstile-response"]';
const TURNSTILE_FRAMES = ['iframe[src*="challenges.cloudflare.com"]', 'iframe[src*="turnstile"]'] as const;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

const CAPTCHA_NOTE = {
  lead: 'Confirm you’re human.',
  detail: 'Complete the Turnstile check below. We’ll continue automatically when it’s done.',
} as const;

type Phase = 'before' | 'link' | 'go';
type PinPhase = { stopPin: (() => void) | null };

let ui: FullPageOverlay | null = null;
let started = false;

const msg = (type: string): void => {
  chrome.runtime.sendMessage({ type }).catch(() => {});
};

const mountUi = (note: typeof NOTE | typeof CAPTCHA_NOTE = NOTE, status = 'Getting things ready…'): FullPageOverlay => {
  if (ui) {
    ui.setNote(note);
    ui.setStatus(status);
    return ui;
  }
  ui = createFullPageOverlay({ id: OVERLAY_ID, brand: 'Skip Wait', note, status, countdownLabel: 'Continue in' });
  return ui;
};

const nativeSubmit = (form: HTMLFormElement): void => {
  if (!form.getAttribute('action')) form.action = location.pathname;
  form.method = 'post';
  HTMLFormElement.prototype.submit.call(form);
};

const turnstileToken = (root: ParentNode = document): string | null => {
  for (const el of root.querySelectorAll(TURNSTILE)) {
    const v = (el as HTMLInputElement).value.trim();
    if (v.length > 20) return v;
  }
  return null;
};

const turnstileWidget = (form: Element): HTMLElement | null =>
  form.querySelector<HTMLElement>(`#${CAPTCHA_WIDGET_ID}`) ??
  form.querySelector<HTMLElement>('.cf-turnstile') ??
  form.querySelector(TURNSTILE)?.parentElement ??
  null;

const phase = (): Phase | null => {
  if (document.getElementById('before-captcha')) return 'before';
  if (document.getElementById('link-view') || document.querySelector('.link-container .button.disabled.danger')) {
    return 'link';
  }
  if (document.getElementById('go-link')?.querySelector('[name=ad_form_data]')) return 'go';
  return null;
};

const requestGoUnlock = (): Promise<ExeioUnlockResult> =>
  new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: MSG_EXEIO_GO_UNLOCK }, (res) => {
      if (chrome.runtime.lastError) {
        resolve({ ok: false, err: chrome.runtime.lastError.message ?? 'runtime error' });
        return;
      }
      const out = res as ExeioUnlockResult | undefined;
      resolve(out?.ok ? { ok: true } : { ok: false, err: out?.err ?? 'no response' });
    });
  });

const waitForGoSubmit = (): Promise<void> => {
  const ready = (): boolean => {
    const btn = document.getElementById('go-submit');
    return btn instanceof HTMLButtonElement && !btn.disabled && !btn.classList.contains('disabled');
  };
  if (ready()) return Promise.resolve();
  return new Promise((resolve) => {
    const mo = new MutationObserver(() => {
      if (!ready()) return;
      mo.disconnect();
      resolve();
    });
    mo.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled', 'class'],
    });
  });
};

const goCountdownEndAt = (): number => {
  const timer = document.getElementById('timer')?.textContent?.trim();
  const fromTimer = timer ? parseFloat(timer) : Number.NaN;
  if (Number.isFinite(fromTimer) && fromTimer > 0) return Date.now() + fromTimer * 1000;
  const av = (window as Window & { app_vars?: { counter_value?: string } }).app_vars;
  const sec = parseInt(String(av?.counter_value ?? ''), 10);
  return Date.now() + (Number.isFinite(sec) ? sec : 6) * 1000 + 500;
};

async function runBeforeCaptcha(overlay: FullPageOverlay): Promise<void> {
  let form = document.getElementById('before-captcha') as HTMLFormElement | null;
  if (!(form instanceof HTMLFormElement)) return;

  if (form.querySelector('.button.disabled.danger') && !form.querySelector('[name=f_n]')) {
    overlay.setStatus('Bypassing adblock gate…');
    msg(MSG_EXEIO_ADBLOCK);
    await whenDomReady(() => {
      const f = document.getElementById('before-captcha');
      return f instanceof HTMLFormElement && !!f.querySelector('[name=f_n]');
    });
    form = document.getElementById('before-captcha') as HTMLFormElement | null;
    if (!(form instanceof HTMLFormElement)) {
      overlay.setError('Adblock gate still active. Reload and try again.');
      return;
    }
  }

  if (!form.querySelector('[name=_csrfToken]')) {
    overlay.setError('Continue gate not ready. Reload and try again.');
    return;
  }

  const fn = form.querySelector<HTMLInputElement>('[name=f_n]');
  if (fn) fn.value = 'sle';
  overlay.setNote(NOTE);
  overlay.setStatus('Skipping continue gate…');
  nativeSubmit(form);
}

function runLinkViewCaptcha(overlay: FullPageOverlay): Promise<string | null> {
  const prefilled = turnstileToken(document);
  if (prefilled && document.getElementById('link-view')) return Promise.resolve(prefilled);

  return new Promise((resolve) => {
    const pin: PinPhase = { stopPin: null };
    let done = false;
    const finish = (token: string | null): void => {
      if (done) return;
      done = true;
      obs.disconnect();
      clearTimeout(cap);
      pin.stopPin?.();
      resolve(token);
    };
    const check = (): void => {
      if (done) return;
      const token = turnstileToken(document);
      if (token && document.getElementById('link-view')) {
        overlay.setStatus('Captcha verified…');
        finish(token);
        return;
      }
      const form = document.getElementById('link-view');
      if (!form && document.querySelector('.button.disabled.danger')) {
        overlay.setStatus('Bypassing adblock gate…');
        msg(MSG_EXEIO_ADBLOCK);
        return;
      }
      if (!(form instanceof HTMLFormElement)) return;
      const widget = turnstileWidget(form);
      if (!widget) return;
      if (!widget.id) widget.id = CAPTCHA_WIDGET_ID;
      if (!pin.stopPin) {
        pin.stopPin = pinSiteWidgetOverOverlay({
          overlayId: OVERLAY_ID,
          mount: overlay.turnstileMount,
          widgetId: widget.id,
          styleId: CAPTCHA_PIN_STYLE_ID,
          alsoVisibleSelectors: TURNSTILE_FRAMES,
        });
        overlay.setStatus(
          TURNSTILE_FRAMES.some((s) => form.querySelector(s)) ? 'Complete the captcha below.' : 'Loading captcha…',
        );
      }
    };
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
    check();
    const cap = setTimeout(() => finish(turnstileToken(document)), 180_000);
  });
}

async function runLinkView(overlay: FullPageOverlay): Promise<void> {
  if (!document.getElementById('link-view') && !document.querySelector('.link-container .button.disabled.danger')) {
    return;
  }
  overlay.setNote(CAPTCHA_NOTE);
  overlay.setStatus('Waiting for captcha…');
  msg(MSG_EXEIO_ADBLOCK);
  const token = await runLinkViewCaptcha(overlay);
  if (!token) {
    overlay.setError('Turnstile was not completed. Finish the check above.');
    return;
  }
  const form = document.getElementById('link-view');
  if (!(form instanceof HTMLFormElement)) {
    overlay.setError('Captcha form was removed. Reload and try again.');
    return;
  }
  const fn = form.querySelector<HTMLInputElement>('[name=f_n]');
  if (fn) fn.value = 'slc';
  let input = form.querySelector<HTMLInputElement>(TURNSTILE);
  if (!input) {
    input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'cf-turnstile-response';
    form.appendChild(input);
  }
  input.value = token;
  overlay.setNote(NOTE);
  overlay.setStatus('Submitting captcha…');
  nativeSubmit(form);
}

async function runGoLink(overlay: FullPageOverlay): Promise<void> {
  const form = document.getElementById('go-link');
  if (!(form instanceof HTMLFormElement) || !form.querySelector('[name=ad_form_data]')) return;

  overlay.setNote(NOTE);
  msg('INJECT_VISIBILITY_SPOOF');
  msg(MSG_EXEIO_ADBLOCK);
  overlay.setStatus('Waiting for unlock…');
  overlay.startCountdown(goCountdownEndAt());
  await waitForGoSubmit();
  overlay.hideCountdown();

  if (!document.getElementById('go-link')?.querySelector('[name=ad_form_data]')) {
    overlay.setError('Unlock form was removed. Reload and try again.');
    return;
  }

  overlay.setStatus('Posting /links/go…');
  const res = await requestGoUnlock();
  if (!res.ok) {
    overlay.setError(res.err ?? 'Unlock failed.');
    return;
  }
  recordBypassSuccess();
}

async function runPipeline(): Promise<void> {
  msg(MSG_EXEIO_ADBLOCK);
  msg('INJECT_VISIBILITY_SPOOF');
  const overlay = mountUi();
  if (!phase()) await whenDomReady(() => !!phase());
  switch (phase()) {
    case 'before':
      await runBeforeCaptcha(overlay);
      break;
    case 'link':
      await runLinkView(overlay);
      break;
    case 'go':
      await runGoLink(overlay);
      break;
    default:
      overlay.setError('exe.io gate not found on this page.');
  }
}

export function initExeioGate(): void {
  if (window !== window.top || started) return;
  void canBypass('exeio').then((ok) => {
    if (!ok || started) return;
    started = true;
    void runPipeline();
  });
}
