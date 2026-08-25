import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import {
  isBstshrtHost,
  isBstshrtLegacyPage,
  isBstshrtLockerPage,
  isCloudflareChallenge,
  parseBstshrtLockerConfig,
  setBstshrtHostOk,
} from './detect';
import { unlockBstlarLegacyDestination, unlockBstshrtDestination } from './unlock';

const OVERLAY_ID = 'skip-wait-bstshrt-overlay';
const BOOT_STYLE_ID = 'skip-wait-bstshrt-boot';

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: 'Skip Wait is working. You don’t need to tap anything.',
} as const;

let ui: FullPageOverlay | null = null;
let started = false;

const bootOverlayLock = (): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BOOT_STYLE_ID;
  style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head || document.documentElement).appendChild(style);
};

const mountUi = (status = 'Getting ready…'): FullPageOverlay => {
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

const openDestination = (url: string, overlay: FullPageOverlay): void => {
  overlay.setStatus('Opening your link…');
  location.replace(url);
};

const runLocker = async (): Promise<void> => {
  if (started || isCloudflareChallenge() || !isBstshrtLockerPage()) return;
  const config = parseBstshrtLockerConfig();
  if (!config) return;
  started = true;
  const overlay = mountUi('Opening your link…');
  try {
    const dest = await unlockBstshrtDestination(config, {
      onStatus: (text) => overlay.setStatus(text),
    });
    openDestination(dest, overlay);
  } catch (err) {
    overlay.setStatus('Something went wrong.');
    overlay.setError(err instanceof Error ? err.message : String(err));
  }
};

const runLegacy = async (): Promise<void> => {
  if (started || isCloudflareChallenge() || !isBstshrtLegacyPage()) return;
  started = true;
  const overlay = mountUi('Reading shortlink…');
  try {
    const dest = await unlockBstlarLegacyDestination({
      onStatus: (text) => overlay.setStatus(text),
    });
    openDestination(dest, overlay);
  } catch (err) {
    overlay.setStatus('Something went wrong.');
    overlay.setError(err instanceof Error ? err.message : String(err));
  }
};

const tick = (): void => {
  if (!isBstshrtHost() || isCloudflareChallenge() || started) return;
  if (isBstshrtLockerPage()) {
    void runLocker();
    return;
  }
  if (isBstshrtLegacyPage()) void runLegacy();
};

export function initBstshrtGate(): void {
  if (window !== window.top) return;
  void canBypass('bstshrt').then((ok) => {
    if (!ok) return;
    setBstshrtHostOk(true);
    tick();
    new MutationObserver(tick).observe(document.documentElement, {
      attributeFilter: ['class', 'style', 'hidden', 'id', 'value'],
      attributes: true,
      childList: true,
      subtree: true,
    });
    const titleEl = document.querySelector('title');
    if (titleEl) {
      new MutationObserver(tick).observe(titleEl, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tick, true);
    window.addEventListener('load', tick, true);
  });
}
