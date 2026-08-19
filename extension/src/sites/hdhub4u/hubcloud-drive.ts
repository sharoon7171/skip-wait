import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { hostnameMatches, isAllowedHost, whenDomParsed } from '../../utils/domain-check';

const HUBCLOUD_DRIVE_HOSTS = [
  'hubcloud.cx',
  'hubcloud.foo',
  'hubcloud.club',
  'hubcloud.fans',
  'vcloud.zip',
  'vcloud.fit',
] as const;

const VCLOUD_HOSTS = ['vcloud.zip', 'vcloud.fit'] as const;
const HUBCLOUD_PHP_RE = /https?:\/\/[^'"\s]+\/hubcloud\.php\?[^'"\s]+/i;
const VCLOUD_URL_RE = /var\s+url\s*=\s*atob\s*\(\s*atob\s*\(\s*['"]([A-Za-z0-9+/=]+)['"]\s*\)\s*\)/;
const HUBCLOUD_DRIVE_PATH_RE = /^\/drive\/(?!admin(?:\/|$))[\w-]+\/?$/i;
const VCLOUD_FILE_PATH_RE = /^\/(?!admin(?:\/|$))[\w-]+\/?$/i;
const OVERLAY_ID = 'skip-wait-hubcloud-overlay';
const BOOT_STYLE_ID = 'skip-wait-hubcloud-boot';
const NOTE = {
  lead: 'Hang tight — opening the next page.',
  detail: "You don't need to tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;
let started = false;

const isCloudflareInterstitial = (): boolean => {
  const title = document.title.toLowerCase();
  if (title.includes('just a moment') || title.includes('attention required')) return true;
  return (
    document.querySelector(
      '#challenge-form, #challenge-running, #cf-challenge-running, #challenge-stage, .cf-browser-verification',
    ) != null
  );
};

const isVcloud = (): boolean => hostnameMatches(location.hostname, VCLOUD_HOSTS);

const isSharePath = (): boolean => {
  const { pathname } = location;
  if (isVcloud()) {
    if (new URLSearchParams(location.search).has('token')) return false;
    return pathname !== '/' && VCLOUD_FILE_PATH_RE.test(pathname);
  }
  return HUBCLOUD_DRIVE_PATH_RE.test(pathname);
};

const resolveTarget = (): string | null => {
  const a = document.getElementById('download');
  if (a instanceof HTMLAnchorElement && HUBCLOUD_PHP_RE.test(a.href)) return a.href;
  for (const s of document.scripts) {
    const t = s.textContent ?? '';
    const php = t.match(HUBCLOUD_PHP_RE);
    if (php) return php[0];
    const vcloud = t.match(VCLOUD_URL_RE);
    if (vcloud?.[1]) {
      try {
        return atob(atob(vcloud[1]));
      } catch {
        continue;
      }
    }
  }
  return null;
};

const boot = (): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = BOOT_STYLE_ID;
  s.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head ?? document.documentElement).appendChild(s);
};

const mount = (): FullPageOverlay => {
  boot();
  if (ui) return ui;
  ui = createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note: NOTE,
    status: 'Opening the next page…',
  });
  return ui;
};

export function initHubcloudDrive(): void {
  if (window !== window.top || !isAllowedHost(HUBCLOUD_DRIVE_HOSTS) || !isSharePath() || started) {
    return;
  }
  whenDomParsed(() => {
    if (started || isCloudflareInterstitial()) return;
    started = true;
    mount();
    const url = resolveTarget();
    if (url && /^https?:\/\//i.test(url)) {
      location.replace(url);
      return;
    }
    const id = window.setInterval(() => {
      const next = resolveTarget();
      if (!next || !/^https?:\/\//i.test(next)) return;
      clearInterval(id);
      location.replace(next);
    }, 50);
  });
}
