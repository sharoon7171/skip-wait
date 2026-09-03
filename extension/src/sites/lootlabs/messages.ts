export const LOOT_MSG_SOURCE = 'skip-wait-loot' as const;
export const MSG_INJECT_LOOT = 'INJECT_LOOT' as const;
export const MSG_INJECT_LOOT_CAPTCHA = 'INJECT_LOOT_CAPTCHA' as const;
export const MSG_LOOT_CAPTCHA_VERIFY = 'LOOT_CAPTCHA_VERIFY' as const;

export type LootHookMessage =
  | { source: string; type: 'wait'; endTs: number }
  | { source: string; type: 'captcha'; url: string; urid: string; taskId: number }
  | { source: string; type: 'captcha-token'; token: string }
  | { source: string; type: 'dest'; dest: string }
  | { source: string; type: 'err'; message: string };

export type LootPostMessage =
  | { type: 'wait'; endTs: number }
  | { type: 'captcha'; url: string; urid: string; taskId: number }
  | { type: 'dest'; dest: string }
  | { type: 'err'; message: string };
