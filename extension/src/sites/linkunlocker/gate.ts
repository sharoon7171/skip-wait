import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import {
  isCloudflareChallenge,
  isLinkunlockerLockerPage,
  isLinkunlockerVerifyPage,
  parseLinkunlockerLockerConfig,
  parseLinkunlockerVerifyParams,
} from './detect';
import { unlockLinkunlockerLocker, unlockLinkunlockerVerify } from './unlock';

const OVERLAY_ID = 'skip-wait-linkunlocker-overlay';
const BOOT_STYLE_ID = 'skip-wait-linkunlocker-boot';

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: 'Skip Wait is working. You don’t need to tap anything.',
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

const mountUi = (status = 'Getting ready…'): FullPageOverlay => {
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

const openDestination = (url: string, overlay: FullPageOverlay): void => {
  overlay.setStatus('Opening your link…');
  recordBypassSuccess();
  location.replace(url);
};

const finishSnippet = async (text: string, overlay: FullPageOverlay): Promise<void> => {
  recordBypassSuccess();
  try {
    await navigator.clipboard.writeText(text);
    overlay.setStatus('Content copied — you can paste it anywhere.');
  } catch {
    overlay.setStatus('Unlocked — your content is ready.');
    overlay.setError(text);
  }
};

const runLocker = async (): Promise<void> => {
  if (started || isCloudflareChallenge() || !isLinkunlockerLockerPage()) return;
  if (!parseLinkunlockerLockerConfig()) return;
  started = true;
  const overlay = mountUi('Opening your link…');
  try {
    const result = await unlockLinkunlockerLocker({
      onStatus: (text) => overlay.setStatus(text),
    });
    if (result.kind === 'snippet') {
      await finishSnippet(result.text, overlay);
      return;
    }
    openDestination(result.url, overlay);
  } catch (err) {
    overlay.setStatus('Something went wrong.');
    overlay.setError(err instanceof Error ? err.message : String(err));
  }
};

const runVerify = async (): Promise<void> => {
  if (started || isCloudflareChallenge() || !isLinkunlockerVerifyPage()) return;
  const params = parseLinkunlockerVerifyParams();
  if (!params) return;
  started = true;
  const overlay = mountUi('Verifying destination…');
  try {
    const dest = await unlockLinkunlockerVerify(params, {
      onStatus: (text) => overlay.setStatus(text),
    });
    openDestination(dest, overlay);
  } catch (err) {
    overlay.setStatus('Something went wrong.');
    overlay.setError(err instanceof Error ? err.message : String(err));
  }
};

const tick = (): void => {
  if (isCloudflareChallenge() || started) return;
  if (isLinkunlockerLockerPage()) {
    void runLocker();
    return;
  }
  if (isLinkunlockerVerifyPage()) void runVerify();
};

export function initLinkunlockerGate(): void {
  if (window !== window.top) return;
  void canBypass('linkunlocker').then((ok) => {
    if (!ok) return;
    tick();
    new MutationObserver(tick).observe(document.documentElement, {
      attributeFilter: ['class', 'style', 'hidden', 'id'],
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    });
    const titleEl = document.querySelector('title');
    if (titleEl) {
      new MutationObserver(tick).observe(titleEl, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tick, true);
    window.addEventListener('load', tick, true);
    window.setInterval(() => {
      if (!started) tick();
    }, 400);
  });
}
