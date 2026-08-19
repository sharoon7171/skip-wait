import { isRemoteSite } from '../../hosts/check';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';

const OVERLAY_ID = 'skip-wait-gplinks-mediator';
const RUN_KEY = 'skip-wait-gplinks-mediator-run';
const TICK_MS = 250;

type GpfBoot = { rest: string; cookie?: string };
type GpfTiming = { total_ms?: number };
type GpfConfig = {
  rest: string;
  nonce: string;
  step?: string;
  steps?: string;
  timing?: GpfTiming;
};
type GpfState = {
  active?: boolean;
  step?: number;
  steps?: number;
  waited_ms?: number;
  timing?: GpfTiming;
};
type GpfAdvance = {
  status?: string;
  url?: string;
  seconds?: number;
  message?: string;
  step?: number;
  steps?: number;
};
type GpfRender = {
  active?: boolean;
  token?: string;
  config?: GpfConfig;
};

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const parseJsonAssign = (src: string, name: string): unknown | null => {
  const m = src.match(new RegExp(`(?:var|let|const)\\s+${name}\\s*=\\s*`));
  if (!m || m.index === undefined) return null;
  const start = m.index + m[0].length;
  if (src[start] !== '{') return null;
  let depth = 0;
  let quote: '"' | "'" | null = null;
  let esc = false;
  for (let i = start; i < src.length; i++) {
    const c = src[i]!;
    if (quote) {
      if (esc) {
        esc = false;
        continue;
      }
      if (c === '\\') {
        esc = true;
        continue;
      }
      if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'") {
      quote = c;
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(src.slice(start, i + 1)) as unknown;
        } catch {
          return null;
        }
      }
    }
  }
  return null;
};

const scriptBlobs = (): string[] => {
  const out: string[] = [];
  const extra = document.getElementById('gpf-flow-js-extra');
  if (extra?.textContent) out.push(extra.textContent);
  for (const s of document.scripts) {
    const t = s.textContent;
    if (t && (t.includes('gpfConfig') || t.includes('gpfBoot'))) out.push(t);
  }
  return out;
};

const readBoot = (): GpfBoot | null => {
  for (const blob of scriptBlobs()) {
    const raw = parseJsonAssign(blob, 'gpfBoot');
    if (!raw || typeof raw !== 'object') continue;
    const rest = (raw as { rest?: unknown }).rest;
    if (typeof rest === 'string' && rest) {
      const cookie = (raw as { cookie?: string }).cookie;
      return cookie ? { rest, cookie } : { rest };
    }
  }
  return null;
};

const readConfigFromDom = (): GpfConfig | null => {
  for (const blob of scriptBlobs()) {
    const raw = parseJsonAssign(blob, 'gpfConfig');
    if (!raw || typeof raw !== 'object') continue;
    const cfg = raw as Partial<GpfConfig>;
    if (typeof cfg.rest === 'string' && typeof cfg.nonce === 'string' && cfg.rest && cfg.nonce) {
      return cfg as GpfConfig;
    }
  }
  return null;
};

const isGpfPage = (): boolean => {
  if (readBoot() || readConfigFromDom()) return true;
  return !!document.querySelector('[data-gpf-mount], #gpf-flow-js, #gpf-flow-js-extra, .gpf-flow');
};

const postId = (): string | null => {
  const m = document.body?.className.match(/postid-(\d+)/);
  return m?.[1] ?? null;
};

const fetchRender = async (boot: GpfBoot): Promise<GpfConfig | null> => {
  let url = `${boot.rest}render`;
  const id = postId();
  if (id) url += `?post=${encodeURIComponent(id)}`;
  const r = await fetch(url, {
    credentials: 'same-origin',
    headers: { 'X-Requested-With': 'gpf' },
  });
  if (!r.ok) return null;
  const data = (await r.json()) as GpfRender;
  if (!data.active || !data.config?.rest || !data.config.nonce) return null;
  return data.config;
};

const resolveConfig = async (): Promise<GpfConfig | null> => {
  const fromDom = readConfigFromDom();
  if (fromDom) return fromDom;
  const boot = readBoot();
  if (!boot) return null;
  return fetchRender(boot);
};

const waitConfig = async (timeoutMs = 20_000): Promise<GpfConfig | null> => {
  const end = Date.now() + timeoutMs;
  while (Date.now() < end) {
    const cfg = await resolveConfig();
    if (cfg) return cfg;
    await sleep(250);
  }
  return resolveConfig();
};

const getState = async (cfg: GpfConfig): Promise<GpfState> => {
  const r = await fetch(`${cfg.rest}state`, {
    credentials: 'same-origin',
    headers: { 'X-WP-Nonce': cfg.nonce },
  });
  if (!r.ok) throw new Error(`gpf state ${r.status}`);
  return (await r.json()) as GpfState;
};

const postAdvance = async (cfg: GpfConfig, imps = 0): Promise<GpfAdvance> => {
  const r = await fetch(`${cfg.rest}advance`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': cfg.nonce,
    },
    body: JSON.stringify({ imps }),
  });
  if (!r.ok) throw new Error(`gpf advance ${r.status}`);
  return (await r.json()) as GpfAdvance;
};

const stripAdblockUi = (): void => {
  for (const el of document.querySelectorAll('[role="dialog"]')) {
    const t = el.textContent || '';
    if (/adblocker|ad blocker/i.test(t)) el.remove();
  }
  document.body?.style.removeProperty('overflow');
};

const stepMeta = (cfg: GpfConfig | null): { step: number; steps: number } => {
  const flow = document.querySelector('.gpf-flow');
  const step = Number(cfg?.step || flow?.getAttribute('data-step') || 1);
  const steps = Number(cfg?.steps || flow?.getAttribute('data-steps') || step);
  return { step, steps };
};

let ui: FullPageOverlay | null = null;

const stepNote = (step: number, steps: number) => ({
  lead: 'Unlocking your link',
  detail: `Step ${step} of ${steps}`,
});

const mountUi = (step: number, steps: number): FullPageOverlay => {
  const note = stepNote(step, steps);
  if (ui) {
    ui.setNote(note);
    ui.setStatus('Getting ready…');
    return ui;
  }
  ui = createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note,
    status: 'Getting ready…',
    countdownLabel: 'Ready in',
  });
  return ui;
};

const remainingMs = (st: GpfState, cfg: GpfConfig): number => {
  const need = st.timing?.total_ms ?? cfg.timing?.total_ms ?? 30_000;
  return Math.max(0, need - (st.waited_ms ?? 0));
};

const waitUntil = async (endTs: number): Promise<void> => {
  for (;;) {
    const left = endTs - Date.now();
    if (left <= 0) return;
    await sleep(Math.min(TICK_MS, left));
  }
};

const waitServerReady = async (cfg: GpfConfig, overlay: FullPageOverlay): Promise<GpfState> => {
  for (;;) {
    const st = await getState(cfg);
    if (st.active === false) throw new Error('gpf inactive');
    const left = remainingMs(st, cfg);
    if (left <= 0) {
      overlay.hideCountdown();
      return st;
    }
    const endTs = Date.now() + left;
    overlay.setStatus('Completing this step…');
    overlay.startCountdown(endTs);
    await waitUntil(endTs);
  }
};

const runGpf = async (overlay: FullPageOverlay): Promise<void> => {
  stripAdblockUi();
  const cfg = await waitConfig();
  if (!cfg) {
    sessionStorage.removeItem(RUN_KEY);
    overlay.setStatus('Could not load this page. Reload and try again.');
    return;
  }

  const { step, steps } = stepMeta(cfg);
  overlay.setNote(stepNote(step, steps));

  for (let attempt = 0; attempt < 8; attempt++) {
    const live = (await resolveConfig()) ?? cfg;
    await waitServerReady(live, overlay);
    overlay.setStatus('Continuing…');
    const data = await postAdvance(live, 0);

    if (data.status === 'next' || data.status === 'complete') {
      if (!data.url) {
        sessionStorage.removeItem(RUN_KEY);
        overlay.setStatus(data.message || 'Could not continue. Reload and try again.');
        return;
      }
      overlay.setStatus(data.status === 'complete' ? 'Opening your link…' : 'Opening the next page…');
      location.assign(data.url);
      return;
    }

    if (data.status === 'wait' || data.status === 'retry') {
      const sec = Math.max(0, data.seconds ?? 0);
      if (sec > 0) {
        const endTs = Date.now() + sec * 1000;
        overlay.setStatus('Almost ready…');
        overlay.startCountdown(endTs);
        await waitUntil(endTs);
        overlay.hideCountdown();
      }
      continue;
    }

    sessionStorage.removeItem(RUN_KEY);
    if (data.status === 'expired' || data.status === 'no_session') {
      overlay.setStatus(data.message || 'This link expired. Open the short link again.');
      return;
    }

    overlay.setStatus(data.message || 'Something went wrong. Reload and try again.');
    return;
  }

  sessionStorage.removeItem(RUN_KEY);
  overlay.setStatus('Still waiting on the page. Reload and try again.');
};

export function initGplinksMediator(): void {
  void Promise.all([isRemoteSite('gplinks-mediator'), isRemoteSite('gplinks')]).then(
    ([mediator, main]) => {
      if (!mediator || main) return;

      let started = false;
      let covered = false;

      const coverIfMediator = (): void => {
        if (covered || !isGpfPage()) return;
        if (sessionStorage.getItem(RUN_KEY) === location.href) return;
        covered = true;
        const { step, steps } = stepMeta(readConfigFromDom());
        mountUi(step, steps);
      };

      const tryStart = (): void => {
        if (sessionStorage.getItem(RUN_KEY) === location.href) return;
        coverIfMediator();
        if (started || !isGpfPage()) return;
        started = true;
        sessionStorage.setItem(RUN_KEY, location.href);
        const { step, steps } = stepMeta(readConfigFromDom());
        const overlay = mountUi(step, steps);
        void runGpf(overlay).catch((err: unknown) => {
          sessionStorage.removeItem(RUN_KEY);
          const msg =
            err instanceof Error && err.message === 'gpf inactive'
              ? 'No active session. Open the short link again.'
              : 'Something went wrong. Reload and try again.';
          overlay.setStatus(msg);
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
