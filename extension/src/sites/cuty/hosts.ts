import { canBypassHost } from '../../gate';

export const MSG_CUTY_GO_UNLOCK = 'CUTY_GO_UNLOCK' as const;

export type CutyUnlockResult = { ok: boolean; err?: string };

export const isCutyHost = (hostname: string): Promise<boolean> => canBypassHost(hostname, 'cuty');

export const isCutyUrl = (url: string): Promise<boolean> => {
  try {
    return isCutyHost(new URL(url).hostname);
  } catch {
    return Promise.resolve(false);
  }
};
