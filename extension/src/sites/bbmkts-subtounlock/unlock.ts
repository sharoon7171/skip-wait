import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { whenDomParsed } from '../../utils/domain-check';
import { bbmktsSubtounlockId } from './hosts';

const OVERLAY_ID = 'skip-wait-bbmkts-subtounlock-overlay';
const BOOT_STYLE_ID = 'skip-wait-bbmkts-subtounlock-boot';
const GETLINK = 'https://game.binhbun.com/getlink';
const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to complete the subscribe steps.",
} as const;

let ui: FullPageOverlay | null = null;
let started = false;

const mountUi = (status = 'Getting things ready…'): FullPageOverlay => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (!document.getElementById(BOOT_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = BOOT_STYLE_ID;
    style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
    (document.head || document.documentElement).appendChild(style);
  }
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

const linkfileFromApi = async (id: string): Promise<string | null> => {
  const res = await fetch(`${GETLINK}?id=${encodeURIComponent(id)}`, {
    credentials: 'omit',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { data?: { linkfile?: unknown } };
  const url = json.data?.linkfile;
  return typeof url === 'string' && /^https?:\/\//i.test(url.trim()) ? url.trim() : null;
};

const run = async (): Promise<void> => {
  const id = bbmktsSubtounlockId();
  if (!id) return;
  const overlay = mountUi('Unlocking your link…');
  const dest = await linkfileFromApi(id);
  if (!dest) {
    overlay.setError('Destination not found. Reload and try again.');
    return;
  }
  overlay.setStatus('Opening your link…');
  recordBypassSuccess();
  location.replace(dest);
};

const kick = (): void => {
  if (started || !bbmktsSubtounlockId()) return;
  started = true;
  void run().catch(() => {
    const overlay = mountUi('Unlocking your link…');
    overlay.setError('Unlock failed. Reload and try again.');
  });
};

export function initBbmktsSubtounlock(): void {
  if (window !== window.top || !bbmktsSubtounlockId()) return;
  void canBypass('bbmkts-subtounlock').then((ok) => {
    if (!ok) return;
    mountUi();
    whenDomParsed(kick);
  });
}
