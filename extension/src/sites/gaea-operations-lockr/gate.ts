import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { isAllowedHost } from '../../utils/domain-check';
import { GAEA_OPERATIONS_LOCKR_HOSTS } from './hosts';

const OVERLAY_ID = 'skip-wait-gaea-operations-lockr-overlay';
const BOOT_STYLE_ID = 'skip-wait-gaea-operations-lockr-boot';
const RESERVED = /^(auth|browse|dashboard|subscriptions|api-keys|terms-of-service|privacy-policy|discord)$/i;

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "Skip Wait is working. You don't need to tap anything.",
} as const;

type GaeaLockrView = {
  data?: { targetDomain?: string };
};

let started = false;

function lockerId(): string | null {
  const seg = location.pathname.replace(/^\/+|\/+$/g, '');
  if (!seg || seg.includes('/') || RESERVED.test(seg)) return null;
  return seg;
}

function mountUi(status: string): FullPageOverlay {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (!document.getElementById(BOOT_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = BOOT_STYLE_ID;
    style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
    (document.head || document.documentElement).appendChild(style);
  }
  return createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note: NOTE,
    status,
  });
}

async function unlock(id: string, overlay: FullPageOverlay): Promise<void> {
  const res = await fetch(`/api/v1/lockers/${encodeURIComponent(id)}/view`);
  if (!res.ok) throw new Error(`View failed (${res.status})`);
  const body = (await res.json()) as GaeaLockrView;
  const td = body.data?.targetDomain?.trim();
  if (!td) throw new Error('Destination not found.');
  overlay.setStatus('Opening your link…');
  location.replace(`https://www.${td}/`);
}

export function initGaeaOperationsLockrGate(): void {
  if (window !== window.top || !isAllowedHost(GAEA_OPERATIONS_LOCKR_HOSTS) || started) return;
  const id = lockerId();
  if (!id) return;
  started = true;
  const overlay = mountUi('Unlocking your link…');
  void unlock(id, overlay).catch((err) => {
    overlay.setStatus('Something went wrong.');
    overlay.setError(err instanceof Error ? err.message : String(err));
  });
}
