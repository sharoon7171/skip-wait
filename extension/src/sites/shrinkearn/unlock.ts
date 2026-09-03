import { linksGoFormFromHtml, postLinksGo } from '../adlinkfly/unlock';
import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { ERROR_STATUS, GET_LINK_SEL, SITE, UNLOCK_WAIT_MS, isAliasPage } from './hosts';
import { overlay } from './overlay';
import {
  isCaptchaGate,
  isUnlockShell,
  showCaptchaInOverlay,
  submitCamps,
  tickUnlockPage,
  turnstileReady,
} from './page';
import { prepClientChecks, requestVisibilitySpoof } from './prep';

const CAPTCHA_NOTE = {
  lead: 'Confirm you’re human.',
  detail: 'Complete the check below. Skip Wait continues when you’re done.',
} as const;

const UNLOCK_NOTE = {
  lead: 'Unlocking your link.',
  detail: "Skip Wait is finishing the Get Link step for you. You don't need to tap anything.",
} as const;

const CONTINUE_NOTE = {
  lead: 'Skipping the wait pages.',
  detail: "You don't need to tap anything on the page.",
} as const;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

let watch: MutationObserver | null = null;
let captchaStarted = false;
let unlockStarted = false;
let captchaPoll = 0;

const stopWatch = (): void => {
  watch?.disconnect();
  watch = null;
};

const stopCaptcha = (): void => {
  window.clearInterval(captchaPoll);
  captchaPoll = 0;
  captchaStarted = false;
};

const runCaptcha = (): void => {
  if (captchaStarted) return;
  captchaStarted = true;
  stopWatch();

  const step = (): void => {
    if (!captchaStarted) return;
    const shown = showCaptchaInOverlay(overlay.mount());
    overlay.showCaptcha(CAPTCHA_NOTE, shown ? 'Complete the check below.' : 'Loading check…');
    if (!turnstileReady()) return;
    stopCaptcha();
    overlay.showLocked(CONTINUE_NOTE, 'Continuing');
    submitCamps();
  };

  step();
  captchaPoll = window.setInterval(step, 200);
};

const waitForCounter = async (): Promise<void> => {
  tickUnlockPage();
  overlay.showLocked(UNLOCK_NOTE, 'Waiting for the short timer…');
  overlay.startCountdown(Date.now() + UNLOCK_WAIT_MS);
  await sleep(UNLOCK_WAIT_MS);
  overlay.hideCountdown();
};

const openUrl = (url: string, status: string): void => {
  overlay.showLocked(UNLOCK_NOTE, status);
  recordBypassSuccess();
  location.replace(url);
};

const runUnlock = async (): Promise<void> => {
  if (unlockStarted || !isUnlockShell()) return;
  unlockStarted = true;
  stopWatch();
  requestVisibilitySpoof();
  prepClientChecks();
  overlay.showLocked(UNLOCK_NOTE, 'Getting things ready');
  await waitForCounter();

  if (!isUnlockShell()) {
    unlockStarted = false;
    return;
  }

  tickUnlockPage();
  const link = document.querySelector<HTMLAnchorElement>(GET_LINK_SEL);
  if (link?.href && /^https?:\/\//i.test(link.href)) {
    openUrl(link.href, 'Opening your destination');
    return;
  }

  const form = linksGoFormFromHtml(document.documentElement.innerHTML, location.href);
  if (!form) {
    overlay.error(ERROR_STATUS);
    unlockStarted = false;
    return;
  }

  overlay.showLocked(UNLOCK_NOTE, 'Getting your destination');
  let url = await postLinksGo(form, location.href);
  for (let i = 0; url === null && i < 20; i++) {
    tickUnlockPage();
    await sleep(200);
    url = await postLinksGo(form, location.href);
  }
  if (!url) {
    const retryMs = UNLOCK_WAIT_MS + 2_000;
    overlay.showLocked(UNLOCK_NOTE, 'Waiting for the short timer…');
    overlay.startCountdown(Date.now() + retryMs);
    const endAt = Date.now() + retryMs;
    while (!url && Date.now() < endAt) {
      tickUnlockPage();
      url = await postLinksGo(form, location.href);
      if (url) break;
      await sleep(200);
    }
    overlay.hideCountdown();
  }

  if (!url) {
    overlay.error(ERROR_STATUS);
    unlockStarted = false;
    return;
  }

  openUrl(url, 'Opening your destination');
};

const tick = (): void => {
  if (isUnlockShell()) {
    void runUnlock();
    return;
  }
  if (isCaptchaGate()) runCaptcha();
};

export const initShrinkEarn = (): void => {
  if (window !== window.top || !isAliasPage()) return;
  void canBypass(SITE).then((ok) => {
    if (!ok) return;
    tick();
    watch = new MutationObserver(tick);
    watch.observe(document.documentElement, { childList: true, subtree: true });
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', tick, { once: true });
    }
  });
};
