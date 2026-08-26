import { canBypass } from '../../gate';
import { MSG_OPEN, MSG_PROGRESS, MSG_RESOLVE, SITE, aliasFromPath } from './hosts';
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
  const onProgress = (msg: { type?: string; waitEndTs?: number }): void => {
    if (msg.type !== MSG_PROGRESS || typeof msg.waitEndTs !== 'number') return;
    if (msg.waitEndTs <= Date.now()) return;
    ui.startCountdown(msg.waitEndTs);
  };
  chrome.runtime.onMessage.addListener(onProgress);
  return () => chrome.runtime.onMessage.removeListener(onProgress);
};

const run = async (): Promise<void> => {
  if (done) return;
  done = true;
  const unbind = bindProgress();
  try {
    ui.progress();
    const dest = await requestResolve(location.href);
    if (!(await openDestination(dest))) {
      done = false;
      ui.setError('Couldn’t open your LiteShort destination. Reload and try again.');
    }
  } catch {
    done = false;
    ui.setError('Couldn’t finish this LiteShort link. Reload and try again.');
  } finally {
    unbind();
  }
};

export const initLiteshortPage = (): void => {
  if (window !== window.top) return;
  if (!aliasFromPath(location.pathname)) return;

  void canBypass(SITE).then((ok) => {
    if (!ok) return;
    void run();
  });
};
