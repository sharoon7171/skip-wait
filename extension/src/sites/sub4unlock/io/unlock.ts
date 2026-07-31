import { createFullPageOverlay, type FullPageOverlay } from '../../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../../injected-ui/overlay-styles';
import { isAllowedHost, whenDomParsed } from '../../../utils/domain-check';
import { SUB4UNLOCK_IO_HOSTS } from './hosts';

const OVERLAY_ID = 'skip-wait-sub4unlock-io-overlay';
const BOOT_STYLE_ID = 'skip-wait-sub4unlock-io-boot';
const GET_LINK = 'a.get-link[href]';

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;

const bootOverlayLock = (): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BOOT_STYLE_ID;
  style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head || document.documentElement).appendChild(style);
};

const mountUi = (status = 'Getting things ready…'): FullPageOverlay => {
  bootOverlayLock();
  if (ui) {
    ui.setNote(NOTE);
    ui.setStatus(status);
    ui.setError(null);
    return ui;
  }
  ui = createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note: NOTE,
    status,
  });
  return ui;
};

const destination = (): string | null => {
  const href = document.querySelector<HTMLAnchorElement>(GET_LINK)?.href?.trim() ?? '';
  return /^https?:\/\//i.test(href) ? href : null;
};

const unlock = (): void => {
  const url = destination();
  if (!url) return;
  const overlay = mountUi('Unlocking your link…');
  overlay.setStatus('Opening your link…');
  location.replace(url);
};

export function initSub4unlockIoUnlock(): void {
  if (window !== window.top) return;
  if (!isAllowedHost(SUB4UNLOCK_IO_HOSTS)) return;
  whenDomParsed(() => {
    if (!destination()) return;
    bootOverlayLock();
    mountUi('Getting things ready…');
    unlock();
  });
}
