import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { whenDomParsed } from '../../utils/domain-check';
const OVERLAY_ID = 'skip-wait-adlinkfly-token-overlay';
const BOOT_STYLE_ID = 'skip-wait-adlinkfly-token-boot';
const TOKEN_INPUT_SELECTOR = 'input[name="token"]';
const CAPTCHA_WIDGET_ID = 'captchaShortlink';
const TOKEN_HTTP_B64_PREFIX = 'aHR0c';
const TOKEN_HTTP_B64_RE = /^(aHR0c[A-Za-z0-9+/]+={0,2})/;
const OLA_DRIVE_HOST = 'drive.olamovies.download';
const OLA_DRIVE_HOLD_MS = 155_000;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let done = false;
let ui: FullPageOverlay | null = null;

const padBase64 = (s: string): string => {
  const raw = s.replace(/=+$/, '');
  const p = raw.length % 4;
  return p ? raw + '='.repeat(4 - p) : raw;
};

export const destinationUrlFromAdlinkflyTokenPayload = (token: string): string | null => {
  const idx = token.indexOf(TOKEN_HTTP_B64_PREFIX);
  if (idx === -1) return null;
  const rest = token.slice(idx).replace(/-/g, '+').replace(/_/g, '/');
  const m = TOKEN_HTTP_B64_RE.exec(rest);
  if (!m?.[1]) return null;
  try {
    const decoded = new TextDecoder('utf-8').decode(
      Uint8Array.from(atob(padBase64(m[1])), (c) => c.charCodeAt(0)),
    );
    const match = decoded.match(/https?:\/\/[^\s\x00-\x1f"']+/);
    return match ? match[0].trim() : null;
  } catch {
    return null;
  }
};

const isTokenPayloadPage = (): boolean =>
  !!document.querySelector(TOKEN_INPUT_SELECTOR) && !!document.getElementById(CAPTCHA_WIDGET_ID);

const isOlaDriveDest = (url: string): boolean => {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host === OLA_DRIVE_HOST || host.endsWith(`.${OLA_DRIVE_HOST}`);
  } catch {
    return false;
  }
};

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

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
    countdownLabel: 'Your link opens in',
  });
  return ui;
};

const redirectFromToken = async (): Promise<void> => {
  if (done || !isTokenPayloadPage()) return;
  const token = document.querySelector<HTMLInputElement>(TOKEN_INPUT_SELECTOR)?.value?.trim();
  if (!token) return;
  const url = destinationUrlFromAdlinkflyTokenPayload(token);
  if (!url) return;
  done = true;
  const overlay = ui ?? mountUi('Unlocking destination…');
  if (isOlaDriveDest(url)) {
    overlay.setStatus('Opening soon…');
    overlay.startCountdown(Date.now() + OLA_DRIVE_HOLD_MS);
    await sleep(OLA_DRIVE_HOLD_MS);
    overlay.hideCountdown();
  }
  overlay.setStatus('Redirecting now…');
  location.replace(url);
};

export function initAdlinkflyTokenPayload(): void {
  void canBypass('adlinkfly-token-payload').then((ok) => {
    if (!ok) return;
    const kick = (): void => {
      if (!isTokenPayloadPage() || done) return;
      mountUi('Unlocking destination…');
      void redirectFromToken();
    };
    kick();
    whenDomParsed(kick);
  });
}
