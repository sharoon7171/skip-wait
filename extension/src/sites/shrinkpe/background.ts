import { canBypassHost } from '../../gate';
import { MSG_PROGRESS, MSG_RESOLVE, SITE, isShortUrl, type ShrinkpeProgress } from './hosts';
import { resolveDestination } from './resolve';

export const initShrinkpeBackground = (): void => {
  chrome.runtime.onMessage.addListener(
    (msg: { type?: string; unlockUrl?: string; pageHtml?: string }, sender, reply) => {
      if (msg.type !== MSG_RESOLVE) return false;
      const unlockUrl = typeof msg.unlockUrl === 'string' ? msg.unlockUrl : '';
      const pageHtml = typeof msg.pageHtml === 'string' ? msg.pageHtml : '';
      if (!isShortUrl(unlockUrl) || !pageHtml) {
        reply({ ok: false });
        return false;
      }
      const tabId = sender.tab?.id;
      const push = (p: ShrinkpeProgress): void => {
        const payload = { type: MSG_PROGRESS, unlockUrl, ...p };
        if (tabId != null) void chrome.tabs.sendMessage(tabId, payload).catch(() => {});
        else void chrome.runtime.sendMessage(payload).catch(() => {});
      };
      void (async () => {
        try {
          if (!(await canBypassHost(new URL(unlockUrl).hostname, SITE))) {
            reply({ ok: false });
            return;
          }
          reply({ ok: true, dest: await resolveDestination(unlockUrl, pageHtml, push) });
        } catch {
          reply({ ok: false });
        }
      })();
      return true;
    },
  );
};
