import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { isAllowedHost } from '../../utils/domain-check';
import { TECH8S_HOSTS } from './hosts';

const OVERLAY_ID = 'skip-wait-tech8s-gate';
const BOOT_STYLE_ID = 'skip-wait-tech8s-gate-boot';
const SAFE_PHP_RE = /^\/safe2?\.php$/i;
const ST_RE = /^\/st$/i;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;
let started = false;

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
    ui.setNote(NOTE);
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

const httpHref = (href: string | null | undefined): string | null => {
  const s = href?.trim();
  return s && /^https?:\/\//i.test(s) ? s : null;
};

const continueHref = (root: ParentNode = document): string | null => {
  const a = root.querySelector<HTMLAnchorElement>('a#go_d2[href]');
  return httpHref(a?.href);
};

const tpForm = (): HTMLFormElement | null => {
  const form = document.querySelector<HTMLFormElement>('form[name="tp"]');
  if (!form?.querySelector('input[name="tp2"]')) return null;
  return form;
};

const isGatePage = (): boolean => !!tpForm() || !!continueHref();

const nextFromHtml = (html: string, base: string): string | null => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const a = doc.querySelector<HTMLAnchorElement>('a#go_d2[href]');
  const href = a?.getAttribute('href')?.trim();
  if (!href) return null;
  try {
    const abs = new URL(href, base).href;
    return httpHref(abs);
  } catch {
    return null;
  }
};

const postTp2 = async (form: HTMLFormElement): Promise<string> => {
  const body = new URLSearchParams();
  new FormData(form).forEach((v, k) => body.append(k, String(v)));
  const action = form.getAttribute('action')?.trim() || location.href;
  const url = new URL(action, location.href).href;
  const res = await fetch(url, {
    method: 'POST',
    body,
    credentials: 'include',
    headers: {
      Accept: 'text/html,application/xhtml+xml',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  });
  const html = await res.text();
  const next = nextFromHtml(html, res.url || location.href);
  if (!next) throw new Error('tech8s go_d2');
  return next;
};

const run = async (): Promise<void> => {
  const overlay = mountUi('Skipping blog steps…');
  const form = tpForm();
  if (form) {
    overlay.setStatus('Unlocking blog gate…');
    const next = await postTp2(form);
    overlay.setStatus('Opening next step…');
    location.replace(next);
    return;
  }
  const href = continueHref();
  if (!href) throw new Error('tech8s continue');
  overlay.setStatus('Opening next step…');
  location.replace(href);
};

const kick = (): void => {
  if (started || !isGatePage()) return;
  started = true;
  void run().catch(() => {
    mountUi().setError('Unlock failed. Reload and try again.');
    started = false;
  });
};

export function initTech8sGate(): void {
  if (window !== window.top) return;
  if (!isAllowedHost(TECH8S_HOSTS)) return;
  if (SAFE_PHP_RE.test(location.pathname) || ST_RE.test(location.pathname)) return;

  const tick = (): void => {
    if (!isGatePage()) return;
    bootOverlayLock();
    mountUi();
    kick();
  };

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
}
