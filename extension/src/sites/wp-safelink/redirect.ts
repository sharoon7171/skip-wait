import { isRemoteSite } from '../../hosts/check';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { whenDomParsed } from '../../utils/domain-check';
import { destFromHref, destFromLocation, hrefHasSafelinkToken } from './decrypt';

const OVERLAY_ID = 'skip-wait-wp-safelink-overlay';
const BOOT_STYLE_ID = 'skip-wait-wp-safelink-boot';
const OVERLAY_MIN_MS = 200;
const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to wait or tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;
let started = false;
let overlayAt = 0;

const activeClass = (): string => overlayActiveClass(OVERLAY_ID);

const bootOverlayLock = (): void => {
  document.documentElement.classList.add(activeClass());
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BOOT_STYLE_ID;
  style.textContent = buildFullPageOverlayCss(OVERLAY_ID, activeClass());
  (document.head || document.documentElement).appendChild(style);
};

const unboot = (): void => {
  ui?.remove();
  ui = null;
  overlayAt = 0;
  document.documentElement.classList.remove(activeClass());
  document.getElementById(BOOT_STYLE_ID)?.remove();
};

const mountUi = (status = 'Getting things ready…'): FullPageOverlay => {
  bootOverlayLock();
  if (!overlayAt) overlayAt = Date.now();
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

const open = (url: string): void => {
  if (url === location.href) {
    unboot();
    return;
  }
  mountUi('Opening your link…');
  const go = (): void => location.replace(url);
  const wait = Math.max(0, OVERLAY_MIN_MS - (Date.now() - overlayAt));
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (wait > 0) window.setTimeout(go, wait);
      else go();
    });
  });
};

const waitHref = (): string | null =>
  document.querySelector<HTMLAnchorElement>('#wpsafe-link a[href]')?.href ?? null;

export function initWpSafelinkRedirect(): void {
  const fromUrl = hrefHasSafelinkToken(location.href);
  if (fromUrl) mountUi('Opening your link…');
  void isRemoteSite('wp-safelink').then((ok) => {
    if (!ok) {
      if (fromUrl) unboot();
      return;
    }
    if (fromUrl) {
      void destFromLocation().then((url) => {
        if (url) open(url);
        else unboot();
      });
      return;
    }
    const kick = (): void => {
      if (started) return;
      const href = waitHref();
      if (!href || !hrefHasSafelinkToken(href)) return;
      started = true;
      mo.disconnect();
      mountUi('Opening your link…');
      void destFromHref(href).then((found) => {
        if (found) open(found);
        else unboot();
      });
    };
    whenDomParsed(kick);
    const mo = new MutationObserver(kick);
    mo.observe(document.documentElement, { childList: true, subtree: true });
  });
}
