import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { goostAliasFromPath } from './hosts';

const OVERLAY_ID = 'skip-wait-goost-overlay';
const BOOT_STYLE_ID = 'skip-wait-goost-boot';

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;
let started = false;

const boot = (): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BOOT_STYLE_ID;
  style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head || document.documentElement).appendChild(style);
};

const mountUi = (status = 'Getting things ready…'): FullPageOverlay => {
  boot();
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

const runContinue = (): boolean => {
  if (started || !goostAliasFromPath()) return started;
  const form = document.querySelector<HTMLFormElement>('#nextstepform');
  if (!form) return false;
  started = true;
  mountUi('Skipping continue page…');
  (window as unknown as { adblockstatus?: boolean }).adblockstatus = false;
  document.getElementById('alertalert')?.remove();
  form.style.display = 'inline-block';
  form.submit();
  return true;
};

export function initGoostEntry(): void {
  if (window !== window.top || !goostAliasFromPath()) return;
  void canBypass('goost').then((ok) => {
    if (!ok) return;
    mountUi();
    runContinue();
    const mo = new MutationObserver(() => {
      if (runContinue()) mo.disconnect();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  });
}
