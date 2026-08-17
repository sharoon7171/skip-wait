export const MSG_RINKU_CHAIN_ACTIVE = 'RINKU_CHAIN_ACTIVE' as const;
export const MSG_RINKU_CHAIN_COMPLETE = 'RINKU_CHAIN_COMPLETE' as const;

export const isRinkuChainActive = async (): Promise<boolean> =>
  (await chrome.runtime.sendMessage({ type: MSG_RINKU_CHAIN_ACTIVE })) === true;

export const completeRinkuChain = (): Promise<unknown> =>
  chrome.runtime.sendMessage({ type: MSG_RINKU_CHAIN_COMPLETE });
