import { isRemoteSite } from '../../hosts/check';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';

const OVERLAY_ID = 'skip-wait-gplinks-mediator';
const BOOT_STYLE_ID = 'skip-wait-gplinks-mediator-boot';
const RUN_KEY = 'skip-wait-gplinks-mediator-run';
const WAITED_COOKIE = 'sw_waited';
const ADS_FORM_SEL = '#adsForm, form[name="ads-track-data"]';
const STEP_WRITTEN_MS = 15_000;
const REAL_TIME_FACTOR = 2;
const TICK_MS = 250;
const SEED_POLL_MS = 2_000;
const COOKIE_MAX_AGE_SEC = 600;

type Seed = {
  lid: string;
  pid: string;
  vid: string;
  pages: number;
  step: number;
};

const NOTE = {
  lead: 'Unlocking your link',
  detail: 'Skip Wait is completing the required wait, then opening your unlock page.',
} as const;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const cookie = (name: string): string | null => {
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return m?.[1] ? decodeURIComponent(m[1]) : null;
};

const setCookie = (name: string, value: string): void => {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; Max-Age=${COOKIE_MAX_AGE_SEC}; Secure`;
};

const readSeed = (): Seed | null => {
  const lid = cookie('lid');
  const pid = cookie('pid');
  const vid = cookie('vid');
  const pages = Number(cookie('pages') || 0);
  const step = Number(cookie('step_count') || 0);
  if (!lid || !pid || !vid || !Number.isFinite(pages) || pages < 1) return null;
  return { lid, pid, vid, pages, step: Number.isFinite(step) && step > 0 ? step : 0 };
};

const isAdsMediator = (): boolean =>
  !!document.querySelector(ADS_FORM_SEL) || !!(cookie('lid') && cookie('pid') && cookie('vid'));

const unlockUrl = (seed: Seed): string =>
  `https://gplinks.co/${encodeURIComponent(seed.lid)}?pid=${encodeURIComponent(seed.pid)}&vid=${encodeURIComponent(seed.vid)}`;

const writtenStepMs = (): number => {
  const n = parseInt(document.getElementById('myTimer')?.textContent?.trim() ?? '', 10);
  return Number.isFinite(n) && n > 0 ? n * 1000 : STEP_WRITTEN_MS;
};

const waitSeed = async (): Promise<Seed | null> => {
  const end = Date.now() + SEED_POLL_MS;
  for (;;) {
    const seed = readSeed();
    if (seed) return seed;
    if (Date.now() >= end) return null;
    await sleep(200);
  }
};

const waitUntil = async (endTs: number): Promise<void> => {
  for (;;) {
    const left = endTs - Date.now();
    if (left <= 0) return;
    await sleep(Math.min(TICK_MS, left));
  }
};

const postStep = async (seed: Seed, stepId: number, nextTarget: string): Promise<void> => {
  setCookie('step_count', String(stepId));
  setCookie('imps', '1');
  await fetch(location.href, {
    method: 'POST',
    credentials: 'include',
    redirect: 'manual',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      form_name: 'ads-track-data',
      step_id: String(stepId),
      ad_impressions: '1',
      visitor_id: seed.vid,
      next_target: nextTarget,
    }),
  });
};

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

const mountUi = (status = 'Getting ready…'): FullPageOverlay => {
  bootOverlayLock();
  if (ui) {
    ui.setNote(NOTE);
    ui.setStatus(status);
    return ui;
  }
  ui = createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note: NOTE,
    status,
    countdownLabel: 'Ready in',
  });
  return ui;
};

const runMediator = async (overlay: FullPageOverlay): Promise<void> => {
  overlay.setStatus('Starting session…');
  const seed = await waitSeed();
  if (!seed) {
    sessionStorage.removeItem(RUN_KEY);
    overlay.setStatus('No active session. Open the short link again.');
    return;
  }

  const remaining = Math.max(0, seed.pages - seed.step);
  overlay.setNote({
    lead: NOTE.lead,
    detail: `${seed.pages} step${seed.pages === 1 ? '' : 's'} after the server wait.`,
  });

  const waitMs = remaining * writtenStepMs() * REAL_TIME_FACTOR;
  if (waitMs > 0 && cookie(WAITED_COOKIE) !== seed.vid) {
    const endTs = Date.now() + waitMs;
    overlay.setStatus('Server wait required…');
    overlay.startCountdown(endTs);
    await waitUntil(endTs);
    overlay.hideCountdown();
    setCookie(WAITED_COOKIE, seed.vid);
  }

  const unlock = unlockUrl(seed);
  for (let step = seed.step; step < seed.pages; ) {
    const nextStep = step + 1;
    overlay.setStatus(`Completing step ${nextStep} of ${seed.pages}…`);
    await postStep(seed, nextStep, nextStep >= seed.pages ? unlock : location.href);
    step = nextStep;
  }

  overlay.setStatus('Opening unlock page…');
  sessionStorage.removeItem(RUN_KEY);
  location.assign(unlock);
};

export function initGplinksMediator(): void {
  void Promise.all([isRemoteSite('gplinks-mediator'), isRemoteSite('gplinks')]).then(
    ([mediator, main]) => {
      if (!mediator || main) return;

      let started = false;
      let covered = false;

      const cover = (): void => {
        if (covered || !isAdsMediator()) return;
        if (sessionStorage.getItem(RUN_KEY) === location.href) return;
        covered = true;
        mountUi();
      };

      const tryStart = (): void => {
        if (sessionStorage.getItem(RUN_KEY) === location.href) return;
        cover();
        if (started || !isAdsMediator()) return;
        started = true;
        sessionStorage.setItem(RUN_KEY, location.href);
        const overlay = mountUi();
        void runMediator(overlay).catch(() => {
          sessionStorage.removeItem(RUN_KEY);
          overlay.setStatus('Something went wrong. Reload and try again.');
        });
      };

      tryStart();
      if (started) return;

      const mo = new MutationObserver(() => {
        tryStart();
        if (started) mo.disconnect();
      });
      mo.observe(document.documentElement, { childList: true, subtree: true });

      const onReady = (): void => {
        tryStart();
        if (started || document.readyState === 'complete') {
          document.removeEventListener('readystatechange', onReady);
          if (started) mo.disconnect();
        }
      };
      document.addEventListener('readystatechange', onReady);
    },
  );
}
