import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { finishUnlock, formAction, postUnlock, unlockForm } from './api';
import { ENTRY_HOSTS } from './hosts';

const OVERLAY_ID = 'skip-wait-shrtslug-overlay';
const BOOT_STYLE_ID = 'skip-wait-shrtslug-boot';
const ENTRY_ACTION = 'human-verification';
const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;
let booted = false;
let started = false;

const mountUi = (status = 'Getting things ready…'): FullPageOverlay => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (!document.getElementById(BOOT_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = BOOT_STYLE_ID;
    style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
    (document.head || document.documentElement).appendChild(style);
  }
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
    countdownLabel: 'Your link opens in',
  });
  return ui;
};

const isEntry = (): boolean => {
  if (!isAllowedHost(ENTRY_HOSTS)) return false;
  return location.pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean).length === 1;
};

const unlock = async (): Promise<void> => {
  const form = unlockForm();
  if (!form || formAction(form) !== ENTRY_ACTION) throw new Error('missing entry form');
  const overlay = mountUi('Unlocking your link…');
  const res = await postUnlock(form);
  if (res.status !== 'success' || !res.data || typeof res.data === 'string') {
    throw new Error(typeof res.data === 'string' ? res.data : 'unlock failed');
  }
  finishUnlock(overlay, res.data);
};

export function initShrtslugEntry(): void {
  if (window !== window.top || !isEntry()) return;

  const mo = new MutationObserver(() => tick());
  const stop = (): void => {
    mo.disconnect();
    window.removeEventListener('load', tick, true);
  };

  const tick = (): void => {
    if (started) return;
    if (!booted) {
      booted = true;
      mountUi();
    }
    const form = unlockForm();
    if (!form || formAction(form) !== ENTRY_ACTION) return;
    started = true;
    stop();
    void unlock().catch((err: unknown) => {
      const overlay = mountUi();
      overlay.setStatus('Something went wrong.');
      overlay.setError(err instanceof Error ? err.message : String(err));
    });
  };

  whenDomParsed(tick);
  mo.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('load', tick, true);
}
