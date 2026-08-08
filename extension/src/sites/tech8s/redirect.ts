import { createFullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { TECH8S_HOSTS } from './hosts';

const OVERLAY_ID = 'skip-wait-tech8s-redirect';
const BOOT_STYLE_ID = 'skip-wait-tech8s-redirect-boot';
const SAFE_PHP_RE = /^\/safe2?\.php$/i;
const ST_RE = /^\/st$/i;
const LOCATION_HREF_RE = /window\.location\.href\s*=\s*["']([^"']+)["']/;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

const bootOverlay = (status: string): void => {
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

const httpUrl = (v: string | null | undefined): string | null => {
  const s = v?.trim();
  return s && /^https?:\/\//i.test(s) ? s : null;
};

const urlFromQuery = (): string | null => httpUrl(new URLSearchParams(location.search).get('url'));

const urlFromScripts = (): string | null => {
  for (const script of document.scripts) {
    const text = script.textContent ?? '';
    if (!text.includes('window.location.href')) continue;
    const raw = httpUrl(LOCATION_HREF_RE.exec(text)?.[1]);
    if (raw) return raw;
  }
  return null;
};

export const initTech8sRedirect = (): void => {
  if (!isAllowedHost(TECH8S_HOSTS)) return;

  if (ST_RE.test(location.pathname)) {
    bootOverlay('Opening destination…');
    const url = urlFromQuery();
    if (!url) throw new Error('tech8s st');
    location.replace(url);
    return;
  }

  if (!SAFE_PHP_RE.test(location.pathname)) return;

  bootOverlay('Skipping safe redirect…');

  let done = false;
  const go = (): void => {
    if (done) return;
    const url = urlFromScripts();
    if (!url) return;
    done = true;
    mo.disconnect();
    location.replace(url);
  };

  whenDomParsed(go);
  const mo = new MutationObserver(go);
  mo.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => {
    if (done) return;
    mo.disconnect();
    throw new Error('tech8s safe');
  }, 5000);
};
