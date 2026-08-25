import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';

const OVERLAY_ID = 'skip-wait-gaea-operations-lockr-overlay';
const BOOT_STYLE_ID = 'skip-wait-gaea-operations-lockr-boot';
const RESERVED = /^(auth|browse|dashboard|subscriptions|api-keys|terms-of-service|privacy-policy|discord|premium-auth)$/i;
const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "Skip Wait is working. You don't need to tap anything.",
} as const;

let started = false;

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const api = async <T>(path: string): Promise<T> => {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json() as Promise<T>;
};

const mount = (status: string): FullPageOverlay => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (!document.getElementById(BOOT_STYLE_ID)) {
    const el = document.createElement('style');
    el.id = BOOT_STYLE_ID;
    el.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
    document.documentElement.appendChild(el);
  }
  return createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note: NOTE,
    status,
    countdownLabel: 'Your link opens in',
  });
};

const resolve = async (id: string, overlay: FullPageOverlay): Promise<string> => {
  const { data } = await api<{
    data: { token: string; waitingTimeSeconds: number; tasks: unknown[] };
  }>(`/api/v1/lockers/${id}/view`);
  if (!data.token) throw new Error('Unlock token missing.');

  if (data.tasks.length) {
    overlay.setStatus('Completing tasks…');
    const task = `/api/v1/lockers/${id}/task?token=${encodeURIComponent(data.token)}`;
    await Promise.all(data.tasks.map(() => api(task)));
  }

  if (data.waitingTimeSeconds > 0) {
    overlay.setStatus('Unlocking destination…');
    overlay.startCountdown(Date.now() + data.waitingTimeSeconds * 1000);
    await sleep(data.waitingTimeSeconds * 1000);
    overlay.hideCountdown();
  }

  overlay.setStatus('Unlocking destination…');
  const target = (
    await api<{ data?: { target?: string } }>(
      `/api/v1/lockers/${id}/unlock?token=${encodeURIComponent(data.token)}`,
    )
  ).data?.target;
  if (!target || !/^https?:\/\//i.test(target)) throw new Error('Unlock not ready.');
  return target;
};

export function initGaeaOperationsLockrGate(): void {
  if (window !== window.top || started) return;
  const id = location.pathname.replace(/^\/+|\/+$/g, '');
  if (!id || id.includes('/') || RESERVED.test(id)) return;
  void canBypass('gaea-operations-lockr').then((ok) => {
    if (!ok || started) return;
    started = true;
    const overlay = mount('Unlocking your link…');
    void resolve(id, overlay)
      .then((target) => {
        overlay.setStatus('Opening your link…');
        location.replace(target);
      })
      .catch((err: unknown) => {
        started = false;
        overlay.hideCountdown();
        overlay.setStatus('Something went wrong.');
        overlay.setError(err instanceof Error ? err.message : String(err));
      });
  });
}
