import { linksGoFormFromHtml, postLinksGo } from '../adlinkfly/unlock';
import { isRemoteSite } from '../../hosts/check';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';

const OVERLAY_ID = 'skip-wait-earn4link-overlay';
const BOOT_STYLE_ID = 'skip-wait-earn4link-boot';
const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;
const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;
let done = false;
let entryDone = false;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const mount = (status: string): FullPageOverlay => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (!document.getElementById(BOOT_STYLE_ID)) {
    const s = document.createElement('style');
    s.id = BOOT_STYLE_ID;
    s.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
    (document.head || document.documentElement).appendChild(s);
  }
  if (ui) {
    ui.setStatus(status);
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

const isAlias = (): boolean => {
  const p = location.pathname.replace(/^\/+|\/+$/g, '');
  return !!p && !p.includes('/') && ALIAS_RE.test(p);
};

const hasForm = (): boolean => !!document.querySelector('#go-link input[name="ad_form_data"]');

const counterSec = (): number => {
  const m = document.documentElement.innerHTML.match(/["']counter_value["']\s*:\s*["']?(\d+)/);
  if (m?.[1]) return Math.max(0, parseInt(m[1], 10));
  const n = parseInt(document.querySelector('#timer')?.textContent?.trim() ?? '', 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
};

const prep = (): void => {
  chrome.runtime.sendMessage({ type: 'INJECT_VISIBILITY_SPOOF' }).catch(() => {});
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

const entryNext = (): string | null => {
  const html = document.documentElement.innerHTML;
  return (
    html.match(/http-equiv=["']?refresh[^>]*url=([^"'\s>]+)/i)?.[1] ||
    html.match(/window\.location(?:\.href)?\s*=\s*['"](https?:\/\/[^'"]+)['"]/i)?.[1] ||
    null
  );
};

const unlock = async (): Promise<void> => {
  if (done || !hasForm()) return;
  done = true;
  prep();
  const overlay = mount('Unlocking…');
  const form = linksGoFormFromHtml(document.documentElement.outerHTML, location.href);
  if (!form) {
    done = false;
    return;
  }
  let url = await postLinksGo(form, location.href);
  if (!url) {
    const sec = counterSec();
    overlay.setStatus('Waiting for timer…');
    overlay.startCountdown(Date.now() + sec * 1000);
    await sleep(sec * 1000 + 400);
    overlay.hideCountdown();
    overlay.setStatus('Unlocking…');
    url = await postLinksGo(form, location.href);
    for (let i = 0; !url && i < 8; i++) {
      await sleep(250);
      url = await postLinksGo(form, location.href);
    }
  }
  if (!url) {
    done = false;
    overlay.setError('Could not unlock. Refresh and try again.');
    return;
  }
  overlay.setStatus('Opening…');
  location.replace(url);
};

const tick = (): void => {
  if (!isAlias()) return;
  mount('Getting things ready…');
  if (hasForm()) {
    void unlock();
    return;
  }
  if (entryDone) return;
  const next = entryNext();
  if (!next || !/^https?:\/\//i.test(next)) return;
  entryDone = true;
  location.replace(next);
};

export function initEarn4linkUnlock(): void {
  if (window !== window.top || !isAlias()) return;
  void isRemoteSite('earn4link').then((ok) => {
    if (!ok) return;
    tick();
    const mo = new MutationObserver(tick);
    mo.observe(document.documentElement, { childList: true, subtree: true });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tick, true);
  });
}
