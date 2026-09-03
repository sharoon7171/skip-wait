import { countOnMessage } from '../../free-bypass';
import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { overlayClasses } from '../../injected-ui/overlay-styles';
import { isLootLockerPath } from './locker';
import {
  LOOT_MSG_SOURCE,
  MSG_INJECT_LOOT,
  MSG_INJECT_LOOT_CAPTCHA,
  MSG_LOOT_CAPTCHA_VERIFY,
  type LootHookMessage,
} from './messages';

const OVERLAY_ID = 'skip-wait-loot-overlay';

const COPY = {
  loading: { lead: 'Preparing bypass', detail: 'Connecting to the locker…' },
  wait: { lead: 'Bypassing wait', detail: 'The timer is counting down automatically — no survey needed.' },
  captcha: { lead: 'Bypassing wait', detail: 'Complete the human check below while the timer runs.' },
  opening: { lead: 'Opening your link', detail: '' },
} as const;

const errCopy = (msg: string): string => {
  if (msg === 'ws timeout' || msg === 'ws error') return 'Unlock timed out. Refresh and try again.';
  if (msg === 'ws base') return 'Still loading locker. Refresh and try again.';
  if (msg.startsWith('tc ')) return 'Could not load tasks. Refresh and try again.';
  if (msg === 'captcha verify') return 'Verification failed. Try the check again.';
  if (msg === 'dest' || msg === 'tc empty' || msg === 'no auto-complete task') return 'Unlock failed. Refresh and try again.';
  return 'Something went wrong. Refresh and try again.';
};

export const isLootCaptchaFrame = (): boolean =>
  window !== window.top && /\/captcha(?:\?|$)/i.test(`${location.pathname}${location.search}`);

export function initLootlabsCaptchaFrame(): void {
  if (!isLootCaptchaFrame()) return;
  const requestBridge = (): void => {
    void chrome.runtime.sendMessage({ type: MSG_INJECT_LOOT_CAPTCHA });
  };
  requestBridge();
  document.addEventListener('DOMContentLoaded', requestBridge, { once: true });
  window.addEventListener('load', requestBridge, { once: true });
}

export function initLootlabsUnlock(): void {
  if (window !== window.top) return;
  if (!isLootLockerPath(location.pathname, location.search)) return;

  let ui: FullPageOverlay | null = null;
  let waitEndTs = 0;
  let unlockTimer = 0;
  let captchaUrl = '';
  const pending: LootHookMessage[] = [];

  const note = (lead: string, detail = ''): void => {
    if (!ui) return;
    if (detail) ui.setNote({ lead, detail });
    else ui.setNote({ lead });
  };

  const refreshCountdown = (): void => {
    if (!ui || waitEndTs <= Date.now()) return;
    ui.startCountdown(waitEndTs);
  };

  const scheduleUnlock = (): void => {
    clearTimeout(unlockTimer);
    const left = waitEndTs - Date.now();
    if (left <= 0) {
      ui?.setStatus('Unlocking…');
      return;
    }
    unlockTimer = window.setTimeout(() => ui?.setStatus('Unlocking…'), left);
  };

  const mountTurnstile = (url: string): void => {
    if (!ui) return;
    const mount = ui.turnstileMount;
    mount.replaceChildren();
    mount.classList.remove(overlayClasses.hidden);
    const frame = document.createElement('iframe');
    frame.src = url;
    frame.title = 'Verification';
    mount.appendChild(frame);
  };

  const clearTurnstile = (): void => {
    ui?.turnstileMount.replaceChildren();
  };

  const tick = (endTs: number): void => {
    if (!ui) return;
    waitEndTs = endTs;
    note(COPY.wait.lead, COPY.wait.detail);
    ui.startCountdown(endTs);
    scheduleUnlock();
  };

  const armCaptcha = (url: string): void => {
    if (!ui) return;
    captchaUrl = url;
    note(COPY.captcha.lead, COPY.captcha.detail);
    mountTurnstile(url);
    refreshCountdown();
    ui.turnstileMount.querySelector('iframe')?.addEventListener(
      'load',
      () => {
        chrome.runtime.sendMessage({ type: MSG_INJECT_LOOT_CAPTCHA });
      },
      { once: true },
    );
  };

  const apply = (data: LootHookMessage): void => {
    if (data.type === 'wait') {
      tick(data.endTs);
      return;
    }
    if (data.type === 'captcha') {
      armCaptcha(data.url);
      refreshCountdown();
      return;
    }
    if (data.type === 'dest') {
      clearTimeout(unlockTimer);
      clearTurnstile();
      ui?.hideCountdown();
      note(COPY.opening.lead, COPY.opening.detail);
      ui?.setStatus('');
      location.replace(data.dest);
      return;
    }
    if (data.type === 'err') {
      clearTimeout(unlockTimer);
      clearTurnstile();
      ui?.hideCountdown();
      ui?.setStatus('');
      ui?.setError(errCopy(data.message));
    }
  };

  window.addEventListener('message', (ev: MessageEvent) => {
    const data = ev.data as LootHookMessage;
    if (data?.source !== LOOT_MSG_SOURCE || !data.type) return;

    if (data.type === 'captcha-token') {
      if (!captchaUrl) return;
      chrome.runtime.sendMessage(
        { type: MSG_LOOT_CAPTCHA_VERIFY, url: captchaUrl, token: data.token },
        (res: { ok?: boolean } | undefined) => {
          if (!res?.ok) {
            ui?.setError(errCopy('captcha verify'));
            refreshCountdown();
            return;
          }
          ui?.setError(null);
          refreshCountdown();
          window.postMessage({ source: LOOT_MSG_SOURCE, type: 'captcha-ok' }, location.origin);
        },
      );
      return;
    }

    if (ev.source !== window || ev.origin !== location.origin) return;
    if (ui) apply(data);
    else pending.push(data);
  });

  ui = createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note: COPY.loading,
    status: '',
    countdownLabel: 'Remaining',
  });
  for (const msg of pending) apply(msg);
  chrome.runtime.sendMessage({ type: MSG_INJECT_LOOT });

  void canBypass('lootlabs').then((ok) => {
    if (!ok) {
      ui?.remove();
      ui = null;
      return;
    }
    countOnMessage(LOOT_MSG_SOURCE, 'dest');
  });
}
