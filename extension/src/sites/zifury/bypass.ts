import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { whenDomParsed } from '../../utils/domain-check';

const OVERLAY_ID = 'skip-wait-zifury-overlay';
const BOOT_ID = 'skip-wait-zifury-boot';
const FILE_GATE = /^\/[^/]+\/[^/]+\.[a-z0-9]+$/i;
const POLL_MS = 250;
const MAX_POLLS = 120;

type Gate = {
  payload: string;
  filename: string;
  final: boolean;
  nextUrl: string | null;
  guestLabel: string;
  fetchLabel: string;
  readyLabel: string;
  nextLabel: string;
  tier: string;
};

type Phase = 'start' | 'fetch' | 'ready' | 'next';

type OydirResponse = { success?: boolean; url?: string; error?: string };

let ui: FullPageOverlay | null = null;
let phase: Phase | null = null;
let pulse: number | null = null;
let statusBase = '';
let started = false;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const norm = (text: string): string => text.replace(/\s+/g, ' ').trim();

const unescapeJsUrl = (raw: string): string =>
  raw.replace(/\\u003A/gi, ':').replace(/\\u002F/gi, '/').replace(/\\u00253D/gi, '=');

const readGuestLabel = (): string => norm(document.querySelector('.free-element')?.textContent ?? '');

const readFilename = (): string =>
  document.querySelector('.flex-grow-1.text-truncate p.text-info')?.textContent?.trim() ?? '';

const readTier = (): string => {
  for (const el of document.querySelectorAll('.card-body p.fs-16.fw-semibold')) {
    const text = el.textContent?.trim();
    if (text && !/BOOST|QUANTUM/i.test(text)) return text;
  }
  return '';
};

const readScriptText = (source: string, pattern: RegExp): string => source.match(pattern)?.[0] ?? '';

const parseGate = (source: string): Omit<Gate, 'guestLabel' | 'fetchLabel' | 'readyLabel' | 'nextLabel' | 'tier'> | null => {
  const payload = source.match(/payload:\s*'([^']+)'/)?.[1]?.trim();
  const filename =
    source.match(/filename:\s*'((?:\\u002D|[^'])+)'/)?.[1]?.replace(/\\u002D/g, '-') ??
    readFilename();
  const final = source.match(/isFinalStep:\s*(true|false)/)?.[1] === 'true';
  const nextRaw = source.match(/nextDownloadLink:\s*'((?:\\u003A|\\u002F|\\u00253D|[^'])+)'/)?.[1];
  if (!payload || !filename) return null;
  return { payload, filename, final, nextUrl: nextRaw ? unescapeJsUrl(nextRaw) : null };
};

const readGate = (): Gate | null => {
  const source = document.documentElement.outerHTML;
  const core = parseGate(source);
  if (!core) return null;
  const guestLabel = readGuestLabel();
  if (!guestLabel) return null;
  return {
    ...core,
    guestLabel,
    fetchLabel: readScriptText(source, /Fetching download link\.\.\./) || 'Fetching download link...',
    readyLabel: `Download (${core.filename})`,
    nextLabel: readScriptText(source, /NEXT STEP/) || 'NEXT STEP',
    tier: readTier(),
  };
};

const phaseCopy = (gate: Gate, step: Phase) => {
  const detail = gate.tier ? `${gate.tier} · ${gate.filename}` : gate.filename;
  if (step === 'start') return { lead: gate.guestLabel, detail };
  if (step === 'fetch') return { lead: gate.fetchLabel, detail: gate.readyLabel };
  if (step === 'next') return { lead: gate.nextLabel, detail: gate.filename };
  return { lead: gate.readyLabel, detail: gate.filename };
};

const stopPulse = (): void => {
  if (pulse == null) return;
  clearInterval(pulse);
  pulse = null;
};

const startPulse = (base: string): void => {
  stopPulse();
  statusBase = base;
  let tick = 0;
  ui!.setStatus(`${base}.`);
  pulse = window.setInterval(() => {
    tick = (tick + 1) % 3;
    ui!.setStatus(`${statusBase}${'.'.repeat(tick + 1)}`);
  }, 450);
};

const bootOverlay = (): void => {
  document.documentElement.classList.add(overlayActiveClass(OVERLAY_ID));
  if (document.getElementById(BOOT_ID)) return;
  const style = document.createElement('style');
  style.id = BOOT_ID;
  style.textContent =
    buildFullPageOverlayCss(OVERLAY_ID, overlayActiveClass(OVERLAY_ID)) +
    '.free-element,.download-now{display:none!important}';
  (document.head || document.documentElement).appendChild(style);
};

const paint = (gate: Gate, step: Phase): void => {
  if (step === phase) return;
  phase = step;
  const { lead, detail } = phaseCopy(gate, step);
  ui!.setNote({ lead, detail });
  startPulse(lead);
};

const mountOverlay = (gate: Gate, step: Phase): FullPageOverlay => {
  bootOverlay();
  const { lead, detail } = phaseCopy(gate, step);
  if (ui) {
    paint(gate, step);
    ui.setError(null);
    return ui;
  }
  phase = step;
  statusBase = lead;
  ui = createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note: { lead, detail },
    status: `${lead}.`,
  });
  startPulse(lead);
  return ui;
};

const mergeGate = (prev: Gate, source: string): Gate | null => {
  const core = parseGate(source);
  if (!core) return null;
  return {
    ...prev,
    ...core,
    fetchLabel: readScriptText(source, /Fetching download link\.\.\./) || prev.fetchLabel,
    nextLabel: readScriptText(source, /NEXT STEP/) || prev.nextLabel,
    readyLabel: `Download (${core.filename})`,
  };
};

const oydirLink = async (payload: string): Promise<OydirResponse> => {
  const res = await fetch(`${location.origin}/oydir-link`, {
    method: 'POST',
    credentials: 'same-origin',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: new URLSearchParams({ payload }).toString(),
  });
  return (await res.json()) as OydirResponse;
};

const pollOydir = async (gate: Gate): Promise<string> => {
  paint(gate, 'fetch');
  for (let i = 0; i < MAX_POLLS; i++) {
    const body = await oydirLink(gate.payload);
    if (body.success && body.url) return body.url;
    await sleep(POLL_MS);
  }
  throw new Error('Secure link generation timed out');
};

const resolveChain = async (gate: Gate): Promise<string> => {
  let step = gate;
  for (;;) {
    if (step.final) return pollOydir(step);
    if (!step.nextUrl) throw new Error('Missing next download step');
    paint(step, 'next');
    const html = await fetch(step.nextUrl, { credentials: 'same-origin', cache: 'no-store' }).then((r) => {
      if (!r.ok) throw new Error('Next step unavailable');
      return r.text();
    });
    const next = mergeGate(step, html);
    if (!next) throw new Error('Could not read next download gate');
    step = next;
  }
};

const unlock = async (gate: Gate): Promise<void> => {
  mountOverlay(gate, 'start');
  const url = await resolveChain(gate);
  paint(gate, 'ready');
  location.assign(url);
};

export function initZifuryBypass(): void {
  if (window !== window.top || started || !FILE_GATE.test(location.pathname)) return;
  void canBypass('zifury').then((ok) => {
    if (!ok || started) return;
    whenDomParsed(() => {
      if (!document.querySelector('.download-container .free-element')) return;
      const gate = readGate();
      if (!gate) return;
      started = true;
      void unlock(gate).catch((err) => {
        started = false;
        stopPulse();
        mountOverlay(gate, 'fetch');
        ui!.setError(err instanceof Error ? err.message : String(err));
      });
    });
  });
}
