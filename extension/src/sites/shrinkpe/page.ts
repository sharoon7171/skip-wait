import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { pinSiteWidgetOverOverlay } from '../../injected-ui/pin-site-widget';
import { unlockShrinkearnInPage } from './earn';
import {
  MSG_OPEN,
  MSG_PROGRESS,
  MSG_RESOLVE,
  SITE,
  aliasFromPath,
  shortenerFor,
  type ShrinkpeFields,
} from './hosts';
import { OVERLAY_ID, createOverlay } from './overlay';

const CAPTCHA_WIDGET_ID = 'captchaShortlink';
const CAPTCHA_PIN_STYLE_ID = 'skip-wait-shrinkpe-captcha-pin';
const TURNSTILE_RESPONSE = 'textarea[name="cf-turnstile-response"], input[name="cf-turnstile-response"]';
const TURNSTILE_IFRAMES = ['iframe[src*="challenges.cloudflare.com"]'] as const;
const OLA_DRIVE_HOST = 'drive.olamovies.download';
const OLA_DRIVE_HOLD_MS = 100_000;

const ui = createOverlay();
let started = false;
let done = false;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const inputVal = (form: HTMLFormElement, name: string): string =>
  form.querySelector<HTMLInputElement>(`input[name="${name}"]`)?.value.trim() ?? '';

const tokenForm = (): HTMLFormElement | null => {
  for (const form of document.querySelectorAll<HTMLFormElement>('form')) {
    if (inputVal(form, 'token') && inputVal(form, 'alias') && inputVal(form, 'c_d') && inputVal(form, 'c_t')) {
      return form;
    }
  }
  return null;
};

const captchaForm = (): HTMLFormElement | null => {
  const resp = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(TURNSTILE_RESPONSE);
  const form = resp?.form ?? tokenForm();
  if (!form) return null;
  if (!form.querySelector('input[name="token"]') || !form.querySelector('input[name="alias"]')) {
    return null;
  }
  return form;
};

const tokenReady = (form: HTMLFormElement): boolean => {
  const el = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(TURNSTILE_RESPONSE);
  return !!el && (el.value?.trim().length ?? 0) > 20;
};

const collectFields = (form: HTMLFormElement): ShrinkpeFields => {
  const fields: ShrinkpeFields = {};
  form
    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[name], textarea[name]')
    .forEach((el) => {
      fields[el.name] = el.value ?? '';
    });
  return fields;
};

const requestResolve = (pageUrl: string, action: string, fields: ShrinkpeFields): Promise<string> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { type: MSG_RESOLVE, pageUrl, action, fields },
      (res?: { ok?: boolean; dest?: string }) => {
        if (chrome.runtime.lastError || !res?.ok || !res.dest) reject(new Error('resolve'));
        else resolve(res.dest);
      },
    );
  });

const openDestination = (url: string): Promise<boolean> =>
  new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: MSG_OPEN, url }, (ok?: boolean) => {
      resolve(!chrome.runtime.lastError && ok === true);
    });
  });

const PHASE_TEXT: Record<string, string> = {
  banner: 'Fetching the unlock page',
  go: 'Getting your destination link',
};

const ERROR_STATUS = 'Couldn’t finish this link. Reload and try again.';

const bindProgress = (): (() => void) => {
  const onProgress = (msg: {
    type?: string;
    phase?: string;
    step?: number;
    waitEndTs?: number;
  }): void => {
    if (msg.type !== MSG_PROGRESS) return;
    if (typeof msg.waitEndTs === 'number') {
      if (msg.waitEndTs > Date.now()) ui.startCountdown(msg.waitEndTs);
      return;
    }
    if (msg.phase === 'skip') {
      ui.setPhase(typeof msg.step === 'number' ? `Skipping blog page ${msg.step}` : 'Skipping the blog pages');
      return;
    }
    const text = msg.phase ? PHASE_TEXT[msg.phase] : undefined;
    if (text) ui.setPhase(text);
  };
  chrome.runtime.onMessage.addListener(onProgress);
  return () => chrome.runtime.onMessage.removeListener(onProgress);
};

const applyEarnProgress = (p: { phase?: 'banner' | 'go'; waitEndTs?: number }): void => {
  if (typeof p.waitEndTs === 'number') {
    if (p.waitEndTs > Date.now()) ui.startCountdown(p.waitEndTs);
    return;
  }
  const text = p.phase ? PHASE_TEXT[p.phase] : undefined;
  if (text) ui.setPhase(text);
};

const isOlaDriveDest = (url: string): boolean => {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host === OLA_DRIVE_HOST || host.endsWith(`.${OLA_DRIVE_HOST}`);
  } catch {
    return false;
  }
};

const finishDest = async (dest: string): Promise<void> => {
  if (isOlaDriveDest(dest)) {
    ui.startCountdown(Date.now() + OLA_DRIVE_HOLD_MS);
    await sleep(OLA_DRIVE_HOLD_MS);
  }
  ui.hideCountdown();
  ui.progress();
  if (!(await openDestination(dest))) throw new Error('open');
  recordBypassSuccess();
};

const runShrinkpe = (form: HTMLFormElement): void => {
  if (started) return;
  started = true;
  ui.captcha();

  let stopPin: (() => void) | null = null;
  const pin = (): void => {
    if (stopPin || !document.getElementById(CAPTCHA_WIDGET_ID)) return;
    stopPin = pinSiteWidgetOverOverlay({
      overlayId: OVERLAY_ID,
      mount: ui.turnstileMount(),
      widgetId: CAPTCHA_WIDGET_ID,
      styleId: CAPTCHA_PIN_STYLE_ID,
      alsoVisibleSelectors: TURNSTILE_IFRAMES,
    });
  };

  const unbind = bindProgress();
  const tick = async (): Promise<void> => {
    if (done) return;
    pin();
    if (!tokenReady(form)) {
      requestAnimationFrame(() => void tick());
      return;
    }
    done = true;
    stopPin?.();
    ui.progress();
    try {
      const dest = await requestResolve(location.href, form.action, collectFields(form));
      await finishDest(dest);
    } catch {
      ui.setError(ERROR_STATUS);
    } finally {
      unbind();
    }
  };
  void tick();
};

const runShrinkearn = (form: HTMLFormElement): void => {
  if (started) return;
  started = true;
  ui.progress();

  void (async () => {
    try {
      const { mediator } = shortenerFor(location.hostname);
      const dest = await unlockShrinkearnInPage(location.href, collectFields(form), mediator, applyEarnProgress);
      await finishDest(dest);
    } catch {
      ui.setError(ERROR_STATUS);
    }
  })();
};

export const initShrinkpePage = (): void => {
  if (window !== window.top) return;
  if (!aliasFromPath(location.pathname)) return;

  void canBypass(SITE).then((ok) => {
    if (!ok) return;
    const earn = shortenerFor(location.hostname).kind === 'shrinkearn';
    const start = (): boolean => {
      if (started) return true;
      const form = earn ? tokenForm() : captchaForm();
      if (!form) return false;
      (earn ? runShrinkearn : runShrinkpe)(form);
      return true;
    };
    if (start()) return;
    const mo = new MutationObserver(() => {
      if (start()) mo.disconnect();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => start(), true);
    }
    window.addEventListener('load', () => start(), true);
  });
};
