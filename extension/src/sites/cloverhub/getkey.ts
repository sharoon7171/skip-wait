import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { overlayClasses } from '../../injected-ui/overlay-styles';
import { createClaim, fetchCurrentClaim, resetClaim, type ClaimCurrent } from './api';
import { MSG_CLOVER_LOOT_DONE, MSG_CLOVER_LOOT_PENDING, MSG_CLOVER_LOOT_SCAN } from './messages';

const OVERLAY_ID = 'skip-wait-cloverhub-overlay';
const POLL_MS = 1500;
const POLL_MAX = 60;

const STEPS = {
  check: { lead: 'Checking claim', detail: 'Looking for an active CloverHub key request' },
  create: { lead: 'Creating claim', detail: 'Starting a LootLabs-backed key request' },
  bypass: { lead: 'Bypassing LootLabs', detail: 'Confirming the checkpoint and fetching your key' },
  reset: { lead: 'Starting fresh', detail: 'Your last key was already used' },
  switch: { lead: 'Switching to LootLabs', detail: 'This provider is not supported for auto-bypass' },
} as const;

const COPY = {
  success: {
    lead: 'Your key is ready',
    detail: 'Copy it below and paste into CloverHub Access.',
  },
  failed: { lead: 'Could not generate key', detail: 'Refresh the page and try again.' },
} as const;

type StepCopy = { lead: string; detail: string };

const isGetkeyPage = (): boolean => {
  if (location.hostname !== 'cloverhub.app') return false;
  return location.pathname.replace(/\/+$/, '') === '/getkey';
};

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const createStepPulse = (ui: FullPageOverlay) => {
  let timer: number | null = null;
  let dots = 0;
  let lead = '';
  let detail = '';
  let step = 1;
  let total = 1;

  const paint = (): void => {
    ui.setNote({ lead: `${lead}${'.'.repeat(dots + 1)}`, detail });
    ui.setStatus(`Step ${step} of ${total}`);
  };

  return {
    begin(index: number, count: number, copy: StepCopy): void {
      step = index;
      total = count;
      lead = copy.lead;
      detail = copy.detail;
      dots = 0;
      paint();
      if (timer != null) return;
      timer = window.setInterval(() => {
        dots = (dots + 1) % 3;
        paint();
      }, 450);
    },
    stop(): void {
      if (timer != null) clearInterval(timer);
      timer = null;
    },
  };
};

const showKey = (ui: FullPageOverlay, key: string): void => {
  ui.setNote(COPY.success);
  ui.setStatus('');
  ui.setError(null);

  const mount = ui.turnstileMount;
  mount.replaceChildren();

  const code = document.createElement('code');
  code.textContent = key;
  code.style.cssText =
    'display:block;margin-top:4px;padding:14px 16px;border-radius:10px;background:rgba(0,0,0,.35);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.85em;line-height:1.45;color:#e2e8f0;word-break:break-all;user-select:text;-webkit-user-select:text';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = overlayClasses.action;
  btn.textContent = 'Copy key';
  btn.style.border = '0';
  btn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(key);
      btn.textContent = 'Copied!';
      window.setTimeout(() => {
        btn.textContent = 'Copy key';
      }, 2000);
    } catch {
      btn.textContent = 'Copy failed';
      window.setTimeout(() => {
        btn.textContent = 'Copy key';
      }, 2000);
    }
  };

  mount.append(code, btn);
  recordBypassSuccess();
};

const armLootInject = (): Promise<void> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: MSG_CLOVER_LOOT_PENDING }, (res: { ok?: boolean } | undefined) => {
      if (chrome.runtime.lastError) reject(new Error('arm'));
      else resolve();
      void res;
    });
  });

const scanLootInject = (): void => {
  chrome.runtime.sendMessage({ type: MSG_CLOVER_LOOT_SCAN });
};

const pollCompletedKey = async (): Promise<string | null> => {
  for (let i = 0; i < POLL_MAX; i++) {
    const claim = await fetchCurrentClaim();
    if (claim?.status === 'completed' && claim.key) return claim.key;
    if (claim?.status === 'expired') throw new Error('expired');
    await sleep(POLL_MS);
  }
  return null;
};

const mountLootFrame = (verificationUrl: string): HTMLIFrameElement => {
  const frame = document.createElement('iframe');
  frame.hidden = true;
  frame.addEventListener('load', scanLootInject, { capture: true });
  document.documentElement.appendChild(frame);
  frame.src = verificationUrl;
  return frame;
};

const runLootPostback = async (verificationUrl: string): Promise<string | null> => {
  await armLootInject();
  const frame = mountLootFrame(verificationUrl);
  try {
    return await pollCompletedKey();
  } finally {
    frame.remove();
    chrome.runtime.sendMessage({ type: MSG_CLOVER_LOOT_DONE });
  }
};

const planSteps = (claim: ClaimCurrent | null): StepCopy[] => {
  const steps: StepCopy[] = [STEPS.check];
  let c = claim;

  if (c?.status === 'completed' && c.keyAlreadyDelivered) {
    steps.push(STEPS.reset);
    c = null;
  } else if (c?.status === 'pending' && c.provider !== 'lootlabs') {
    steps.push(STEPS.switch);
    c = null;
  }

  if (c?.status !== 'pending' || c.provider !== 'lootlabs') steps.push(STEPS.create);
  steps.push(STEPS.bypass);
  return steps;
};

const ensureLootClaim = async (
  pulse: ReturnType<typeof createStepPulse>,
  claim: ClaimCurrent | null,
  steps: StepCopy[],
): Promise<string | null> => {
  if (claim?.status === 'completed' && claim.key) return claim.key;

  let index = 1;
  const advance = (): void => {
    index += 1;
    pulse.begin(index, steps.length, steps[index - 1]!);
  };

  if (claim?.status === 'completed' && claim.keyAlreadyDelivered) {
    advance();
    await resetClaim().catch(() => {});
    claim = null;
  }

  if (claim?.status === 'pending' && claim.provider !== 'lootlabs') {
    advance();
    await resetClaim().catch(() => {});
    claim = null;
  }

  const needsCreate = claim?.status !== 'pending' || claim.provider !== 'lootlabs';

  if (needsCreate) {
    advance();
    const created = await createClaim();
    if (created.provider !== 'lootlabs') throw new Error('provider');
    const url = created.verificationUrl?.trim();
    if (!url) throw new Error('no verification url');
    advance();
    return runLootPostback(url);
  }

  const url = claim?.verificationUrl?.trim();
  if (!url) throw new Error('no verification url');
  advance();
  return runLootPostback(url);
};

export function initCloverhubGetkey(): void {
  if (window !== window.top || !isGetkeyPage()) return;

  let ui: FullPageOverlay | null = null;

  const run = async (): Promise<void> => {
    if (!ui) return;
    const pulse = createStepPulse(ui);
    try {
      if (new URLSearchParams(location.search).get('verification') === 'failed') {
        history.replaceState({}, '', '/getkey');
        await resetClaim().catch(() => {});
      }
      ui.setError(null);
      pulse.begin(1, 1, STEPS.check);
      const claim = await fetchCurrentClaim();
      if (claim?.status === 'completed' && claim.key) {
        pulse.stop();
        showKey(ui, claim.key);
        return;
      }
      const steps = planSteps(claim);
      pulse.begin(1, steps.length, STEPS.check);
      const key = await ensureLootClaim(pulse, claim, steps);
      pulse.stop();
      if (!key) throw new Error('timeout');
      showKey(ui, key);
    } catch {
      pulse.stop();
      ui.setNote(COPY.failed);
      ui.setStatus('');
      ui.setError('Refresh and try again.');
      chrome.runtime.sendMessage({ type: MSG_CLOVER_LOOT_DONE });
    }
  };

  void canBypass('cloverhub').then((ok) => {
    if (!ok) return;
    ui = createFullPageOverlay({
      id: OVERLAY_ID,
      brand: 'Skip Wait',
      note: STEPS.check,
      status: '',
    });
    void run();
  });
}
