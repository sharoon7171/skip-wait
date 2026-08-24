import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { overlayActiveClass } from '../../injected-ui/overlay-styles';
import type { SflProgress } from './hosts';

const ID = 'skip-wait-sfl';

const ROTATE = [
  'Binding session…',
  'Skipping gate waits…',
  'Verifying unlock…',
  'Fetching destination…',
] as const;

export const createOverlay = () => {
  let ui: FullPageOverlay | null = null;
  let rotateTimer: number | null = null;
  let rotateIdx = 0;
  let locked = false;

  const paint = (status: string, lead?: string, detail?: string): FullPageOverlay => {
    document.documentElement.classList.add(overlayActiveClass(ID));
    const note = {
      lead: lead ?? 'Hang tight — unlocking your link.',
      detail: detail ?? 'Skip Wait skips the mediator pages in the background.',
    };
    if (ui) {
      ui.setNote(note);
      ui.setStatus(status);
      return ui;
    }
    ui = createFullPageOverlay({
      id: ID,
      brand: 'Skip Wait',
      note,
      status,
      countdownLabel: 'Your link opens in',
    });
    return ui;
  };

  const stopRotate = (): void => {
    if (rotateTimer == null) return;
    clearInterval(rotateTimer);
    rotateTimer = null;
  };

  return {
    progress: (p: SflProgress) => {
      locked = false;
      if (rotateTimer == null) {
        rotateTimer = window.setInterval(() => {
          if (locked) return;
          rotateIdx = (rotateIdx + 1) % ROTATE.length;
          ui?.setStatus(ROTATE[rotateIdx]!);
        }, 1600);
      }
      return paint(p.status, p.lead, p.detail);
    },
    setError: (status: string) => {
      locked = true;
      stopRotate();
      const overlay = paint(status, 'Something went wrong.', 'Reload the short link and try again.');
      overlay.setError(status);
      return overlay;
    },
  };
};
