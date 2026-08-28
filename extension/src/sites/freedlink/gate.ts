import { canBypass } from '../../gate';
import { pinSiteWidgetOverOverlay } from '../../injected-ui/pin-site-widget';
import { whenDomParsed } from '../../utils/domain-check';
import { FREEDLINK_FILE_RE, HCAPTCHA_IFRAMES } from './hosts';
import { createOverlay } from './overlay';
import {
  captchaToken,
  cooldownFromPage,
  detectPageKind,
  FreedlinkError,
  freeForm,
  missingFromPage,
  requestFreeDownload,
  resetCaptcha,
  revealFreeCaptcha,
  type PageKind,
} from './resolve';

const OVERLAY_ID = 'skip-wait-freedlink-overlay';
const PIN_ID = 'skip-wait-freedlink-hcaptcha-pin';
const WIDGET_ID = 'skip-wait-freedlink-hcaptcha';
const ACTION = 'Direct Download · Skip Wait — No Timer';
const DETECT_MS = 12_000;

const COPY = {
  checking: 'Checking this file',
  reading: 'Reading your file',
  missing: 'File not found',
  cooldownLead: 'Download cooldown',
  cooldownDetail: 'This site requires a wait before the next free download.',
  cooldownStatus: 'Waiting for the cooldown to end',
  captchaLead: "Confirm you're human.",
  captchaDetail: 'Complete the check below. Download unlocks automatically when it succeeds.',
  captchaStatus: 'Waiting for captcha',
  captchaRejected: 'Captcha rejected',
  unlocking: 'Getting your download',
  ready: 'Ready — tap Direct Download when you want the file',
  failed: 'Download unlock failed',
  unknownLead: 'Could not identify this page',
  unknownError: 'No file page, free download form, or cooldown message was found.',
} as const;

let ui: ReturnType<typeof createOverlay> | null = null;
let started = false;

const isFileUrl = (): boolean => !!FREEDLINK_FILE_RE.exec(location.pathname);

const fileNameFromPath = (): string => {
  const leaf = location.pathname.split('/').pop() ?? '';
  try {
    return decodeURIComponent(leaf.replace(/\.html?$/i, ''));
  } catch {
    return leaf.replace(/\.html?$/i, '');
  }
};

const fileMeta = (): { name: string; size: string } => ({
  name: fileNameFromPath(),
  size: document.querySelector('.download-page .badge')?.textContent?.replace(/\s+/g, ' ').trim() ?? '',
});

const waitForKind = (): Promise<PageKind> =>
  new Promise((resolve) => {
    const hit = detectPageKind();
    if (hit !== 'unknown') {
      resolve(hit);
      return;
    }
    const mo = new MutationObserver(() => {
      const next = detectPageKind();
      if (next === 'unknown') return;
      mo.disconnect();
      clearTimeout(tid);
      resolve(next);
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
    const tid = window.setTimeout(() => {
      mo.disconnect();
      resolve(detectPageKind());
    }, DETECT_MS);
  });

const showMissing = (): void => {
  const miss = missingFromPage();
  ui!.setError(
    miss?.title || COPY.missing,
    miss?.detail || 'The file you were looking for could not be found, sorry for any inconvenience',
    miss?.title || COPY.missing,
  );
};

const showCooldown = (seconds: number, message: string): void => {
  ui!.hold({
    status: COPY.cooldownStatus,
    ...fileMeta(),
    lead: COPY.cooldownLead,
    detail: COPY.cooldownDetail,
    error: message,
  });
  ui!.startCountdown(Date.now() + seconds * 1000);
  window.setTimeout(() => location.reload(), seconds * 1000 + 500);
};

const runFree = async (): Promise<void> => {
  const form = freeForm();
  const meta = fileMeta();
  ui!.progress({ status: COPY.reading, ...meta });

  if (!form) {
    ui!.setError(COPY.failed, 'Free download form (FREE1) was not found.');
    return;
  }

  const widget = revealFreeCaptcha(form);
  if (!widget) {
    ui!.setError(COPY.failed, 'Free hCaptcha widget was not found.');
    return;
  }

  const panel = ui!.hold({
    status: COPY.captchaStatus,
    ...meta,
    lead: COPY.captchaLead,
    detail: COPY.captchaDetail,
  });

  let stopPin: (() => void) | null = null;
  let done = false;
  let submitting = false;

  const pin = (): void => {
    if (stopPin) return;
    if (!widget.id) widget.id = WIDGET_ID;
    stopPin = pinSiteWidgetOverOverlay({
      overlayId: OVERLAY_ID,
      mount: panel.turnstileMount,
      widgetId: widget.id,
      styleId: PIN_ID,
      alsoVisibleSelectors: HCAPTCHA_IFRAMES,
    });
  };

  const submit = async (): Promise<void> => {
    if (submitting || done) return;
    submitting = true;
    stopPin?.();
    stopPin = null;
    ui!.progress({ status: COPY.unlocking, ...fileMeta() });
    try {
      const url = await requestFreeDownload(form);
      done = true;
      ui!.setReady({ status: COPY.ready, ...fileMeta(), url, action: ACTION });
    } catch (err) {
      submitting = false;
      if (err instanceof FreedlinkError && err.code === 'cooldown' && err.cooldownSeconds) {
        done = true;
        showCooldown(err.cooldownSeconds, err.message);
        return;
      }
      if (err instanceof FreedlinkError && err.code === 'captcha') {
        resetCaptcha(form);
        ui!.hold({
          status: COPY.captchaRejected,
          ...fileMeta(),
          lead: COPY.captchaLead,
          detail: COPY.captchaDetail,
          error: err.message,
        });
        stopPin = null;
        pin();
        requestAnimationFrame(tick);
        return;
      }
      done = true;
      ui!.setError(COPY.failed, err instanceof FreedlinkError ? err.message : 'Could not get a download link.');
    }
  };

  const tick = (): void => {
    if (done || submitting) return;
    pin();
    if (captchaToken(form)) {
      void submit();
      return;
    }
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

export function initFreedlinkGate(): void {
  if (window !== window.top || started || !isFileUrl()) return;
  void canBypass('freedlink').then((ok) => {
    if (!ok || started) return;
    started = true;
    ui = createOverlay();
    ui.progress({ status: COPY.checking });

    whenDomParsed(() => {
      ui!.progress({ status: COPY.reading, ...fileMeta() });
      void waitForKind().then((kind) => {
        if (kind === 'missing') {
          showMissing();
          return;
        }
        if (kind === 'cooldown') {
          const cool = cooldownFromPage();
          if (cool) {
            showCooldown(cool.seconds, cool.message);
            return;
          }
        }
        if (kind === 'ready') {
          void runFree();
          return;
        }
        ui!.setError(COPY.unknownLead, COPY.unknownError, COPY.unknownLead);
      });
    });
  });
}
