import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { isAllowedHost } from '../../utils/domain-check';
import { SHORTLINK_HOSTS } from './hosts';

const OVERLAY_ID = 'skip-wait-1shortlink-overlay';
const BOOT_STYLE_ID = 'skip-wait-1shortlink-boot';

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

const ENCRYPTED_PATH_RE = /^\/link-encrypted\//;

let ui: FullPageOverlay | null = null;
let done = false;
let cleanup: (() => void) | null = null;

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
    ui.setStatus(status);
    ui.setError(null);
    return ui;
  }
  ui = createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note: NOTE,
    status,
    countdownLabel: 'Your link opens in',
  });
  return ui;
};

function destinationUrl(): string | null {
  const btn = document.getElementById('redirect-link');
  if (!btn) return null;
  const href = btn.getAttribute('data-href')?.trim();
  return href && (href.startsWith('http://') || href.startsWith('https://')) ? href : null;
}

function finish(url: string): void {
  if (done) return;
  done = true;
  cleanup?.();
  const overlay = mountUi('Opening your link…');
  overlay.setNote({ lead: 'Your link is ready.', detail: 'Redirecting now…' });
  location.replace(url);
}

export function init1shortlink(): void {
  if (!isAllowedHost(SHORTLINK_HOSTS)) return;
  if (!ENCRYPTED_PATH_RE.test(location.pathname)) return;

  // Check immediately
  const url = destinationUrl();
  if (url) {
    mountUi('Your link is ready…');
    finish(url);
    return;
  }

  // Show overlay
  mountUi('Getting your link…');

  // Single MutationObserver watching only data-href changes
  const mo = new MutationObserver(() => {
    const u = destinationUrl();
    if (u) {
      mo.disconnect();
      finish(u);
    }
  });
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-href'],
    subtree: true,
  });

  cleanup = () => mo.disconnect();

  // Fallback on DOMContentLoaded
  if (document.readyState === 'loading') {
    const onReady = (): void => {
      const u = destinationUrl();
      if (u) finish(u);
    };
    document.addEventListener('DOMContentLoaded', onReady, true);
    // Wrap cleanup to also remove this listener
    const origCleanup = cleanup;
    cleanup = (): void => {
      origCleanup?.();
      document.removeEventListener('DOMContentLoaded', onReady, true);
    };
  }
}
