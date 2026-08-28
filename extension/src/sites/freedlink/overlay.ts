import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';

const ID = 'skip-wait-freedlink-overlay';
const BOOT_ID = 'skip-wait-freedlink-boot';

export type FreedlinkProgress = {
  status: string;
  name?: string;
  size?: string;
  lead?: string;
  detail?: string;
  error?: string | null;
};

const stripDots = (text: string): string => text.replace(/\.+$/, '').replace(/…+$/, '');

const fileNote = (name: string, size = '') =>
  size
    ? { lead: name || 'Unlocking your file.', detail: size }
    : { lead: name || 'Unlocking your file.' };

export const createOverlay = () => {
  let ui: FullPageOverlay | null = null;
  let pulseTimer: number | null = null;
  let pulseDots = 0;
  let baseStatus = '';
  let baseName = '';
  let baseSize = '';
  let noteLead = '';
  let noteDetail = '';

  const stopPulse = (): void => {
    if (pulseTimer == null) return;
    clearInterval(pulseTimer);
    pulseTimer = null;
  };

  const pulsedStatus = (): string => `${baseStatus}${'.'.repeat(pulseDots + 1)}`;

  const activeNote = () =>
    noteLead
      ? noteDetail
        ? { lead: noteLead, detail: noteDetail }
        : { lead: noteLead }
      : fileNote(baseName, baseSize);

  const paintNote = (): void => {
    ui?.setNote(activeNote());
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

  const applyMeta = (p: FreedlinkProgress): void => {
    baseStatus = stripDots(p.status);
    if (p.name !== undefined) baseName = p.name;
    if (p.size !== undefined) baseSize = p.size;
    if (p.lead !== undefined) noteLead = p.lead;
    if (p.detail !== undefined) noteDetail = p.detail;
  };

  const boot = (): void => {
    const active = overlayActiveClass(ID);
    document.documentElement.classList.add(active);
    if (document.getElementById(BOOT_ID)) return;
    const style = document.createElement('style');
    style.id = BOOT_ID;
    style.textContent = buildFullPageOverlayCss(ID, active);
    (document.head || document.documentElement).appendChild(style);
  };

  const ensure = (): FullPageOverlay => {
    boot();
    if (ui) return ui;
    ui = createFullPageOverlay({
      id: ID,
      brand: 'Skip Wait',
      note: activeNote(),
      status: pulsedStatus(),
      countdownLabel: 'Available in',
    });
    return ui;
  };

  return {
    progress: (p: FreedlinkProgress) => {
      noteLead = '';
      noteDetail = '';
      applyMeta(p);
      ensure();
      syncPulse();
      return ui!;
    },
    hold: (p: FreedlinkProgress) => {
      stopPulse();
      applyMeta(p);
      const overlay = ensure();
      paintNote();
      overlay.setStatus(baseStatus);
      overlay.setError(p.error === undefined ? null : p.error);
      overlay.setAction(null);
      overlay.hideCountdown();
      return overlay;
    },
    setReady: (p: FreedlinkProgress & { url: string; action: string }) => {
      stopPulse();
      noteLead = '';
      noteDetail = '';
      applyMeta(p);
      const overlay = ensure();
      overlay.setNote(fileNote(baseName, baseSize));
      overlay.setStatus(baseStatus);
      overlay.setError(null);
      overlay.hideCountdown();
      overlay.setAction(p.url, p.action);
      return overlay;
    },
    setError: (status: string, message: string, lead?: string) => {
      stopPulse();
      baseStatus = status;
      if (lead !== undefined) {
        noteLead = lead;
        noteDetail = '';
      }
      const overlay = ensure();
      overlay.setAction(null);
      overlay.hideCountdown();
      overlay.setNote(activeNote());
      overlay.setStatus(status);
      overlay.setError(message);
      return overlay;
    },
    startCountdown: (endTs: number) => {
      ensure().startCountdown(endTs);
    },
  };
};
