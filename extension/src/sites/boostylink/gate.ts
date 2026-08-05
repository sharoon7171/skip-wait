import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { isAllowedHost } from '../../utils/domain-check';
import { BOOSTYLINK_HOSTS } from './hosts';

const OVERLAY_ID = 'skip-wait-boostylink-overlay';
const BOOT_STYLE_ID = 'skip-wait-boostylink-boot';
const WAIT_MS = 20_000;
const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

type ApiJson = {
  status?: string;
  wait_left?: number;
  message?: string;
  data?: { destination_url?: string };
};

let ui: FullPageOverlay | null = null;
let started = false;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const boot = (): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BOOT_STYLE_ID;
  style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head || document.documentElement).appendChild(style);
};

const mountUi = (status = 'Getting things ready…'): FullPageOverlay => {
  boot();
  if (ui) {
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

const isLockerPage = (): boolean =>
  Boolean(
    document.querySelector<HTMLButtonElement>('.unlock-btn[data-link]')?.dataset['link'] &&
      document.querySelector('.action-btn[data-linkactionid]'),
  );

const postJson = async (url: string, body: Record<string, string>): Promise<ApiJson> => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    body: new URLSearchParams(body),
  });
  return (await res.json().catch(() => ({}))) as ApiJson;
};

const completeAction = async (id: string): Promise<void> => {
  for (;;) {
    const data = await postJson('/api/locker_action_complete.php', { link_action_id: id });
    if (data.status === 'ok') return;
    if (data.status === 'too_early' || data.status === 'too_fast') {
      await sleep((Number(data.wait_left) || 1) * 1000);
      continue;
    }
    throw new Error(typeof data.message === 'string' ? data.message : 'Action complete failed');
  }
};

const unlockDestination = async (overlay: FullPageOverlay): Promise<string> => {
  const linkId = document.querySelector<HTMLButtonElement>('.unlock-btn')?.dataset['link']?.trim();
  const ids = [...document.querySelectorAll<HTMLAnchorElement>('.action-btn[data-linkactionid]')]
    .map((a) => a.dataset['linkactionid']?.trim() || '')
    .filter(Boolean);
  if (!linkId || ids.length === 0) throw new Error('Locker actions not found.');

  overlay.setStatus('Starting unlock…');
  const starts = await Promise.all(
    ids.map((id) => postJson('/api/locker_action_start.php', { link_action_id: id })),
  );
  if (starts.some((s) => s.status !== 'ok')) throw new Error('Action start failed.');

  overlay.setStatus('Waiting for unlock timer…');
  overlay.startCountdown(Date.now() + WAIT_MS);
  await sleep(WAIT_MS);
  overlay.hideCountdown();

  overlay.setStatus('Completing actions…');
  await Promise.all(ids.map((id) => completeAction(id)));

  overlay.setStatus('Unlocking destination…');
  const done = await postJson('', { link_id: linkId });
  const dest = done.data?.destination_url?.trim() || '';
  if (done.status !== 'ok' || !/^https?:\/\//i.test(dest)) {
    throw new Error(typeof done.message === 'string' ? done.message : 'Destination missing.');
  }
  return dest;
};

const run = async (): Promise<void> => {
  if (started || !isLockerPage()) return;
  started = true;
  const overlay = mountUi('Getting things ready…');
  try {
    const dest = await unlockDestination(overlay);
    overlay.setStatus('Opening your link…');
    location.replace(dest);
  } catch (err) {
    started = false;
    overlay.setStatus('Something went wrong.');
    overlay.setError(err instanceof Error ? err.message : String(err));
  }
};

export function initBoostylinkGate(): void {
  if (window !== window.top || !isAllowedHost(BOOSTYLINK_HOSTS)) return;
  const tick = (): void => {
    if (isLockerPage()) void run();
  };
  tick();
  new MutationObserver(tick).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tick, true);
  window.addEventListener('load', tick, true);
}
