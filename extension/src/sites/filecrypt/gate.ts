import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { whenDomParsed } from '../../utils/domain-check';
import { MSG_FILECRYPT_POW } from './hosts';

const OVERLAY_ID = 'skip-wait-filecrypt-overlay';
const MSG_SOURCE = 'skip-wait-filecrypt';

const NOTE = {
  lead: 'Unlocking downloads.',
  detail: 'Skipping the Filecrypt security check for you.',
} as const;

let started = false;
let ui: FullPageOverlay | null = null;

const mountUi = (status = 'Unlocking downloads…'): FullPageOverlay => {
  if (ui) {
    ui.setStatus(status);
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

const clearUi = (): void => {
  ui?.remove();
  ui = null;
};

const isUnlockedContainer = (): boolean =>
  !document.getElementById('pow-captcha') &&
  !!document.querySelector(
    'a.button.download, a[href*="/Link/"], .window.container, .dlcdownload, .cnl',
  );

export function initFilecryptGate(): void {
  if (started) return;
  if (!/\/Container\//i.test(location.pathname)) return;
  void canBypass('filecrypt').then((ok) => {
    if (!ok || started) return;
    started = true;

    mountUi('Unlocking downloads…');
    chrome.runtime.sendMessage({ type: MSG_FILECRYPT_POW }).catch(() => {});

    window.addEventListener('message', (ev) => {
      if (ev.origin !== location.origin) return;
      const data = ev.data as { source?: string; type?: string; text?: string } | null;
      if (!data || data.source !== MSG_SOURCE) return;
      if (data.type === 'done') {
        clearUi();
        return;
      }
      if (data.type === 'status' && data.text) {
        if (ui) ui.setStatus(data.text);
        return;
      }
      if (data.type === 'err') {
        mountUi('Couldn’t unlock this page.');
        ui?.setError('Try refreshing the page.');
      }
    });

    whenDomParsed(() => {
      if (isUnlockedContainer()) clearUi();
    });
  });
}
