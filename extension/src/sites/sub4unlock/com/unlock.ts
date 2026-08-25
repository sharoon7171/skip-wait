import { canBypass } from '../../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../../injected-ui/overlay-styles';
import { whenDomParsed } from '../../../utils/domain-check';
import { sub4unlockComLinkId, sub4unlockComPage, type Sub4unlockComPage } from './match';

const OVERLAY_ID = 'skip-wait-sub4unlock-com-overlay';
const BOOT_STYLE_ID = 'skip-wait-sub4unlock-com-boot';
const FILE_RE = /\bvar\s+file\s*=\s*"([^"]+)"/;
const OPEN_RE = /function\s+fileunlock\s*\(\)\s*\{[\s\S]*?window\.open\(\s*"([^"]+)"/;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;

const httpUrl = (u: string | undefined): string | null =>
  u && /^https?:\/\//i.test(u) ? u : null;

const destination = (html: string, page: Extract<Sub4unlockComPage, 'lp' | 'lpd'>): string | null => {
  if (page === 'lp') return httpUrl(html.match(FILE_RE)?.[1]?.trim());
  return httpUrl(html.match(OPEN_RE)?.[1]?.trim());
};

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

const unlock = (): void => {
  const page = sub4unlockComPage();
  const id = sub4unlockComLinkId();
  if (!page || !id) return;

  const overlay = mountUi('Unlocking your link…');

  if (page === 'landing' || page === 'loader') {
    overlay.setStatus('Opening your link…');
    location.replace(`${location.origin}/LP/LP.php?id=${encodeURIComponent(id)}`);
    return;
  }

  const url = destination(document.documentElement.innerHTML, page);
  if (!url) {
    overlay.setError('Destination not found on this page.');
    return;
  }
  overlay.setStatus('Opening your link…');
  location.replace(url);
};

export function initSub4unlockComUnlock(): void {
  if (window !== window.top || !sub4unlockComPage()) return;
  void canBypass('sub4unlock-com').then((ok) => {
    if (!ok) return;
    bootOverlayLock();
    mountUi('Getting things ready…');
    whenDomParsed(unlock);
  });
}
