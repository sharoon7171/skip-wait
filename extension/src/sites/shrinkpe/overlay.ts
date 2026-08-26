import {
  createFullPageOverlay,
  type FullPageOverlay,
  type FullPageOverlayNote,
} from '../../injected-ui/full-page-overlay';
import { overlayActiveClass } from '../../injected-ui/overlay-styles';

export const OVERLAY_ID = 'skip-wait-shrinkpe';

const INITIAL_STATUS = 'Preparing your link';
const COUNTDOWN_STATUS = 'Waiting out the unlock timer';

const NOTE = {
  lead: 'Skip Wait is unlocking your link.',
  detail: 'Sit tight — Skip Wait clears the ads and wait, then opens your destination automatically.',
} as const;

const CAPTCHA_NOTE = {
  lead: 'Verify you are human.',
  detail: 'Complete the check below. Skip Wait continues automatically once it passes.',
} as const;

const CAPTCHA_STATUS = 'Waiting for the human check…';

export type ShrinkpeOverlay = {
  turnstileMount: () => HTMLElement;
  captcha: () => void;
  progress: () => void;
  setPhase: (text: string) => void;
  startCountdown: (endTs: number) => void;
  hideCountdown: () => void;
  setError: (status: string) => void;
};

export const createOverlay = (): ShrinkpeOverlay => {
  let ui: FullPageOverlay | null = null;
  let pulseTimer: number | null = null;
  let pulseDots = 0;
  let baseStatus = INITIAL_STATUS;
  let locked = false;

  const stopPulse = (): void => {
    if (pulseTimer != null) clearInterval(pulseTimer);
    pulseTimer = null;
  };

  const liveStatus = (): string => `${baseStatus}${'.'.repeat(pulseDots + 1)}`;

  const paint = (note: FullPageOverlayNote, status: string): FullPageOverlay => {
    document.documentElement.classList.add(overlayActiveClass(OVERLAY_ID));
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
      countdownLabel: 'Get Link ready in',
    });
    return ui;
  };

  const startPulse = (): void => {
    if (locked || pulseTimer != null) return;
    pulseTimer = window.setInterval(() => {
      if (locked || !ui) return;
      pulseDots = (pulseDots + 1) % 3;
      ui.setStatus(liveStatus());
    }, 450);
  };

  const showStatus = (text: string): void => {
    locked = false;
    baseStatus = text;
    pulseDots = 0;
    paint(NOTE, liveStatus());
    startPulse();
  };

  return {
    turnstileMount: () => paint(CAPTCHA_NOTE, CAPTCHA_STATUS).turnstileMount,
    captcha: () => {
      locked = true;
      stopPulse();
      paint(CAPTCHA_NOTE, CAPTCHA_STATUS);
    },
    progress: () => showStatus(INITIAL_STATUS),
    setPhase: (text) => showStatus(text),
    startCountdown: (endTs) => {
      locked = true;
      stopPulse();
      paint(NOTE, COUNTDOWN_STATUS);
      ui?.startCountdown(endTs);
    },
    hideCountdown: () => {
      ui?.hideCountdown();
      showStatus(baseStatus);
    },
    setError: (status) => {
      locked = true;
      stopPulse();
      ui?.hideCountdown();
      paint({ lead: 'Skip Wait hit a snag.', detail: 'Reload this link and try again.' }, status);
    },
  };
};
