import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';

const OVERLAY_ID = 'skip-wait-sid-mediator-overlay';
const BOOT_STYLE_ID = 'skip-wait-sid-mediator-boot';

export const NOTE = {
  lead: 'Hang tight — decoding your link.',
  detail: 'Skip Wait is decrypting the destination for you.',
} as const;

export const NOTE_OPEN = {
  lead: 'Destination unlocked.',
  detail: 'Opening your link now — no timers or continue taps.',
} as const;

let ui: FullPageOverlay | null = null;

const boot = (): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BOOT_STYLE_ID;
  style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head || document.documentElement).appendChild(style);
};

export const mountOverlay = (
  status: string,
  note: typeof NOTE | typeof NOTE_OPEN = NOTE,
): FullPageOverlay => {
  boot();
  if (ui) {
    ui.setNote(note);
    ui.setStatus(status);
    ui.setError(null);
    return ui;
  }
  ui = createFullPageOverlay({ id: OVERLAY_ID, brand: 'Skip Wait', note, status });
  return ui;
};
