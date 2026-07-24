import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { hostnameMatches, isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { ADFOCUS_HOSTS } from './hosts';

const OVERLAY_ID = 'skip-wait-adfocus-overlay';
const BOOT_STYLE_ID = 'skip-wait-adfocus-boot';
const CLICK_URL_RE = /var\s+click_url\s*=\s*"([^"]+)"/;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to wait or watch ads.",
} as const;

let ui: FullPageOverlay | null = null;

function decodeHtml(s: string): string {
  const el = document.createElement('textarea');
  el.innerHTML = s;
  return el.value;
}

function destinationFromPage(): string | null {
  const fromJs = CLICK_URL_RE.exec(document.documentElement.innerHTML)?.[1];
  const raw =
    fromJs ??
    document.querySelector<HTMLAnchorElement>('#showSkip a.skip, #showSkip a')?.getAttribute('href');
  if (!raw) return null;
  const href = decodeHtml(raw).trim();
  if (!/^https?:\/\//i.test(href)) return null;
  try {
    const dest = new URL(href);
    if (hostnameMatches(dest.hostname, ADFOCUS_HOSTS)) return null;
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
  const dest = destinationFromPage();
  if (!dest) {
    overlay.setError('Adfoc.us destination not found on this page.');
    return;
  }
  overlay.setStatus('Opening your link…');
  location.replace(dest);
}

export function initAdfocusRedirect(): void {
  if (!isAllowedHost(ADFOCUS_HOSTS)) return;
  bootOverlayLock();
  mountUi('Getting things ready…');
  whenDomParsed(redirect);
}
