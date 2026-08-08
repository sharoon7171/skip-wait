import { createFullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { isAllowedHost } from '../../utils/domain-check';
import { TECH8S_ADRINOLINKS_HOSTS } from './hosts';

const OVERLAY_ID = 'skip-wait-tech8s-adrinolinks';
const BOOT_STYLE_ID = 'skip-wait-tech8s-adrinolinks-boot';
const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;
const SAFE_RE = /https:\/\/[^\s"'<>]+\/safe\.php\?link=[A-Za-z0-9]+/i;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let started = false;

const aliasFromPath = (): string | null => {
  const parts = location.pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (parts.length !== 1) return null;
  const alias = parts[0]!;
  return ALIAS_RE.test(alias) ? alias : null;
};

const safeFromPage = (): string | null => {
  const html = document.documentElement.innerHTML;
  const m = SAFE_RE.exec(html);
  return m?.[0]?.trim() ?? null;
};

const boot = (status: string): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (!document.getElementById(BOOT_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = BOOT_STYLE_ID;
    style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
    (document.head ?? document.documentElement).appendChild(style);
  }
  if (document.getElementById(OVERLAY_ID)) return;
  createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note: NOTE,
    status,
  });
};

const tick = (): void => {
  if (started || !aliasFromPath()) return;
  const safe = safeFromPage();
  if (!safe) return;
  started = true;
  boot('Skipping AdrinoLinks gate…');
  location.replace(safe);
};

export const initTech8sAdrinolinks = (): void => {
  if (window !== window.top) return;
  if (!isAllowedHost(TECH8S_ADRINOLINKS_HOSTS)) return;

  tick();
  const mo = new MutationObserver(tick);
  mo.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tick, true);
  }
};
