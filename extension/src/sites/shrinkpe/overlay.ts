import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { overlayActiveClass } from '../../injected-ui/overlay-styles';
import type { ShrinkpeProgress } from './hosts';

const ID = 'skip-wait-shrinkpe';

const stripDots = (text: string): string => text.replace(/\.+$/, '');

export const createOverlay = () => {
  let ui: FullPageOverlay | null = null;
  let pulseTimer: number | null = null;
  let pulseDots = 0;
  let baseStatus = '';
  let baseLead = 'Hang tight — unlocking your link.';
  let baseDetail = "You don't need to tap anything on the page.";
  let onCountdown = false;

  const stopPulse = (): void => {
    if (pulseTimer == null) return;
    clearInterval(pulseTimer);
    pulseTimer = null;
  };

  const pulsedStatus = (): string => `${baseStatus}${'.'.repeat(pulseDots + 1)}`;

  const paintNote = (): void => {
    ui?.setNote({ lead: baseLead, detail: baseDetail });
  };

  const tick = (): void => {
    if (!ui || onCountdown) return;
    pulseDots = (pulseDots + 1) % 3;
    ui.setStatus(pulsedStatus());
  };

  const syncPulse = (): void => {
    pulseDots = 0;
    if (!ui || onCountdown) return;
    paintNote();
    ui.setStatus(pulsedStatus());
    if (pulseTimer != null) return;
    pulseTimer = window.setInterval(tick, 450);
  };

  const ensure = (): FullPageOverlay => {
    document.documentElement.classList.add(overlayActiveClass(ID));
    if (ui) return ui;
    ui = createFullPageOverlay({
      id: ID,
      brand: 'Skip Wait',
      note: { lead: baseLead, detail: baseDetail },
      status: pulsedStatus(),
      countdownLabel: 'Get Link ready in',
    });
    return ui;
  };

  return {
    progress: (p: ShrinkpeProgress) => {
      onCountdown = false;
      ui?.hideCountdown();
      baseStatus = stripDots(p.status);
      baseLead = p.lead;
      baseDetail = p.detail;
      ensure();
      syncPulse();
      return ui!;
    },
    waitCountdown: (p: ShrinkpeProgress, sec: number) => {
      onCountdown = true;
      stopPulse();
      baseStatus = stripDots(p.status);
      baseLead = p.lead;
      baseDetail = p.detail;
      const overlay = ensure();
      paintNote();
      overlay.setStatus(baseStatus);
      overlay.startCountdown(Date.now() + sec * 1000);
      return overlay;
    },
    finishWait: () => {
      onCountdown = false;
      ui?.hideCountdown();
    },
    setError: (status: string) => {
      onCountdown = false;
      stopPulse();
      ui?.hideCountdown();
      baseStatus = status;
      baseLead = 'Something went wrong.';
      baseDetail = 'Reload the short link and try again.';
      const overlay = ensure();
      overlay.setStatus(status);
      overlay.setNote({ lead: baseLead, detail: baseDetail });
      overlay.setError(status);
      return overlay;
    },
  };
};
