import { hostIsRemoteSite } from '../../hosts/check';
import { MSG_RESOLVE, SITE, isShortUrl, isWorkingPage } from './hosts';
import { createOverlay } from './overlay';

const ui = createOverlay();

const requestDestination = (unlockUrl: string): Promise<string> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: MSG_RESOLVE, unlockUrl }, (res?: { ok?: boolean; dest?: string }) => {
      if (chrome.runtime.lastError || !res?.ok || !res.dest) reject(new Error('resolve'));
      else resolve(res.dest);
    });
  });

const run = async (unlockUrl: string): Promise<void> => {
  ui.setStatus('Getting things ready');
  let host: string;
  try {
    host = new URL(unlockUrl).hostname;
  } catch {
    ui.setError('Invalid unlock link.');
    return;
  }
  if (!(await hostIsRemoteSite(host, SITE))) {
    ui.setError('Earnlinks is not available.');
    return;
  }
  ui.setStatus('Unlocking your link');
  try {
    const dest = await requestDestination(unlockUrl);
    ui.setStatus('Opening your link');
    location.replace(dest);
  } catch {
    ui.setError('Could not unlock.');
  }
};

export const initEarnlinksUnlock = (): void => {
  if (window !== window.top || !isWorkingPage()) return;
  const q = new URLSearchParams(location.search);
  if (q.get('site')?.trim() !== SITE) return;
  const unlockUrl = q.get('u')?.trim() ?? '';
  if (!isShortUrl(unlockUrl)) {
    ui.setError('Missing unlock details.');
    return;
  }
  void run(unlockUrl);
};
