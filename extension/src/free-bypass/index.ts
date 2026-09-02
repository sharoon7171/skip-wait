import { verifyLicense } from '../license/verify';
import { FREE_BYPASS_LIMIT } from './config';
import { readFreeDaily, writeFreeDaily, type FreeDailyState } from './storage';

export { FREE_BYPASS_LIMIT } from './config';
export { FREE_DAILY_KEY } from './storage';

export type FreeUsage = {
  used: number;
  limit: number;
  day: string;
};

let incrementChain: Promise<void> = Promise.resolve();

export const getFreeUsage = async (): Promise<FreeUsage> => {
  const state = await readFreeDaily();
  return { used: state.used, limit: FREE_BYPASS_LIMIT, day: state.day };
};

export const hasFreeRemaining = async (): Promise<boolean> => {
  const state = await readFreeDaily();
  return state.used < FREE_BYPASS_LIMIT;
};

export const recordBypassSuccess = (): void => {
  incrementChain = incrementChain.then(async () => {
    if (await verifyLicense()) return;
    const state = await readFreeDaily();
    if (state.used >= FREE_BYPASS_LIMIT) return;
    const next: FreeDailyState = { day: state.day, used: state.used + 1 };
    await writeFreeDaily(next);
  });
  void incrementChain;
};

export const countWhenElement = (selector: string): void => {
  let counted = false;
  const hit = (): boolean => {
    if (counted || !document.querySelector(selector)) return false;
    counted = true;
    recordBypassSuccess();
    return true;
  };
  if (hit()) return;
  const mo = new MutationObserver(() => {
    if (hit()) mo.disconnect();
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
};

export const countOnMessage = (source: string, type: string): void => {
  let counted = false;
  window.addEventListener('message', (ev: MessageEvent) => {
    if (counted || ev.source !== window || ev.origin !== location.origin) return;
    const data = ev.data as { source?: string; type?: string };
    if (data?.source !== source || data.type !== type) return;
    counted = true;
    recordBypassSuccess();
  });
};
