import { hostIsRemoteSite } from '../../hosts/check';

export const MSG_EXEIO_ADBLOCK = 'EXEIO_ADBLOCK_BYPASS' as const;
export const MSG_EXEIO_GO_UNLOCK = 'EXEIO_GO_UNLOCK' as const;

export type ExeioUnlockResult = { ok: boolean; err?: string };

export const isExeioUrl = (url: string): Promise<boolean> => {
  try {
    return hostIsRemoteSite(new URL(url).hostname, 'exeio');
  } catch {
    return Promise.resolve(false);
  }
};
