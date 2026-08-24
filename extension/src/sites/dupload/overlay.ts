import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { overlayActiveClass } from '../../injected-ui/overlay-styles';

const ID = 'skip-wait-dupload';

export type DuploadProgress = { status: string; name?: string; size?: string };

const stripDots = (text: string): string => text.replace(/\.+$/, '').replace(/…+$/, '');

const fileNote = (name: string, size = '') =>
  size
    ? { lead: name || 'Hang tight — unlocking your file.', detail: size }
    : { lead: name || 'Hang tight — unlocking your file.' };

export const createOverlay = () => {
  let ui: FullPageOverlay | null = null;
  let pulseTimer: number | null = null;
  let pulseDots = 0;
  let baseStatus = '';
  let baseName = '';
  let baseSize = '';

  const stopPulse = (): void => {
    if (pulseTimer == null) return;
    clearInterval(pulseTimer);
    pulseTimer = null;
  };

  const pulsedStatus = (): string => `${baseStatus}${'.'.repeat(pulseDots + 1)}`;

  const paintNote = (): void => {
    ui?.setNote(fileNote(baseName, baseSize));
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
    ui.setError(null);
    if (pulseTimer != null) return;
    pulseTimer = window.setInterval(tick, 450);
  };

  const ensure = (): FullPageOverlay => {
    document.documentElement.classList.add(overlayActiveClass(ID));
    if (ui) return ui;
    ui = createFullPageOverlay({
      id: ID,
      brand: 'Skip Wait',
      note: fileNote(baseName, baseSize),
      status: pulsedStatus(),
    });
    return ui;
  };

  return {
    progress: (p: DuploadProgress) => {
      baseStatus = stripDots(p.status);
      if (p.name !== undefined) baseName = p.name;
      if (p.size !== undefined) baseSize = p.size;
      ensure();
      syncPulse();
      return ui!;
    },
    setReady: (p: DuploadProgress & { url: string; action: string }) => {
      stopPulse();
      baseStatus = stripDots(p.status);
      if (p.name !== undefined) baseName = p.name;
      if (p.size !== undefined) baseSize = p.size;
      const overlay = ensure();
      overlay.setNote(fileNote(baseName, baseSize));
      overlay.setStatus(baseStatus);
      overlay.setError(null);
      overlay.setAction(p.url, p.action);
      return overlay;
    },
    setError: (status: string, message: string, lead?: string) => {
      stopPulse();
      baseStatus = status;
      const overlay = ensure();
      overlay.setAction(null);
      overlay.setNote(lead ? { lead } : fileNote(baseName, baseSize));
      overlay.setStatus(status);
      overlay.setError(message);
      return overlay;
    },
  };
};
