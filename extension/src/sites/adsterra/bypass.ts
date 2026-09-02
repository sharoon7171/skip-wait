import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { whenDomParsed } from '../../utils/domain-check';
import {
  SITE,
  OVERLAY_ID,
  checkpointToken,
  currentStep,
  destinationUrl,
  isAdStep,
  isAesGate,
  isCheckpoint,
  keyText,
  stepCompleteUrl,
} from './hosts';

const NOTE = {
  lead: 'Hang tight — clearing Adsterra checkpoint steps.',
  detail: "You don't need to tap Verify, Continue, or smart links.",
} as const;

let ui: FullPageOverlay | null = null;
let done = false;

const mount = (status: string): FullPageOverlay => {
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
  });
  return ui;
};

const go = (url: string, status: string): void => {
  if (done) return;
  done = true;
  mount(status);
  location.replace(url);
};

const showKey = (key: string): void => {
  done = true;
  recordBypassSuccess();
  const overlay = mount('Copy this key.');
  overlay.setNote({
    lead: 'This is your reward key — not a download link.',
    detail: key,
  });
  void navigator.clipboard.writeText(key).then(
    () => overlay.setStatus('Copied — paste it where the game asks.'),
    () => overlay.setStatus('Select the key above and copy it.'),
  );
};

const runCheckpoint = (): void => {
  const key = keyText();
  if (key) {
    showKey(key);
    return;
  }
  const token = checkpointToken();
  const step = currentStep();
  if (!token || step === null) return;
  go(stepCompleteUrl(token, step + 1), 'Completing checkpoint step…');
};

const runAdStep = (): void => {
  const dest = destinationUrl();
  if (!dest) return;
  recordBypassSuccess();
  go(dest, 'Skipping ad timer…');
};

const tick = (): boolean => {
  if (isAesGate()) return false;
  if (isCheckpoint()) {
    runCheckpoint();
    return !!keyText() || done;
  }
  if (isAdStep()) {
    runAdStep();
    return done;
  }
  return false;
};

const watch = (): void => {
  let queued = false;
  const observer = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      if (tick()) observer.disconnect();
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (tick()) observer.disconnect();
};

export const initAdsterraBypass = (): void => {
  if (window !== window.top) return;
  const allowed = canBypass(SITE);
  whenDomParsed(() => {
    void allowed.then((ok) => {
      if (ok) watch();
    });
  });
};
