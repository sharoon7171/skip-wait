import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { whenDomParsed } from '../../utils/domain-check';

const OVERLAY_ID = 'skip-wait-vegamovies-entry-overlay';
const BOOT_STYLE_ID = 'skip-wait-vegamovies-entry-boot';
const GATE_ROUTE = /\bhref\s*=\s*["'](\/\?re=[^"']+)["']/;
const NOTE = {
  lead: 'Opening the VegaMovies catalog.',
  detail: 'Skip Wait is bypassing the landing page.',
} as const;

let ui: FullPageOverlay | null = null;

function mountOverlay(status: string): FullPageOverlay {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (!document.getElementById(BOOT_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = BOOT_STYLE_ID;
    style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
    (document.head ?? document.documentElement).appendChild(style);
  }
  if (ui) {
    ui.setStatus(status);
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

function destination(): string | null {
  for (const script of document.querySelectorAll('script:not([src])')) {
    const route = script.textContent?.match(GATE_ROUTE)?.[1];
    if (!route) continue;
    const url = new URL(route, location.href);
    if (url.origin === location.origin) return url.href;
  }
  return null;
}

export function initVegamoviesEntryRedirect(): void {
  if (window !== window.top) return;
  const allowed = canBypass('vegamovies');
  whenDomParsed(() => {
    const href = destination();
    if (!href) return;
    void allowed.then((ok) => {
      if (!ok) return;
      mountOverlay('Opening the live catalog…');
      recordBypassSuccess();
      location.replace(href);
    });
  });
}
