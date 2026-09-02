import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { whenDomParsed } from '../../utils/domain-check';

const OVERLAY_ID = 'skip-wait-xdmovies-landing-overlay';
const BOOT_STYLE_ID = 'skip-wait-xdmovies-landing-boot';
const CTA_HREF =
  /href="(https:\/\/[^"]+)"[^>]*>[\s\S]{0,400}?Open\s+(?:Main\s+Site|XDMovies)/i;

const NOTE = {
  lead: 'Opening the main site.',
  detail: 'Skip Wait is taking you to the live XDMovies destination.',
} as const;

let ui: FullPageOverlay | null = null;

function bootOverlayLock(): void {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BOOT_STYLE_ID;
  style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head || document.documentElement).appendChild(style);
}

function mountUi(status: string): FullPageOverlay {
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

function destinationFromCta(): string | null {
  const href = document.documentElement.innerHTML.match(CTA_HREF)?.[1];
  if (!href) return null;
  try {
    const u = new URL(href);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    u.hash = '';
    return u.toString();
  } catch {
    return null;
  }
}

function openMainSite(): void {
  const overlay = mountUi('Opening destination…');
  const dest = destinationFromCta();
  if (!dest) {
    overlay.setError('Could not find the main site link on this page.');
    return;
  }
  overlay.setStatus('Opening destination…');
  recordBypassSuccess();
  location.replace(dest);
}

export function initXdmoviesLandingPageMed(): void {
  const allowed = canBypass('xdmovies');
  whenDomParsed(() => {
    if (!destinationFromCta()) return;
    void allowed.then((ok) => {
      if (!ok) return;
      bootOverlayLock();
      openMainSite();
    });
  });
}
