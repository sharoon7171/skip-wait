import { isRemoteSite } from '../../hosts/check';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { pinSiteWidgetOverOverlay } from '../../injected-ui/pin-site-widget';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { whenDomParsed } from '../../utils/domain-check';
import { MSG_VEXFILE_VERIFY_HOOK, VEXFILE_CODE_RE, VEXFILE_VERIFIED_ATTR } from './hosts';

const OVERLAY_ID = 'skip-wait-vexfile-overlay';
const BOOT_STYLE_ID = 'skip-wait-vexfile-boot';
const GATE_STYLE_ID = 'skip-wait-vexfile-turnstile-gate';
const PIN_STYLE_ID = 'skip-wait-vexfile-captcha-pin';
const WIDGET_ID = 'skip-wait-vexfile-turnstile';
const ANC_ATTR = 'data-sw-vex-pin';
const BUCKET_RE = /\/d_bucket\/[A-Za-z0-9]+/;
const SIZE_RE = /(\d+(?:\.\d+)?\s*[KMGT]?B)/i;
const ACTION = 'Direct Download · Skip Wait — No Timer, No Mediator';
const VISIBLE = [
  '#captcha-form',
  '.cf-turnstile',
  'iframe[src*="challenges.cloudflare.com"]',
  'iframe[src*="turnstile"]',
  'div[id^="cf-chl-widget"]',
] as const;

let ui: FullPageOverlay | null = null;
let started = false;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const note = (name: string, size: string) => (size ? { lead: name, detail: size } : { lead: name });

const fileMeta = (): { name: string; size: string } => ({
  name: document.querySelector('.download-block h4')?.textContent?.replace(/\s+/g, ' ').trim() ?? '',
  size: document.querySelector('.file-size')?.textContent?.match(SIZE_RE)?.[1]?.replace(/\s+/g, ' ').trim() ?? '',
});

const verified = (): boolean => document.documentElement.getAttribute(VEXFILE_VERIFIED_ATTR) === '1';

const boot = (): void => {
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = BOOT_STYLE_ID;
  s.textContent = buildFullPageOverlayCss(OVERLAY_ID, overlayActiveClass(OVERLAY_ID));
  (document.head ?? document.documentElement).appendChild(s);
};

const mount = (status: string, name: string, size: string): FullPageOverlay => {
  boot();
  document.documentElement.classList.add(overlayActiveClass(OVERLAY_ID));
  if (ui) {
    ui.setNote(note(name, size));
    ui.setStatus(status);
    ui.setError(null);
    return ui;
  }
  ui = createFullPageOverlay({ id: OVERLAY_ID, brand: 'Skip Wait', note: note(name, size), status });
  return ui;
};

const stackGate = (widget: HTMLElement): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  const sels: string[] = [];
  for (
    let el = widget.parentElement, i = 0;
    el && el !== document.body && el !== document.documentElement;
    el = el.parentElement, i++
  ) {
    el.setAttribute(ANC_ATTR, String(i));
    sels.push(`[${ANC_ATTR}="${i}"]`);
  }
  let style = document.getElementById(GATE_STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = GATE_STYLE_ID;
    (document.head ?? document.documentElement).appendChild(style);
  }
  style.textContent =
    sels
      .map(
        (sel) =>
          `html.${active} ${sel}{z-index:auto!important;transform:none!important;filter:none!important;perspective:none!important;isolation:auto!important;contain:none!important;overflow:visible!important;opacity:1!important}`,
      )
      .join('') +
    VISIBLE.map(
      (sel) =>
        `html.${active} ${sel},html.${active} ${sel} *{visibility:visible!important;pointer-events:auto!important;opacity:1!important}`,
    ).join('') +
    `html.${active}>iframe[src*="challenges.cloudflare.com"],html.${active}>iframe[src*="turnstile"],` +
    `html.${active} iframe[src*="challenges.cloudflare.com"],html.${active} iframe[src*="turnstile"]` +
    `{display:block!important;visibility:visible!important;pointer-events:auto!important;opacity:1!important;z-index:2147483647!important}`;
};

const waitVerified = async (overlay: FullPageOverlay): Promise<() => void> => {
  overlay.setStatus('Complete the Turnstile check below.');
  let stopPin: (() => void) | null = null;
  let pinnedFor = '';
  const release = (): void => {
    stopPin?.();
    stopPin = null;
    pinnedFor = '';
  };
  const pin = (): void => {
    const widget = document.querySelector<HTMLElement>('.cf-turnstile');
    if (!widget) return;
    if (!widget.id) widget.id = WIDGET_ID;
    stackGate(widget);
    if (stopPin && pinnedFor === widget.id && document.getElementById(widget.id)) return;
    release();
    pinnedFor = widget.id;
    stopPin = pinSiteWidgetOverOverlay({
      overlayId: OVERLAY_ID,
      mount: overlay.turnstileMount,
      widgetId: widget.id,
      styleId: PIN_STYLE_ID,
      alsoVisibleSelectors: VISIBLE,
    });
  };
  const t0 = Date.now();
  while (Date.now() - t0 < 180_000) {
    pin();
    if (verified()) return release;
    await sleep(200);
  }
  release();
  throw new Error('turnstile');
};

const mint = async (): Promise<string> => {
  const step2 = document.querySelector<HTMLAnchorElement>('a.generate-link')?.href;
  if (!step2) throw new Error('step2');
  const res = await fetch(step2, { credentials: 'include', cache: 'no-store' });
  if (!res.ok) throw new Error('step2');
  const bucket = (await res.text()).match(BUCKET_RE)?.[0];
  if (!bucket) throw new Error('bucket');
  return new URL(bucket, location.origin).href;
};

const unlock = async (): Promise<void> => {
  const first = fileMeta();
  const overlay = mount('Getting things ready…', first.name, first.size);
  let releasePin: (() => void) | null = null;
  try {
    const ready = document.querySelector<HTMLAnchorElement>('a.generate-link[href*="d_bucket"]')?.href;
    if (ready) {
      overlay.setStatus('Ready — tap Direct Download when you want the file.');
      overlay.setAction(ready, ACTION);
      return;
    }
    releasePin = await waitVerified(overlay);
    overlay.setStatus('Resolving direct CDN…');
    const url = await mint();
    releasePin();
    overlay.setStatus('Ready — tap Direct Download when you want the file.');
    overlay.setAction(url, ACTION);
  } catch {
    releasePin?.();
    started = false;
    overlay.setAction(null);
    overlay.setError('Could not unlock this file. Complete Turnstile if shown, then reload.');
  }
};

export const initVexfileBypass = (): void => {
  if (window !== window.top || started) return;
  if (!VEXFILE_CODE_RE.test(location.pathname)) return;
  const allowed = isRemoteSite('vexfile');
  whenDomParsed(() => {
    if (!document.querySelector('.download-block, a.generate-link, #captcha-form, .cf-turnstile')) return;
    void allowed.then((ok) => {
      if (!ok || started) return;
      started = true;
      chrome.runtime.sendMessage({ type: MSG_VEXFILE_VERIFY_HOOK });
      void unlock();
    });
  });
};
