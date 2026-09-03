import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { ERROR_STATUS, MSG_PROGRESS, MSG_RESOLVE, SITE, isAliasPage } from './hosts';
import { createOverlay } from './overlay';

const ui = createOverlay();
let started = false;

const pageReady = (): boolean => {
  const h = document.documentElement.innerHTML;
  return (
    h.includes('ad_form_data') ||
    (h.includes('name="token"') && h.includes('name="alias"') && h.includes('name="visit_token"'))
  );
};

const requestDestination = (unlockUrl: string, pageHtml: string): Promise<string> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: MSG_RESOLVE, unlockUrl, pageHtml }, (res?: { ok?: boolean; dest?: string }) => {
      if (chrome.runtime.lastError || !res?.ok || !res.dest) reject(new Error('resolve'));
      else resolve(res.dest);
    });
  });

const run = async (): Promise<void> => {
  if (started || !pageReady()) return;
  started = true;
  const unlockUrl = location.href;

  ui.progress({
    lead: 'Hang tight — unlocking your link.',
    detail: "You don't need to tap anything on the page.",
    status: 'Starting unlock',
  });

  const onProgress = (msg: {
    type?: string;
    unlockUrl?: string;
    lead?: string;
    detail?: string;
    status?: string;
    countdownSec?: number;
  }): void => {
    if (msg.type !== MSG_PROGRESS || msg.unlockUrl !== unlockUrl) return;
    if (!msg.lead || !msg.detail || !msg.status) return;
    if (msg.countdownSec && msg.countdownSec > 0) {
      ui.waitCountdown({ lead: msg.lead, detail: msg.detail, status: msg.status }, msg.countdownSec);
      return;
    }
    ui.progress({ lead: msg.lead, detail: msg.detail, status: msg.status });
  };
  chrome.runtime.onMessage.addListener(onProgress);

  try {
    const dest = await requestDestination(unlockUrl, document.documentElement.innerHTML);
    ui.finishWait();
    ui.progress({
      lead: 'Almost there.',
      detail: 'Opening your destination now.',
      status: 'Opening your destination',
    });
    recordBypassSuccess();
    location.replace(dest);
  } catch {
    ui.setError(ERROR_STATUS);
  } finally {
    chrome.runtime.onMessage.removeListener(onProgress);
  }
};

export const initShrinkpe = (): void => {
  if (window !== window.top || !isAliasPage()) return;
  void canBypass(SITE).then((ok) => {
    if (!ok) return;
    void run();
    const mo = new MutationObserver(() => void run());
    mo.observe(document.documentElement, { childList: true, subtree: true });
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => void run(), true);
    }
    window.addEventListener('load', () => void run(), true);
  });
};
