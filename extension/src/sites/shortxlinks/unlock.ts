import { isRemoteSite } from '../../hosts/check';
import { linksGoFormFromHtml, postLinksGo } from '../adlinkfly/unlock';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { shortxAliasFromPath } from './hosts';

const OVERLAY_ID = 'skip-wait-shortxlinks-unlock';
const BOOT_STYLE_ID = 'skip-wait-shortxlinks-unlock-boot';
const ISSUED_KEY = 'sw-shortx-issued';
const TOKEN_WAIT_MS = 29_000;
const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;
let started = false;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const spoofVisibility = (): void => {
  chrome.runtime.sendMessage({ type: 'INJECT_VISIBILITY_SPOOF' }).catch(() => {});
};

const prep = (): void => {
  try {
    document.cookie = 'ab=1; path=/';
  } catch {}
  try {
    const w = window as unknown as { blurred?: boolean; onblur?: unknown; onfocus?: unknown };
    w.blurred = false;
    w.onblur = null;
    w.onfocus = null;
  } catch {}
  try {
    const av = (window as unknown as { app_vars?: Record<string, unknown> }).app_vars;
    if (av) av['force_disable_adblock'] = '0';
  } catch {}
};

const mount = (status: string): FullPageOverlay => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (!document.getElementById(BOOT_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = BOOT_STYLE_ID;
    style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
    (document.head || document.documentElement).appendChild(style);
  }
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

const isUnlockShell = (): boolean =>
  !!document.querySelector('#go-link input[name="ad_form_data"]');

const isTooEarly = (): boolean =>
  document.title.includes('Too Early') &&
  !!shortxAliasFromPath(location.pathname) &&
  location.search.length > 1;

const issuedAt = (): number => {
  const n = Number(sessionStorage.getItem(ISSUED_KEY));
  if (Number.isFinite(n) && n > 0) return n;
  const now = Date.now();
  sessionStorage.setItem(ISSUED_KEY, String(now));
  return now;
};

const openDestination = async (html: string, referer: string, overlay: FullPageOverlay): Promise<void> => {
  prep();
  overlay.setStatus('Unlocking your link…');
  const form = linksGoFormFromHtml(html, referer);
  const url = form ? await postLinksGo(form, referer) : null;
  if (!url) {
    overlay.setError('Couldn’t unlock this link. Reload and try again.');
    started = false;
    return;
  }
  overlay.setStatus('Opening your link…');
  location.replace(url);
};

const run = async (): Promise<void> => {
  if (started) return;

  if (isUnlockShell()) {
    started = true;
    spoofVisibility();
    await openDestination(document.documentElement.innerHTML, location.href, mount('Unlocking your link…'));
    return;
  }

  if (!isTooEarly()) return;
  started = true;
  spoofVisibility();
  const overlay = mount('Waiting for timer…');
  const tokenUrl = location.href.split('#')[0] ?? location.href;
  const unlockAt = issuedAt() + TOKEN_WAIT_MS;
  const left = unlockAt - Date.now();
  if (left > 0) {
    overlay.startCountdown(unlockAt);
    await sleep(left);
    overlay.hideCountdown();
  }
  const html = await (await fetch(tokenUrl, { credentials: 'include', cache: 'no-store' })).text();
  if (html.includes('Too Early')) {
    overlay.setError('Still locked. Open the short link again.');
    started = false;
    return;
  }
  await openDestination(html, tokenUrl, overlay);
};

export function initShortxlinksUnlock(): void {
  if (window !== window.top) return;
  void isRemoteSite('shortxlinks').then((ok) => {
    if (!ok) return;
    const tick = (): void => {
      void run();
    };
    tick();
    new MutationObserver(tick).observe(document.documentElement, {
      attributeFilter: ['href', 'value'],
      attributes: true,
      childList: true,
      subtree: true,
    });
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', tick, true);
    }
  });
}
