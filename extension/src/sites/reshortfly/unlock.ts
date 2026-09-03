import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { linksGoFormFromHtml, postLinksGo } from '../adlinkfly/unlock';

const SITE = 'reshortfly' as const;
const OVERLAY_ID = 'skip-wait-reshortfly';
const BOOT_STYLE_ID = 'skip-wait-reshortfly-boot';
const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{3,}$/;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;
let started = false;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const requestVisibilitySpoof = (): void => {
  chrome.runtime.sendMessage({ type: 'INJECT_VISIBILITY_SPOOF' }).catch(() => {});
};

const prepClientChecks = (): void => {
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

const bootOverlayLock = (): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BOOT_STYLE_ID;
  style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head || document.documentElement).appendChild(style);
};

const mountUi = (status = 'Getting things ready…'): FullPageOverlay => {
  bootOverlayLock();
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

const isAliasPath = (): boolean => {
  const parts = location.pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  return parts.length === 1 && ALIAS_RE.test(parts[0]!);
};

const isUnlockShell = (): boolean =>
  Boolean(
    document.querySelector('#go-link, form[action*="/links/go"]') &&
      document.querySelector('input[name="ad_form_data"]'),
  );

const counterSec = (): number => {
  const page = document.documentElement.innerHTML;
  const m = page.match(/["']counter_value["']\s*:\s*["']?(\d+)/);
  if (m?.[1]) return Math.max(0, parseInt(m[1], 10));
  const n = parseInt(document.querySelector('#timer')?.textContent?.trim() ?? '', 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

const postFromPage = (): Promise<string | null> => {
  const form = linksGoFormFromHtml(document.documentElement.innerHTML, location.href);
  return form ? postLinksGo(form, location.href) : Promise.resolve(null);
};

const runUnlock = async (): Promise<void> => {
  if (started || !isUnlockShell()) return;
  started = true;
  requestVisibilitySpoof();
  prepClientChecks();
  const overlay = mountUi('Getting things ready…');

  const sec = counterSec();
  if (sec > 0) {
    overlay.setStatus('Waiting for the short timer…');
    overlay.startCountdown(Date.now() + sec * 1000);
    await sleep(sec * 1000);
    overlay.hideCountdown();
  }

  overlay.setStatus('Unlocking your link…');
  let url = await postFromPage();
  if (!url) {
    const endAt = Date.now() + 3000;
    while (!url && Date.now() < endAt) {
      await sleep(250);
      url = await postFromPage();
    }
  }

  if (!url) {
    overlay.setStatus('Couldn’t unlock this link. Reload and try again.');
    started = false;
    return;
  }

  overlay.setStatus('Opening your link…');
  recordBypassSuccess();
  location.replace(url);
};

const tick = (): void => {
  if (started || !isUnlockShell()) return;
  mountUi('Getting things ready…');
  void runUnlock();
};

export const initReshortflyUnlock = (): void => {
  if (window !== window.top || !isAliasPath()) return;
  void canBypass(SITE).then((ok) => {
    if (!ok) return;
    tick();
    const mo = new MutationObserver(() => {
      tick();
      if (started) mo.disconnect();
    });
    mo.observe(document.documentElement, {
      attributeFilter: ['value'],
      attributes: true,
      childList: true,
      subtree: true,
    });
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', tick, true);
    }
    window.addEventListener('load', tick, true);
  });
};
