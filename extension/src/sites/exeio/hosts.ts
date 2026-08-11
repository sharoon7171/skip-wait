export const EXEIO_HOSTS = ['exe.io', 'exeygo.com'] as const;

export const MSG_EXEIO_ADBLOCK = 'EXEIO_ADBLOCK_BYPASS' as const;
export const MSG_EXEIO_GO_UNLOCK = 'EXEIO_GO_UNLOCK' as const;

export type ExeioUnlockResult = { ok: boolean; err?: string };

export const isExeioUrl = (url: string): boolean => {
  try {
    const h = new URL(url).hostname.toLowerCase();
    return EXEIO_HOSTS.some((d) => h === d || h.endsWith('.' + d));
  } catch {
    return false;
  }
};
