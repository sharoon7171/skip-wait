import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { BRAND, MSG_OPEN, MSG_PROGRESS, MSG_RESOLVE, SITE, aliasFromPath, type NitrolinkProgress } from './hosts';
import { createOverlay } from './overlay';

const ui = createOverlay();
let done = false;

const requestResolve = (pageUrl: string): Promise<string> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: MSG_RESOLVE, pageUrl }, (res?: { ok?: boolean; dest?: string }) => {
      if (chrome.runtime.lastError || !res?.ok || !res.dest) reject(new Error('resolve'));
      else resolve(res.dest);
    });
  });

const openDestination = (url: string): Promise<boolean> =>
  new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: MSG_OPEN, url }, (ok?: boolean) => {
      resolve(!chrome.runtime.lastError && ok === true);
    });
  });

const bindProgress = (): (() => void) => {
  const onProgress = (msg: { type?: string } & Partial<NitrolinkProgress>): void => {
    if (msg.type !== MSG_PROGRESS) return;
    if (typeof msg.lead !== 'string' || typeof msg.detail !== 'string' || typeof msg.status !== 'string') {
      return;
    }
    ui.progress({
      lead: msg.lead,
      detail: msg.detail,
      status: msg.status,
      ...(typeof msg.waitEndTs === 'number' ? { waitEndTs: msg.waitEndTs } : {}),
    });
  };
  chrome.runtime.onMessage.addListener(onProgress);
  return () => chrome.runtime.onMessage.removeListener(onProgress);
};

const run = async (): Promise<void> => {
  if (done) return;
  done = true;
  const unbind = bindProgress();
  try {
    ui.progress({
      lead: 'Hang tight — unlocking your link.',
      detail: 'Skip Wait is working. You don’t need to tap anything.',
      status: `Opening ${BRAND}`,
    });
    const dest = await requestResolve(location.href);
    if (!(await openDestination(dest))) {
      done = false;
      ui.setError('Couldn’t open the destination. Reload and try again.');
      return;
    }
    recordBypassSuccess();
  } catch {
    done = false;
    ui.setError('Couldn’t finish this short link. Reload and try again.');
  } finally {
    unbind();
  }
};

export const initNitrolinkPage = (): void => {
  if (window !== window.top) return;
  if (!aliasFromPath(location.pathname)) return;
  void canBypass(SITE).then((ok) => {
    if (!ok) return;
    void run();
  });
};
