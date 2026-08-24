import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { overlayActiveClass } from '../../injected-ui/overlay-styles';
import type { ResolveProgress } from './resolve';

const ID = 'skip-wait-alpharede';

const stripDots = (text: string): string => text.replace(/\.+$/, '');

export const createOverlay = () => {
  let ui: FullPageOverlay | null = null;
  let pulseTimer: number | null = null;
  let pulseDots = 0;
  let baseStatus = '';
  let baseLead = '';
  let baseDetail = '';

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
    if (!ui) return;
    pulseDots = (pulseDots + 1) % 3;
    ui.setStatus(pulsedStatus());
  };

  const syncPulse = (): void => {
    pulseDots = 0;
    if (!ui) return;
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
      countdownLabel: 'Your link opens in',
    });
    return ui;
  };

  return {
    progress: (p: ResolveProgress) => {
      baseStatus = stripDots(p.status);
      baseLead = p.lead;
      baseDetail = p.detail;
      ensure();
      syncPulse();
      return ui!;
    },
    setError: (status: string) => {
      stopPulse();
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
