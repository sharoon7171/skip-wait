import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { whenDomParsed } from '../../utils/domain-check';
import { tumadamUnlockSlug } from './hosts';

const OVERLAY_ID = 'skip-wait-tumadam-overlay';
const BOOT_STYLE_ID = 'skip-wait-tumadam-boot';
const DEST_RE = /\bDEST\s*=\s*"([^"]*)"/;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to wait on the countdown.",
} as const;

let ui: FullPageOverlay | null = null;
let started = false;

function destinationFromPage(): string | null {
  const raw = DEST_RE.exec(document.documentElement.innerHTML)?.[1]?.trim();
  if (!raw || raw.toLowerCase().startsWith('javascript:')) return null;
  try {
    return new URL(raw, location.href).href;
  } catch {
    return null;
  }
}

function bootOverlayLock(): void {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BOOT_STYLE_ID;
  style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head || document.documentElement).appendChild(style);
}

function mountUi(status = 'Getting things ready…'): FullPageOverlay {
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
}

function redirect(): void {
  const overlay = mountUi('Unlocking your link…');
  const dest = destinationFromPage();
  if (!dest) {
    overlay.setError('Tumadam destination not found on this page.');
    return;
  }
  overlay.setStatus('Opening your link…');
  location.replace(dest);
}

function kick(): void {
  if (started || !tumadamUnlockSlug()) return;
  started = true;
  redirect();
}

export function initTumadamUnlock(): void {
  if (window !== window.top || !tumadamUnlockSlug()) return;
  void canBypass('tumadam').then((ok) => {
    if (!ok) return;
    bootOverlayLock();
    mountUi('Getting things ready…');
    whenDomParsed(kick);
    const mo = new MutationObserver(() => {
      kick();
      if (started) mo.disconnect();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  });
}
