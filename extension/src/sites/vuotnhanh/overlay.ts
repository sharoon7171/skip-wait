import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { overlayActiveClass } from '../../injected-ui/overlay-styles';
import type { ResolveProgress } from './resolve';

const ID = 'skip-wait-vuotnhanh';

const stripDots = (text: string): string => text.replace(/\.+$/, '');

export const spoofVisibility = (): void => {
  chrome.runtime.sendMessage({ type: 'INJECT_VISIBILITY_SPOOF' }).catch(() => {});
};

export const createOverlay = () => {
  let ui: FullPageOverlay | null = null;
  let pulseTimer: number | null = null;
  let pulseDots = 0;
  let status = '';
  let lead = '';
  let detail = '';

  const stopPulse = (): void => {
    if (pulseTimer == null) return;
    clearInterval(pulseTimer);
    pulseTimer = null;
  };

  const label = (): string => `${status}${'.'.repeat(pulseDots + 1)}`;

  const ensure = (): FullPageOverlay => {
    document.documentElement.classList.add(overlayActiveClass(ID));
    if (ui) return ui;
    ui = createFullPageOverlay({
      id: ID,
      brand: 'Skip Wait',
      note: { lead, detail },
      status: label(),
      countdownLabel: 'Your link opens in',
    });
    return ui;
  };

  const pulse = (): void => {
    pulseDots = 0;
    const overlay = ensure();
    overlay.setNote({ lead, detail });
    overlay.setStatus(label());
    overlay.setError(null);
    if (pulseTimer != null) return;
    pulseTimer = window.setInterval(() => {
      pulseDots = (pulseDots + 1) % 3;
      ui?.setStatus(label());
    }, 450);
  };

  return {
    progress: (p: ResolveProgress) => {
      status = stripDots(p.status);
      lead = p.lead;
      detail = p.detail;
      pulse();
    },
    setError: (message: string) => {
      stopPulse();
      status = message;
      lead = 'Something went wrong.';
      detail = 'Reload the short link and try again.';
      const overlay = ensure();
      overlay.setNote({ lead, detail });
      overlay.setStatus(message);
      overlay.setError(message);
    },
  };
};
