import { linksGoFormFromHtml, postLinksGo, revealTimerLinks } from './unlock';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { pinSiteWidgetOverOverlay } from '../../injected-ui/pin-site-widget';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { isAllowedHost } from '../../utils/domain-check';
import { ADLINKFLY_LINKS_GO_HOSTS } from './hosts';

const HOSTS = ADLINKFLY_LINKS_GO_HOSTS;
const OVERLAY_ID = 'skip-wait-adlinkfly-overlay';
const BOOT_STYLE_ID = 'skip-wait-adlinkfly-boot';
const CAPTCHA_PIN_STYLE_ID = 'skip-wait-adlinkfly-captcha-pin';
const CAPTCHA_WIDGET_ID = 'captchaShortlink';
const LINKS_GO_SHELL_SEL = '#link-view,#go-link,form[action*="/links/go"],a.get-link';
const CAPTCHA_RESPONSE = '[name="g-recaptcha-response"], [name="h-captcha-response"]';
const HCAPTCHA_IFRAMES = [
  'iframe[src*="hcaptcha.com"]',
  'iframe[src*="newassets.hcaptcha.com"]',
] as const;
const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

const CAPTCHA_NOTE = {
  lead: 'Confirm you’re human.',
  detail: 'Tap the checkbox below. We’ll continue automatically when it’s done.',
} as const;

type CaptchaPhase = {
  started: boolean;
  done: boolean;
  stopPin: (() => void) | null;
};

let ui: FullPageOverlay | null = null;
let finished = false;
let aliasFetchSettled = false;
let aliasFetchInFlight = false;
let aliasFetchSucceeded = false;
let continueStarted = false;
let continueCaptchaStarted = false;
let aliasUnlockStarted = false;
let shellEngaged = false;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const isRealUrl = (s: string): boolean => /^https?:\/\//i.test(s);

const requestVisibilitySpoof = (): void => {
  chrome.runtime.sendMessage({ type: 'INJECT_VISIBILITY_SPOOF' }).catch(() => {});
};

const prepClientChecks = (): void => {
  try {
    document.cookie = 'ab=1; path=/';
  } catch {}
  try {
    const w = window as unknown as { blurred?: boolean; onblur?: unknown; onfocus?: unknown };
    w.blurred = false;
    w.onblur = null;
    w.onfocus = null;
  } catch {}
  try {
    const av = (window as unknown as { app_vars?: Record<string, unknown> }).app_vars;
    if (av) av['force_disable_adblock'] = '0';
  } catch {}
};

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

const dropUi = (): void => {
  ui?.remove();
  ui = null;
};

const isAliasPath = (): boolean => {
  const parts = location.pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  return parts.length === 1 && ALIAS_RE.test(parts[0]!);
};

const continueForm = (): HTMLFormElement | null => {
  const byId = document.querySelector<HTMLFormElement>('#form-continue');
  if (byId) return byId;
  const action = document.querySelector<HTMLInputElement>(
    'form input[name="action"][value="continue"]',
  );
  const form = action?.form ?? null;
  if (!form) return null;
  if (form.id === 'link-view' || form.querySelector(`#${CAPTCHA_WIDGET_ID}, ${CAPTCHA_RESPONSE}`)) {
    return null;
  }
  return form;
};

const continueFormFromHtml = (html: string): HTMLFormElement | null => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const byId = doc.querySelector<HTMLFormElement>('#form-continue');
  if (byId) return byId;
  const action = doc.querySelector<HTMLInputElement>(
    'form input[name="action"][value="continue"]',
  );
  const form = action?.form ?? null;
  if (!form) return null;
  if (form.id === 'link-view' || form.querySelector(`#${CAPTCHA_WIDGET_ID}, ${CAPTCHA_RESPONSE}`)) {
    return null;
  }
  return form;
};

const continueCaptchaForm = (): HTMLFormElement | null => {
  const form = document.querySelector<HTMLFormElement>('#link-view');
  if (!form) return null;
  if (!form.querySelector(`#${CAPTCHA_WIDGET_ID}`) && !form.querySelector(CAPTCHA_RESPONSE)) {
    return null;
  }
  return form;
};

const isUnlockShell = (): boolean =>
  Boolean(
    document.querySelector('#go-link, form[action*="/links/go"]') &&
      document.querySelector('input[name="ad_form_data"]'),
  );

const isAdlinkflyLinksGoShell = (doc: Document = document): boolean =>
  !!doc.querySelector(LINKS_GO_SHELL_SEL);

const shellCaptchaForm = (): HTMLFormElement | null => {
  const form = document.getElementById('link-view') as HTMLFormElement | null;
  if (!form?.querySelector(CAPTCHA_RESPONSE)) return null;
  return form;
};

const counterSec = (html = document.documentElement.innerHTML): number => {
  const m = html.match(/["']counter_value["']\s*:\s*["']?(\d+)/);
  if (m?.[1]) return Math.max(0, parseInt(m[1], 10));
  const t = document.querySelector('#timer, #countdown, .timer, #counter');
  const n = parseInt(t?.textContent?.trim() ?? '', 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

const hasCaptchaToken = (form: HTMLFormElement): boolean => {
  for (const root of [form, document]) {
    for (const el of root.querySelectorAll(CAPTCHA_RESPONSE)) {
      const v = (el as HTMLInputElement | HTMLTextAreaElement).value?.trim();
      if (v && v.length > 20) return true;
    }
  }
  return false;
};

const postFormHtml = async (form: HTMLFormElement, action: string): Promise<string | null> => {
  const body = new URLSearchParams();
  for (const el of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    'input[name], textarea[name]',
  )) {
    body.append(el.name, el.value);
  }
  try {
    const res = await fetch(action, {
      method: 'POST',
      body,
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return res.ok ? await res.text() : null;
  } catch {
    return null;
  }
};

const resolveUnlockUrl = async (
  html: string,
  referer: string,
  overlay: FullPageOverlay,
): Promise<string | null> => {
  const form = linksGoFormFromHtml(html, referer);
  if (!form) return null;

  overlay.setStatus('Unlocking your link…');
  let url = await postLinksGo(form, referer);
  if (url) return url;

  const sec = counterSec(html);
  if (sec <= 0) return null;

  requestVisibilitySpoof();
  overlay.setStatus('Waiting for the short timer…');
  overlay.startCountdown(Date.now() + sec * 1000);
  await sleep(sec * 1000 + 500);
  overlay.hideCountdown();
  overlay.setStatus('Unlocking your link…');
  url = await postLinksGo(form, referer);
  if (url) return url;
  const endAt = Date.now() + 3000;
  while (!url && Date.now() < endAt) {
    url = await postLinksGo(form, referer);
    if (url) break;
    await sleep(200);
  }
  return url;
};

const finishRedirect = (url: string, overlay: FullPageOverlay): void => {
  finished = true;
  aliasFetchSucceeded = true;
  overlay.setStatus('Opening your link…');
  location.replace(url);
};

const runAliasFetchChain = async (): Promise<boolean> => {
  const shell = isUnlockShell();
  const cont = continueForm();
  if (!shell && !cont) return false;

  requestVisibilitySpoof();
  prepClientChecks();
  const overlay = mountUi(NOTE, 'Getting things ready…');

  let html = document.documentElement.outerHTML;
  if (cont) {
    const page = cont.querySelector<HTMLInputElement>('input[name="page"]')?.value?.trim();
    overlay.setStatus(page ? `Skipping step ${page}…` : 'Skipping continue page…');
    const next = await postFormHtml(cont, location.href);
    if (!next) return false;
    html = next;
    let nextContinue = continueFormFromHtml(html);
    while (nextContinue) {
      const step = nextContinue.querySelector<HTMLInputElement>('input[name="page"]')?.value?.trim();
      overlay.setStatus(step ? `Skipping step ${step}…` : 'Skipping continue page…');
      const stepHtml = await postFormHtml(nextContinue, location.href);
      if (!stepHtml) break;
      html = stepHtml;
      nextContinue = continueFormFromHtml(html);
    }
  }

  const url = await resolveUnlockUrl(html, location.href, overlay);
  if (!url) {
    overlay.setStatus('Couldn’t unlock this link. Reload and try again.');
    return false;
  }

  finishRedirect(url, overlay);
  return true;
};

const runContinueSubmit = (): boolean => {
  if (continueStarted || finished) return continueStarted;
  const form = continueForm();
  if (!form) return false;
  continueStarted = true;
  requestVisibilitySpoof();
  prepClientChecks();
  const page = form.querySelector<HTMLInputElement>('input[name="page"]')?.value?.trim();
  mountUi(NOTE, page ? `Skipping step ${page}…` : 'Skipping continue page…');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => form.submit());
  });
  return true;
};

const runContinueCaptcha = (): boolean => {
  if (continueCaptchaStarted || finished) return continueCaptchaStarted;
  const form = continueCaptchaForm();
  if (!form) return false;
  continueCaptchaStarted = true;
  requestVisibilitySpoof();
  prepClientChecks();
  const overlay = mountUi(CAPTCHA_NOTE, 'Waiting for captcha…');
  let stopPin: (() => void) | null = null;
  let done = false;
  let raf = 0;

  const pin = (): void => {
    if (done || stopPin) return;
    if (!document.getElementById(CAPTCHA_WIDGET_ID)) return;
    stopPin = pinSiteWidgetOverOverlay({
      overlayId: OVERLAY_ID,
      mount: overlay.turnstileMount,
      widgetId: CAPTCHA_WIDGET_ID,
      styleId: CAPTCHA_PIN_STYLE_ID,
      alsoVisibleSelectors: HCAPTCHA_IFRAMES,
    });
  };

  const submitCaptcha = (): void => {
    const btn = form.querySelector<HTMLButtonElement>(
      '#invisibleCaptchaShortlink, button.btn-captcha, button[type="submit"]',
    );
    if (btn) {
      btn.disabled = false;
      btn.removeAttribute('disabled');
      btn.click();
      return;
    }
    form.submit();
  };

  const finish = (): void => {
    if (done) return;
    done = true;
    cancelAnimationFrame(raf);
    obs.disconnect();
    stopPin?.();
    stopPin = null;
    overlay.setNote(NOTE);
    overlay.setStatus('Continuing…');
    submitCaptcha();
  };

  const tickCaptcha = (): void => {
    if (done) return;
    if (!document.contains(form)) {
      done = true;
      cancelAnimationFrame(raf);
      obs.disconnect();
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

  const obs = new MutationObserver(() => {
    if (!done) tickCaptcha();
  });
  obs.observe(form, {
    attributeFilter: ['value', 'disabled'],
    attributes: true,
    childList: true,
    subtree: true,
  });
  pin();
  raf = requestAnimationFrame(tickCaptcha);
  return true;
};

const runAliasUnlock = async (): Promise<void> => {
  if (aliasUnlockStarted || finished || !isUnlockShell()) return;
  aliasUnlockStarted = true;
  requestVisibilitySpoof();
  prepClientChecks();
  const overlay = mountUi(NOTE, 'Getting things ready…');

  const url = await resolveUnlockUrl(document.documentElement.outerHTML, location.href, overlay);
  if (!url) {
    revealTimerLinks();
    const existing = document.querySelector<HTMLAnchorElement>('a.get-link, #gt-link');
    if (existing?.href && isRealUrl(existing.href)) {
      finishRedirect(existing.href, overlay);
      return;
    }
    overlay.setStatus('Couldn’t unlock this link. Reload and try again.');
    aliasUnlockStarted = false;
    return;
  }

  finishRedirect(url, overlay);
};

const runAliasDomPhases = (): void => {
  if (runContinueSubmit()) return;
  if (runContinueCaptcha()) return;
  if (isUnlockShell()) void runAliasUnlock();
};

const runAliasPipeline = (): void => {
  if (finished || shellEngaged) return;
  prepClientChecks();

  if (!aliasFetchSettled) {
    const shell = isUnlockShell();
    const cont = continueForm();
    if (shell || cont) {
      aliasFetchSettled = true;
      aliasFetchInFlight = true;
      void runAliasFetchChain().then((ok) => {
        aliasFetchInFlight = false;
        if (ok) return;
        runAliasDomPhases();
      });
      return;
    }
    if (continueCaptchaForm()) {
      aliasFetchSettled = true;
      runAliasDomPhases();
      return;
    }
  }

  if (aliasFetchInFlight) return;

  if (aliasFetchSettled && !aliasFetchSucceeded) {
    runAliasDomPhases();
  }
};

const exitShellCaptchaPhase = (phase: CaptchaPhase): void => {
  phase.stopPin?.();
  phase.stopPin = null;
  dropUi();
  phase.done = true;
};

const runShellCaptchaPhase = (form: HTMLFormElement, phase: CaptchaPhase): void => {
  if (phase.started || phase.done || finished) return;
  phase.started = true;

  const overlay = mountUi();
  overlay.setNote(CAPTCHA_NOTE);
  overlay.setStatus('Waiting for captcha…');

  if (document.getElementById(CAPTCHA_WIDGET_ID)) {
    phase.stopPin = pinSiteWidgetOverOverlay({
      overlayId: OVERLAY_ID,
      mount: overlay.turnstileMount,
      widgetId: CAPTCHA_WIDGET_ID,
      styleId: CAPTCHA_PIN_STYLE_ID,
      alsoVisibleSelectors: HCAPTCHA_IFRAMES,
    });
  }

  const tickCaptcha = (): void => {
    if (phase.done || finished) return;
    if (!document.contains(form)) {
      exitShellCaptchaPhase(phase);
      return;
    }
    if (!hasCaptchaToken(form)) {
      requestAnimationFrame(tickCaptcha);
      return;
    }
    exitShellCaptchaPhase(phase);
    form.submit();
  };
  requestAnimationFrame(tickCaptcha);
};

const finishShellTimerUnlock = async (overlay: FullPageOverlay): Promise<string | null> => {
  revealTimerLinks();
  const link = document.querySelector<HTMLAnchorElement>('a.get-link');
  if (link?.href && isRealUrl(link.href)) return link.href;

  const form = linksGoFormFromHtml(document.documentElement.innerHTML, location.href);
  if (!form) return null;

  let url = await postLinksGo(form, location.href);
  if (url) return url;

  const sec = counterSec();
  if (sec > 0) {
    requestVisibilitySpoof();
    overlay.setStatus('Waiting for timer…');
    overlay.startCountdown(Date.now() + sec * 1000);
    const endAt = Date.now() + (sec + 2) * 1000;
    while (Date.now() < endAt) {
      revealTimerLinks();
      url = await postLinksGo(form, location.href);
      if (url) return url;
      await sleep(200);
    }
  }

  revealTimerLinks();
  return postLinksGo(form, location.href);
};

const runShellTimerPhase = async (state: { done: boolean; inFlight: boolean }): Promise<boolean> => {
  if (state.done || state.inFlight || finished) return state.done;

  const link = document.querySelector<HTMLAnchorElement>('a.get-link');
  if (link?.href && isRealUrl(link.href)) {
    state.done = true;
    finished = true;
    mountUi().setStatus('Redirecting now…');
    location.href = link.href;
    return true;
  }

  if (!document.querySelector<HTMLFormElement>('#go-link, form[action*="/links/go"]')) return false;

  state.inFlight = true;
  try {
    const overlay = mountUi();
    overlay.setNote(NOTE);
    const url = await finishShellTimerUnlock(overlay);
    if (!url) return false;
    state.done = true;
    finished = true;
    overlay.setStatus('Redirecting now…');
    location.href = url;
    return true;
  } finally {
    state.inFlight = false;
  }
};

const startShellPipeline = (): void => {
  if (shellEngaged || finished || aliasFetchInFlight) return;
  shellEngaged = true;
  requestVisibilitySpoof();

  const captchaPhase: CaptchaPhase = { started: false, done: false, stopPin: null };
  const timerState = { done: false, inFlight: false };

  const run = (): void => {
    if (finished) return;
    const captcha = shellCaptchaForm();
    if (captcha) {
      runShellCaptchaPhase(captcha, captchaPhase);
      return;
    }
    void runShellTimerPhase(timerState).then((ok) => {
      if (ok) finished = true;
    });
  };

  run();
  const observer = new MutationObserver(run);
  observer.observe(document.documentElement, {
    attributeFilter: ['href', 'value'],
    attributes: true,
    childList: true,
    subtree: true,
  });
};

const hasLinksGoHint = (): boolean => {
  if (isAdlinkflyLinksGoShell()) return true;
  for (const s of document.scripts) {
    if (s.textContent?.includes('/links/go')) return true;
  }
  return false;
};

const tick = (): void => {
  if (finished) return;

  if (isAliasPath()) {
    runAliasPipeline();
    return;
  }

  if (shellEngaged || aliasFetchInFlight || aliasFetchSucceeded) return;
  if (!isAdlinkflyLinksGoShell()) return;
  startShellPipeline();
};

export function initAdlinkflyLinksGo(): void {
  if (window !== window.top) return;
  if (!isAllowedHost(HOSTS)) return;

  if (hasLinksGoHint() || isAliasPath()) requestVisibilitySpoof();

  tick();

  const mo = new MutationObserver(tick);
  mo.observe(document.documentElement, {
    attributeFilter: ['href', 'value', 'disabled'],
    attributes: true,
    childList: true,
    subtree: true,
  });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tick, true);
  }
  window.addEventListener('load', tick, true);
}
