import { isRemoteSite } from '../../hosts/check';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { whenDomParsed } from '../../utils/domain-check';

const OVERLAY_ID = 'skip-wait-sub2unlock-overlay';
const BOOT_STYLE_ID = 'skip-wait-sub2unlock-boot';

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;

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

const destination = (): string | null => {
  const raw = document.getElementById('__NEXT_DATA__')?.textContent?.trim();
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as {
      props?: { pageProps?: { sink?: { data?: { unlocked_link?: unknown } } } };
    };
    const url = data.props?.pageProps?.sink?.data?.unlocked_link;
    return typeof url === 'string' && /^https?:\/\//i.test(url.trim()) ? url.trim() : null;
  } catch {
    return null;
  }
};

const unlock = (): void => {
  const url = destination();
  if (!url) return;
  const overlay = mountUi('Unlocking your link…');
  overlay.setStatus('Opening your link…');
  location.replace(url);
};

export function initSub2unlockUnlock(): void {
  if (window !== window.top) return;
  const allowed = isRemoteSite('sub2unlock');
  whenDomParsed(() => {
    if (!destination()) return;
    void allowed.then((ok) => {
      if (!ok) return;
      bootOverlayLock();
      mountUi('Getting things ready…');
      unlock();
    });
  });
}
