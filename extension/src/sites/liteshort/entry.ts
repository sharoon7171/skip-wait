import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { LITESHORT_UNLOCK_ORIGIN } from './hosts';

const OVERLAY_ID = 'skip-wait-liteshort-entry';
const BOOT_STYLE_ID = 'skip-wait-liteshort-entry-boot';
const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;

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

const aliasFromPath = (): string | null => {
  const parts = location.pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (parts.length !== 1) return null;
  const alias = parts[0]!;
  return ALIAS_RE.test(alias) ? alias : null;
};

export const initLiteshortEntry = (): void => {
  if (window !== window.top) return;
  if (started) return;
  const alias = aliasFromPath();
  if (!alias) return;
  void canBypass('liteshort').then((ok) => {
    if (!ok || started) return;
    started = true;
    mountUi('Skipping redirect notice…');
    location.replace(`${LITESHORT_UNLOCK_ORIGIN}/${encodeURIComponent(alias)}`);
  });
};
