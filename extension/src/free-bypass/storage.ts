import { FREE_BYPASS_LIMIT } from './config';

export const FREE_DAILY_KEY = 'skipWaitFreeDaily';

export type FreeDailyState = {
  day: string;
  used: number;
};

export const localDayKey = (ms = Date.now()): string => {
  const d = new Date(ms);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const parseFreeDaily = (raw: unknown, today = localDayKey()): FreeDailyState => {
  if (
    raw &&
    typeof raw === 'object' &&
    typeof (raw as FreeDailyState).day === 'string' &&
    typeof (raw as FreeDailyState).used === 'number' &&
    Number.isFinite((raw as FreeDailyState).used) &&
    (raw as FreeDailyState).used >= 0
  ) {
    const state = raw as FreeDailyState;
    if (state.day === today) {
      return { day: today, used: Math.min(Math.floor(state.used), FREE_BYPASS_LIMIT) };
    }
  }
  return { day: today, used: 0 };
};

export const readFreeDaily = async (): Promise<FreeDailyState> => {
  const stored = await chrome.storage.local.get(FREE_DAILY_KEY);
  return parseFreeDaily(stored[FREE_DAILY_KEY]);
};

export const writeFreeDaily = async (state: FreeDailyState): Promise<void> => {
  await chrome.storage.local.set({ [FREE_DAILY_KEY]: state });
};
