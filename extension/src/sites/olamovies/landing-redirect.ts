import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';

const OVERLAY_ID = 'skip-wait-olamovies-landing-overlay';
const BOOT_STYLE_ID = 'skip-wait-olamovies-landing-boot';

const NOTE = {
  lead: 'Opening the main site.',
  detail: 'Skip Wait is taking you to the live OlaMovies catalog.',
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

async function resolveMainSite(): Promise<string> {
  const r = await fetch(`${location.origin}/current.php`, {
    cache: 'no-store',
    credentials: 'same-origin',
  });
  if (!r.ok) throw new Error('olamovies current.php');
  const url = (await r.text()).trim();
  if (!/^https?:\/\//i.test(url)) throw new Error('olamovies current.php body');
  const dest = new URL(url);
  const s = new URLSearchParams(location.search).get('s');
  if (s) dest.searchParams.set('s', s);
  return dest.href;
}

async function openMainSite(): Promise<void> {
  const overlay = mountUi('Resolving main site…');
  const href = await resolveMainSite();
  overlay.setStatus('Opening destination…');
  location.replace(href);
}

export function initOlamoviesLandingRedirect(): void {
  void canBypass('olamovies-landing').then((ok) => {
    if (!ok) return;
    bootOverlayLock();
    mountUi('Getting things ready…');
    void openMainSite().catch(() => {
      mountUi('Resolving main site…').setError(
        'Could not resolve the OlaMovies main site. Reload and try again.',
      );
    });
  });
}
