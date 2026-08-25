import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';

const OVERLAY_ID = 'skip-wait-tech8s-gate';
const BOOT_STYLE_ID = 'skip-wait-tech8s-gate-boot';
const SAFE_PHP_RE = /^\/safe2?\.php$/i;
const ST_RE = /^\/st$/i;
const TP_NAME_RE = /^tp\d+$/i;
const MAX_HOPS = 8;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

type TpPost = { action: string; fields: Record<string, string> };

let ui: FullPageOverlay | null = null;
let started = false;
let openPhp = false;

const bootOverlayLock = (): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BOOT_STYLE_ID;
  style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head ?? document.documentElement).appendChild(style);
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

const absHref = (href: string, base: string): string => {
  const abs = httpHref(new URL(href.trim(), base).href);
  if (!abs) throw new Error('tech8s href');
  return abs;
};

const terminalFrom = (root: ParentNode, base: string): string | null => {
  if (openPhp) {
    const open = root.querySelector<HTMLAnchorElement>('a[href*="/includes/open.php?"]');
    const href = open?.getAttribute('href');
    return href ? absHref(href, base) : null;
  }
  const go = root.querySelector<HTMLAnchorElement>('a#go_d2[href]');
  const href = go?.getAttribute('href');
  return href ? absHref(href, base) : null;
};

const tpPostFrom = (root: ParentNode, base: string): TpPost | null => {
  const form = root.querySelector<HTMLFormElement>('form[name="tp"]');
  if (!form) return null;
  const fields: Record<string, string> = {};
  for (const inp of form.querySelectorAll<HTMLInputElement>('input[name]')) {
    if (!TP_NAME_RE.test(inp.name)) continue;
    fields[inp.name] = inp.value ?? '';
  }
  if (!Object.keys(fields).length) return null;
  const action = form.getAttribute('action')?.trim() || base;
  return { action: new URL(action, base).href, fields };
};

const isGatePage = (): boolean =>
  !!tpPostFrom(document, location.href) || !!terminalFrom(document, location.href);

const postTp = async (post: TpPost): Promise<{ html: string; base: string }> => {
  const res = await fetch(post.action, {
    method: 'POST',
    body: new URLSearchParams(post.fields),
    credentials: 'include',
    headers: {
      Accept: 'text/html,application/xhtml+xml',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  });
  if (!res.ok) throw new Error('tech8s post');
  return { html: await res.text(), base: res.url || post.action };
};

const run = async (): Promise<void> => {
  const overlay = mountUi('Skipping blog steps…');
  const stepOut = terminalFrom(document, location.href);
  const post = tpPostFrom(document, location.href);
  if (stepOut && !post) {
    overlay.setStatus('Opening next step…');
    location.replace(stepOut);
    return;
  }
  if (!post) throw new Error('tech8s gate');

  let html = document.documentElement.outerHTML;
  let base = location.href;

  for (let hop = 0; hop < MAX_HOPS; hop++) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const next = tpPostFrom(doc, base);
    if (!next) {
      const terminal = terminalFrom(doc, base);
      if (!terminal) throw new Error('tech8s terminal');
      overlay.setStatus('Opening next step…');
      location.replace(terminal);
      return;
    }
    overlay.setStatus(hop === 0 ? 'Unlocking blog gate…' : `Skipping step ${hop + 1}…`);
    ({ html, base } = await postTp(next));
  }
  throw new Error('tech8s hops');
};

const kick = (): void => {
  if (started || !isGatePage()) return;
  started = true;
  void run().catch(() => {
    mountUi().setError('Unlock failed. Reload and try again.');
  });
};

export const initTech8sGate = (): void => {
  if (window !== window.top) return;
  if (SAFE_PHP_RE.test(location.pathname) || ST_RE.test(location.pathname)) return;
  void Promise.all([canBypass('tech8s'), canBypass('tech8s-open-php')]).then(([ok, isOpen]) => {
    if (!ok) return;
    openPhp = isOpen;
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
  });
};
