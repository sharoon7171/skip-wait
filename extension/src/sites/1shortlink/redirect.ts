import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { whenDomParsed } from '../../utils/domain-check';
import { csrfFromPage, oneShortlinkJob, postGetLinkDownload } from './unlock';

const OVERLAY_ID = 'skip-wait-1shortlink-overlay';
const BOOT_STYLE_ID = 'skip-wait-1shortlink-boot';

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
    countdownLabel: 'Your link opens in',
  });
  return ui;
};

const waitCsrf = async (): Promise<string> => {
  const end = Date.now() + 8000;
  while (Date.now() < end) {
    const t = csrfFromPage();
    if (t) return t;
    await new Promise((r) => setTimeout(r, 50));
  }
  throw new Error('1shortlink csrf');
};

const runUnlock = async (): Promise<void> => {
  const job = oneShortlinkJob();
  if (!job) throw new Error('1shortlink job');
  const overlay = mountUi('Unlocking your link…');
  const token = await waitCsrf();
  const redirectUrl = await postGetLinkDownload(job, token);
  overlay.setStatus('Opening your link…');
  location.replace(redirectUrl);
};

const kick = (): void => {
  if (started || !oneShortlinkJob()) return;
  const password = document.getElementById('password-area');
  if (password && !password.hasAttribute('hidden')) {
    mountUi().setError('This link needs a password.');
    return;
  }
  started = true;
  void runUnlock().catch(() => {
    mountUi().setError('Unlock failed. Reload and try again.');
  });
};

export function init1shortlinkRedirect(): void {
  if (window !== window.top) return;
  if (!oneShortlinkJob()) return;
  void canBypass('oneshortlink').then((ok) => {
    if (!ok) return;
    bootOverlayLock();
    mountUi('Getting things ready…');
    whenDomParsed(kick);
    const mo = new MutationObserver(() => {
      kick();
      if (started) mo.disconnect();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  });
}
