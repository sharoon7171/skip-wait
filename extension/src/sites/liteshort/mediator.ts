import { isRemoteSite } from '../../hosts/check';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { LITESHORT_UNLOCK_ORIGIN } from './hosts';

const OVERLAY_ID = 'skip-wait-liteshort-mediator';
const BOOT_STYLE_ID = 'skip-wait-liteshort-mediator-boot';
const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;
const ENTRY_PHP_RE = /^\/(?:now|new|no)\.php$/i;

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
  (document.head ?? document.documentElement).appendChild(style);
};

const mountUi = (status: string): FullPageOverlay => {
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
  });
  return ui;
};

const aliasFromQuery = (): string | null => {
  const q = new URLSearchParams(location.search).get('link')?.trim();
  return q && ALIAS_RE.test(q) ? q : null;
};

const tick = (): void => {
  if (started || !ENTRY_PHP_RE.test(location.pathname)) return;
  const alias = aliasFromQuery();
  if (!alias) return;
  started = true;
  mountUi('Skipping short mediator…');
  location.replace(`${LITESHORT_UNLOCK_ORIGIN}/${encodeURIComponent(alias)}`);
};

export const initLiteshortMediator = (): void => {
  if (window !== window.top) return;
  void isRemoteSite('liteshort-mediator').then((ok) => {
    if (!ok) return;
    tick();
    if (started) return;
    const mo = new MutationObserver(() => {
      tick();
      if (started) mo.disconnect();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', tick, true);
    }
  });
};
