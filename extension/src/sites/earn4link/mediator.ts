import { isRemoteSite } from '../../hosts/check';
import { createFullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { hostnameMatches, whenDomParsed } from '../../utils/domain-check';
import { EARN4LINK_MYPHP, EARN4LINK_UNLOCK_ORIGIN } from './hosts';

const OVERLAY_ID = 'skip-wait-earn4link-med';
const BOOT_STYLE_ID = 'skip-wait-earn4link-med-boot';
const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;
const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let started = false;

const cookie = (name: string): string | null => {
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return m?.[1] ? decodeURIComponent(m[1]) : null;
};

const alias = (): string | null => {
  for (const v of [cookie('url'), new URLSearchParams(location.search).get('id')]) {
    const t = v?.trim();
    if (t && ALIAS_RE.test(t)) return t;
  }
  const seg = location.pathname.replace(/^\/+|\/+$/g, '');
  return seg && !seg.includes('/') && ALIAS_RE.test(seg) ? seg : null;
};

const cover = (status: string): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (!document.getElementById(BOOT_STYLE_ID)) {
    const s = document.createElement('style');
    s.id = BOOT_STYLE_ID;
    s.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
    (document.head || document.documentElement).appendChild(s);
  }
  if (!document.getElementById(OVERLAY_ID)) {
    createFullPageOverlay({ id: OVERLAY_ID, brand: 'Skip Wait', note: NOTE, status });
  }
};

const run = (): void => {
  if (started) return;
  const a = alias();
  if (!a) return;
  const host = location.hostname.toLowerCase();
  if (/\/myphp\.php$/i.test(location.pathname)) {
    cover('Skipping mediator…');
    return;
  }
  started = true;
  cover('Skipping mediator…');
  if (hostnameMatches(host, ['open2get.in'])) {
    location.replace(`${EARN4LINK_MYPHP}?id=${encodeURIComponent(a)}&site=e4l`);
    return;
  }
  if (hostnameMatches(host, ['hosting.ffindia.in'])) {
    location.replace('https://best-hosting.ffindia.in/');
    return;
  }
  location.replace(`${EARN4LINK_UNLOCK_ORIGIN}/${encodeURIComponent(a)}`);
};

export function initEarn4linkMediator(): void {
  if (window !== window.top) return;
  void isRemoteSite('earn4link-mediator').then((ok) => {
    if (!ok) return;
    if (alias() || cookie('site') === 'e4l' || document.querySelector('#wpsafelink-landing')) {
      void run();
      return;
    }
    whenDomParsed(() => void run());
  });
}
