import { canBypassHost } from '../../gate';
import { MSG_PROGRESS, MSG_RESOLVE, SITE, isShortUrl, isWorkingPage } from './hosts';
import { createOverlay } from './overlay';
import type { ResolveProgress } from './resolve';

const ui = createOverlay();

const requestDestination = (unlockUrl: string): Promise<string> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: MSG_RESOLVE, unlockUrl }, (res?: { ok?: boolean; dest?: string }) => {
      if (chrome.runtime.lastError || !res?.ok || !res.dest) reject(new Error('resolve'));
      else resolve(res.dest);
    });
  });

const run = async (unlockUrl: string): Promise<void> => {
  const onProgress = (msg: { type?: string } & Partial<ResolveProgress>): void => {
    if (msg.type !== MSG_PROGRESS || !msg.status || !msg.lead || !msg.detail) return;
    ui.progress({ lead: msg.lead, detail: msg.detail, status: msg.status });
  };
  chrome.runtime.onMessage.addListener(onProgress);

  try {
    ui.progress({
      lead: 'Hang tight — unlocking your link.',
      detail: "Skip Wait is working. You don't need to tap anything.",
      status: 'Opening your short link',
    });

    let host: string;
    try {
      host = new URL(unlockUrl).hostname;
    } catch {
      ui.setError('Invalid unlock link.');
      return;
    }
    if (!(await canBypassHost(host, SITE))) {
      ui.setError('Alpharede is not available.');
      return;
    }

    location.replace(await requestDestination(unlockUrl));
  } catch {
    ui.setError('Could not unlock.');
  } finally {
    chrome.runtime.onMessage.removeListener(onProgress);
  }
};

export const initAlpharedeUnlock = (): void => {
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
