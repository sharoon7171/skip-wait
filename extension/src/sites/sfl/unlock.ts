import { hostIsRemoteSite } from '../../hosts/check';
import { MSG_PROGRESS, MSG_RESOLVE, SITE, isShortUrl, isWorkingPage, type SflProgress } from './hosts';
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
  ui.progress({
    lead: 'Hang tight — unlocking your link.',
    detail: 'Skip Wait skips the mediator pages in the background.',
    status: 'Opening your short link…',
  });

  let host: string;
  try {
    host = new URL(unlockUrl).hostname;
  } catch {
    ui.setError('Invalid unlock link.');
    return;
  }
  if (!(await hostIsRemoteSite(host, SITE))) {
    ui.setError('SFL is not available.');
    return;
  }

  const onProgress = (msg: { type?: string } & Partial<SflProgress>): void => {
    if (msg.type !== MSG_PROGRESS || !msg.status || !msg.lead || !msg.detail) return;
    ui.progress({ lead: msg.lead, detail: msg.detail, status: msg.status });
  };
  chrome.runtime.onMessage.addListener(onProgress);

  try {
    location.replace(await requestDestination(unlockUrl));
  } catch {
    ui.setError('Couldn’t unlock this link. Reload and try again.');
  } finally {
    chrome.runtime.onMessage.removeListener(onProgress);
  }
};

export const initSflUnlock = (): void => {
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
