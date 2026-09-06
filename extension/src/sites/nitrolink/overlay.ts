import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { overlayActiveClass } from '../../injected-ui/overlay-styles';
import type { NitrolinkProgress } from './hosts';

const ID = 'skip-wait-nitrolink';

const stripDots = (text: string): string => text.replace(/\.+$/, '');

export const createOverlay = () => {
  let ui: FullPageOverlay | null = null;
  let pulseTimer: number | null = null;
  let pulseDots = 0;
  let baseStatus = '';
  let baseLead = '';
  let baseDetail = '';
  let counting = false;

  const stopPulse = (): void => {
    if (pulseTimer == null) return;
    clearInterval(pulseTimer);
    pulseTimer = null;
  };

  const pulsedStatus = (): string => `${baseStatus}${'.'.repeat(pulseDots + 1)}`;

  const ensure = (): FullPageOverlay => {
    document.documentElement.classList.add(overlayActiveClass(ID));
    if (ui) return ui;
    ui = createFullPageOverlay({
      id: ID,
      brand: 'Skip Wait',
      note: { lead: baseLead, detail: baseDetail },
      status: pulsedStatus(),
      countdownLabel: 'Your link opens in',
    });
    return ui;
  };

  const paint = (): FullPageOverlay => {
    const overlay = ensure();
    overlay.setNote({ lead: baseLead, detail: baseDetail });
    overlay.setStatus(counting ? baseStatus : pulsedStatus());
    return overlay;
  };

  const syncPulse = (): void => {
    if (counting) return;
    pulseDots = 0;
    paint();
    if (pulseTimer != null) return;
    pulseTimer = window.setInterval(() => {
      if (counting || !ui) return;
      pulseDots = (pulseDots + 1) % 3;
      ui.setStatus(pulsedStatus());
    }, 450);
  };

  return {
    progress: (p: NitrolinkProgress) => {
      baseLead = p.lead;
      baseDetail = p.detail;
      baseStatus = stripDots(p.status);
      if (typeof p.waitEndTs === 'number' && p.waitEndTs > Date.now()) {
        counting = true;
        stopPulse();
        const overlay = paint();
        overlay.startCountdown(p.waitEndTs);
        return overlay;
      }
      counting = false;
      ui?.hideCountdown();
      syncPulse();
      return ui!;
    },
    setError: (status: string) => {
      counting = true;
      stopPulse();
      ui?.hideCountdown();
      const overlay = ensure();
      overlay.setNote({
        lead: 'Something went wrong.',
        detail: 'Reload this page and try again.',
      });
      overlay.setStatus(status);
      return overlay;
    },
  };
};
