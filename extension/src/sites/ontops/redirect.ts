import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { whenDomParsed } from '../../utils/domain-check';
import { ontopsStPath } from './hosts';

const OVERLAY_ID = 'skip-wait-ontops-overlay';
const BOOT_STYLE_ID = 'skip-wait-ontops-boot';

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to wait on this hop.",
} as const;

let ui: FullPageOverlay | null = null;
let started = false;

function destinationFromQuery(href = location.href): string | null {
  try {
    const raw = new URL(href).searchParams.get('url')?.trim();
    if (!raw || raw.toLowerCase().startsWith('javascript:')) return null;
    const dest = new URL(raw);
    if (!/^https?:$/i.test(dest.protocol)) return null;
    return dest.href;
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
  const dest = destinationFromQuery();
  if (!dest) {
    overlay.setError('Ontops destination not found on this link.');
    return;
  }
  overlay.setStatus('Opening your link…');
  recordBypassSuccess();
  location.replace(dest);
}

function kick(): void {
  if (started || !ontopsStPath()) return;
  started = true;
  redirect();
}

export function initOntopsRedirect(): void {
  if (window !== window.top || !ontopsStPath()) return;
  void canBypass('ontops').then((ok) => {
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
