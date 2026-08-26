import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { overlayActiveClass } from '../../injected-ui/overlay-styles';

const ID = 'skip-wait-unlocktoearn';

const ROTATE = [
  'Starting UnlockToEarn',
  'Clearing unlock steps',
  'Resolving your destination',
  'Opening your destination',
] as const;

const NOTE = {
  lead: 'UnlockToEarn is finishing.',
  detail: 'Skip Wait stays on UnlockToEarn and opens your destination when ready.',
} as const;

export const createOverlay = () => {
  let ui: FullPageOverlay | null = null;
  let pulseTimer: number | null = null;
  let rotateTimer: number | null = null;
  let pulseDots = 0;
  let rotateIdx = 0;
  let locked = false;
  let freezeStatus = '';

  const stopAll = (): void => {
    if (pulseTimer != null) {
      clearInterval(pulseTimer);
      pulseTimer = null;
    }
    if (rotateTimer != null) {
      clearInterval(rotateTimer);
      rotateTimer = null;
    }
  };

  const liveStatus = (): string => `${ROTATE[rotateIdx]!}${'.'.repeat(pulseDots + 1)}`;

  const paint = (lead?: string, detail?: string): FullPageOverlay => {
    document.documentElement.classList.add(overlayActiveClass(ID));
    const note = {
      lead: lead ?? NOTE.lead,
      detail: detail ?? NOTE.detail,
    };
    const status = locked ? freezeStatus : liveStatus();
    if (ui) {
      ui.setNote(note);
      ui.setStatus(status);
      ui.setError(null);
      return ui;
    }
    ui = createFullPageOverlay({
      id: ID,
      brand: 'Skip Wait',
      note,
      status,
      countdownLabel: 'Ready in',
    });
    return ui;
  };

  const ensureDynamic = (): void => {
    if (locked) return;
    if (pulseTimer == null) {
      pulseTimer = window.setInterval(() => {
        if (locked || !ui) return;
        pulseDots = (pulseDots + 1) % 3;
        ui.setStatus(liveStatus());
      }, 450);
    }
    if (rotateTimer == null) {
      rotateTimer = window.setInterval(() => {
        if (locked || !ui) return;
        if (rotateIdx >= ROTATE.length - 1) {
          if (rotateTimer != null) {
            clearInterval(rotateTimer);
            rotateTimer = null;
          }
          return;
        }
        rotateIdx += 1;
        pulseDots = 0;
        ui.setStatus(liveStatus());
      }, 1800);
    }
  };

  return {
    id: ID,
    progress: () => {
      locked = false;
      freezeStatus = '';
      rotateIdx = 0;
      pulseDots = 0;
      const overlay = paint();
      ensureDynamic();
      return overlay;
    },
    captcha: (status = 'Waiting for verification') => {
      locked = true;
      stopAll();
      freezeStatus = status;
      return paint(
        'UnlockToEarn needs a quick check.',
        'Complete the box below. Skip Wait continues on UnlockToEarn when it’s done.',
      );
    },
    setError: (status: string) => {
      locked = true;
      stopAll();
      freezeStatus = status;
      const overlay = paint('UnlockToEarn hit a snag.', 'Reload this UnlockToEarn link and try again.');
      overlay.setStatus(status);
      overlay.setError(status);
      return overlay;
    },
  };
};
