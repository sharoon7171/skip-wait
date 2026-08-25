import { canBypassHost } from '../../gate';

export const MSG_EXEIO_ADBLOCK = 'EXEIO_ADBLOCK_BYPASS' as const;
export const MSG_EXEIO_GO_UNLOCK = 'EXEIO_GO_UNLOCK' as const;

export type ExeioUnlockResult = { ok: boolean; err?: string };

export const isExeioUrl = (url: string): Promise<boolean> => {
  try {
    return canBypassHost(new URL(url).hostname, 'exeio');
  } catch {
    return Promise.resolve(false);
  }
};
