import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { pinSiteWidgetOverOverlay } from '../../injected-ui/pin-site-widget';
import { MSG_OPEN, MSG_RESOLVE, SITE, aliasFromPath } from './hosts';
import { createOverlay } from './overlay';

const CAPTCHA_WIDGET = 'recaptchadiv';
const CAPTCHA_PIN_STYLE = 'skip-wait-unlocktoearn-captcha-pin';
const CAPTCHA_IFRAMES = [
  'iframe[src*="recaptcha"]',
  'iframe[src*="recaptcha.net"]',
  'iframe[src*="google.com/recaptcha"]',
  'iframe[title*="reCAPTCHA"]',
] as const;

const ui = createOverlay();
let done = false;

const isBotGate = (): boolean => {
  if (document.getElementById('lsrecaptcha-form')) return true;
  if (document.getElementById(CAPTCHA_WIDGET)) return true;
  return /^bot verification$/i.test(document.title.trim());
};

const requestDestination = (alias: string): Promise<string> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: MSG_RESOLVE, alias }, (res?: { ok?: boolean; dest?: string }) => {
      if (chrome.runtime.lastError || !res?.ok || !res.dest) reject(new Error('resolve'));
      else resolve(res.dest);
    });
  });

const openDestination = (url: string): Promise<boolean> =>
  new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: MSG_OPEN, url }, (ok?: boolean) => {
      resolve(!chrome.runtime.lastError && ok === true);
    });
  });

const unlockAlias = async (alias: string): Promise<void> => {
  if (done) return;
  done = true;
  try {
    ui.progress();
    const dest = await requestDestination(alias);
    if (!(await openDestination(dest))) {
      done = false;
      ui.setError('Couldn’t open your UnlockToEarn destination. Reload and try again.');
      return;
    }
    recordBypassSuccess();
  } catch {
    done = false;
    ui.setError('Couldn’t finish UnlockToEarn. Reload this link and try again.');
  }
};

const armCaptchaForm = (alias: string): void => {
  const form = document.querySelector<HTMLFormElement>('#lsrecaptcha-form');
  if (!form || form.dataset['swArmed'] === '1') return;
  form.dataset['swArmed'] = '1';

  const postThenUnlock = (): void => {
    void (async () => {
      try {
        await fetch(form.action || location.href, {
          method: 'POST',
          body: new FormData(form),
          credentials: 'include',
          redirect: 'manual',
        });
      } catch {}
      await unlockAlias(alias);
    })();
  };

  form.addEventListener(
    'submit',
    (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      postThenUnlock();
    },
    true,
  );

  form.submit = () => {
    postThenUnlock();
  };
};

const pinBotCaptcha = (alias: string): void => {
  const overlay = ui.captcha();
  let stopPin: (() => void) | null = null;

  const pin = (): void => {
    armCaptchaForm(alias);
    if (stopPin || !document.getElementById(CAPTCHA_WIDGET)) return;
    stopPin = pinSiteWidgetOverOverlay({
      overlayId: ui.id,
      mount: overlay.turnstileMount,
      widgetId: CAPTCHA_WIDGET,
      styleId: CAPTCHA_PIN_STYLE,
      alsoVisibleSelectors: CAPTCHA_IFRAMES,
    });
  };

  pin();
  new MutationObserver(pin).observe(document.documentElement, { childList: true, subtree: true });
};

export const initUnlocktoearnPage = (): void => {
  if (window !== window.top) return;
  if (!aliasFromPath(location.pathname)) return;

  void canBypass(SITE).then((ok) => {
    if (!ok) return;
    const alias = aliasFromPath(location.pathname);
    if (!alias) return;
    ui.progress();
    if (isBotGate()) {
      pinBotCaptcha(alias);
      return;
    }
    void unlockAlias(alias);
  });
};
