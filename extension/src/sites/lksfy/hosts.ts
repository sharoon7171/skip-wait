export const MSG_LKSFY_ADBLOCK = 'LKSFY_ADBLOCK_BYPASS' as const;
export const LKSFY_ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;

export function lksfyUnlockUrl(alias: string): string {
  return `https://lksfy.com/${alias}`;
}
