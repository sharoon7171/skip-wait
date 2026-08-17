export const CUTY_HOSTS = ['cuttty.com', 'cuty.io'] as const;

export const MSG_CUTY_GO_UNLOCK = 'CUTY_GO_UNLOCK' as const;

export type CutyUnlockResult = { ok: boolean; err?: string };

export const isCutyHost = (hostname: string): boolean => {
  const host = hostname.toLowerCase();
  return CUTY_HOSTS.some((domain) => host === domain || host.endsWith(`.${domain}`));
};

export const isCutyUrl = (url: string): boolean => {
  try {
    return isCutyHost(new URL(url).hostname);
  } catch {
    return false;
  }
};
