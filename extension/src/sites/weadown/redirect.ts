import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { whenDomParsed } from '../../utils/domain-check';

const OVERLAY_ID = 'skip-wait-weadown-overlay';
const BOOT_ID = 'skip-wait-weadown-boot';
const FILES_GATE = /^\/files\/(?!go\/)([^/]+)\/?$/i;
const ZMK_MIN_WAIT_MS = 2_000;
const ZMK_POLL_MS = 400;

type Gate = {
  slug: string;
  startUrl: string;
  completeUrl: string;
  startLabel: string;
  waitingLabel: string;
  readyLabel: string;
  pageHint: string;
};

type Phase = 'start' | 'wait' | 'ready';

type ZmkItem = { ok?: boolean; token?: string; go_url?: string; code?: string; message?: string };

let ui: FullPageOverlay | null = null;
let phase: Phase | null = null;
let pulse: number | null = null;
let statusBase = '';

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const stripWaitText = (text: string): string =>
  text.replace(/\{loader\}|\{seconds\}/gi, '').replace(/\s+/g, ' ').trim();

const zmkRequestId = (): string => {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
};

const phaseCopy = (gate: Gate, step: Phase) => {
  if (step === 'start') return { lead: gate.startLabel, detail: gate.pageHint };
  if (step === 'wait') return { lead: gate.waitingLabel, detail: gate.readyLabel };
  return { lead: gate.readyLabel, detail: gate.pageHint };
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
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_ID)) return;
  const style = document.createElement('style');
  style.id = BOOT_ID;
  style.textContent =
    buildFullPageOverlayCss(OVERLAY_ID, active) +
    '.fc-message-root,.fc-dialog-overlay{display:none!important;visibility:hidden!important}';
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
  if (ui) {
    paint(gate, step);
    ui.setError(null);
    return ui;
  }
  const { lead, detail } = phaseCopy(gate, step);
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

const zmkPost = async (url: string, payload: Record<string, string>): Promise<{ items?: ZmkItem[] }> => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    body: new URLSearchParams(payload).toString(),
  });
  const body = (await res.json()) as { items?: ZmkItem[]; message?: string };
  if (!res.ok) throw new Error(body.message);
  return body;
};

const zmkStart = async (gate: Gate): Promise<string> => {
  const item = (await zmkPost(gate.startUrl, { request_id: zmkRequestId(), slugs: gate.slug })).items?.[0];
  if (!item?.ok || !item.token) throw new Error(item?.message);
  return item.token;
};

const zmkComplete = async (gate: Gate, token: string): Promise<string> => {
  for (let i = 0; i < 120; i++) {
    const item = (await zmkPost(gate.completeUrl, { tokens: token })).items?.[0];
    if (item?.ok && item.go_url) return item.go_url;
    if (item?.code === 'zmk_too_early') {
      paint(gate, 'wait');
      await sleep(ZMK_POLL_MS);
      continue;
    }
    throw new Error(item?.message);
  }
  throw new Error('Secure link generation timed out');
};

const submitGoUrl = (goUrl: string): void => {
  const form = document.createElement('form');
  form.method = 'post';
  form.action = goUrl;
  form.hidden = true;
  form.setAttribute('rel', 'nofollow noopener noreferrer');
  const marker = document.createElement('input');
  marker.type = 'hidden';
  marker.name = 'zmk_navigation';
  marker.value = '1';
  form.append(marker);
  document.body.append(form);
  recordBypassSuccess();
  form.submit();
  form.remove();
};

const readPageHint = (anchor: Element): string | null => {
  let node = anchor.closest('.td_block_wrap')?.previousElementSibling ?? null;
  while (node) {
    const hint = node.querySelector('.td-block-title span')?.textContent?.trim();
    if (hint) return hint;
    node = node.previousElementSibling;
  }
  return null;
};

const readGate = (): Gate | null => {
  const anchor = document.querySelector<HTMLAnchorElement>(
    '.zmk-file-link[data-slug][data-start-url][data-complete-url][data-waiting-text][data-ready-text]',
  );
  if (!anchor) return null;
  const slug = anchor.dataset['slug']?.trim();
  const startUrl = anchor.dataset['startUrl']?.trim();
  const completeUrl = anchor.dataset['completeUrl']?.trim();
  const waitingText = anchor.dataset['waitingText']?.trim();
  const readyText = anchor.dataset['readyText']?.trim();
  const startLabel = anchor.querySelector('.zmk-file-button')?.textContent?.trim();
  const pageHint = readPageHint(anchor);
  if (!slug || !startUrl || !completeUrl || !waitingText || !readyText || !startLabel || !pageHint) return null;
  return {
    slug,
    startUrl,
    completeUrl,
    startLabel,
    waitingLabel: stripWaitText(waitingText),
    readyLabel: readyText,
    pageHint,
  };
};

const unlock = async (gate: Gate): Promise<void> => {
  mountOverlay(gate, 'start');
  const token = await zmkStart(gate);
  paint(gate, 'wait');
  await sleep(ZMK_MIN_WAIT_MS);
  const goUrl = await zmkComplete(gate, token);
  paint(gate, 'ready');
  submitGoUrl(goUrl);
};

export function initWeadownRedirect(): void {
  if (!FILES_GATE.test(location.pathname)) return;
  whenDomParsed(() => {
    const gate = readGate();
    if (!gate) return;
    void canBypass('weadown').then((ok) => {
      if (!ok) return;
      void unlock(gate).catch((err) => {
        stopPulse();
        mountOverlay(gate, 'wait');
        ui!.setError(err instanceof Error ? err.message : String(err));
      });
    });
  });
}
