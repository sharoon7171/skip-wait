import { fetchPastebinConfig } from './fetch-config';
import type { PastebinRule } from './fetch-config';

export function registerMessageListener(): void {
  chrome.runtime.onMessage.addListener(
    (
      msg: { type: string },
      _sender: chrome.runtime.MessageSender,
      sendResponse: (response: PastebinRule[] | { error: string }) => void
    ) => {
      if (msg.type !== 'getPastebinConfig') return false;
      fetchPastebinConfig()
        .then((rules) => sendResponse(rules))
        .catch((err) => sendResponse({ error: String(err?.message ?? err) }));
      return true; // keep channel open for async sendResponse
    }
  );
}
