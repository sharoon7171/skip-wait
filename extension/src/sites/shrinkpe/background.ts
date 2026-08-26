import { canBypassHost } from '../../gate';
import {
  MSG_ARM,
  MSG_DISARM,
  MSG_OPEN,
  MSG_PROGRESS,
  MSG_RESOLVE,
  SITE,
  isAliasUrl,
  isHttpUrl,
  shortenerFor,
  type ShrinkpeFields,
  type ShrinkpeProgress,
} from './hosts';
import { resolveShrinkpeDestination } from './resolve';

const RULE_BASE = 919301;

const ruleIdForTab = (tabId: number): number => RULE_BASE + tabId;

const armReferer = async (tabId: number, host: string, referer: string): Promise<boolean> => {
  try {
    await chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds: [ruleIdForTab(tabId)],
      addRules: [
        {
          id: ruleIdForTab(tabId),
          priority: 1,
          action: {
            type: 'modifyHeaders',
            requestHeaders: [{ header: 'Referer', operation: 'set', value: referer }],
          },
          condition: {
            urlFilter: `||${host}/`,
            resourceTypes: ['xmlhttprequest'],
            tabIds: [tabId],
          },
        },
      ],
    });
    return true;
  } catch {
    return false;
  }
};

const disarmReferer = (tabId: number): Promise<void> =>
  chrome.declarativeNetRequest
    .updateSessionRules({ removeRuleIds: [ruleIdForTab(tabId)] })
    .catch(() => {});

const openTab = async (tabId: number, url: string): Promise<boolean> => {
  try {
    await chrome.tabs.update(tabId, { url });
    return true;
  } catch {
    return false;
  }
};

export const initShrinkpeBackground = (): void => {
  chrome.tabs.onRemoved.addListener((tabId) => {
    void disarmReferer(tabId);
  });

  chrome.runtime.onMessage.addListener(
    (
      msg: {
        type?: string;
        pageUrl?: string;
        action?: string;
        fields?: ShrinkpeFields;
        url?: string;
        host?: string;
        referer?: string;
      },
      sender,
      reply,
    ) => {
      const tabId = sender.tab?.id;

      if (msg.type === MSG_ARM) {
        const host = typeof msg.host === 'string' ? msg.host : '';
        const referer = typeof msg.referer === 'string' ? msg.referer : '';
        if (tabId == null || !host || !isHttpUrl(referer)) {
          reply(false);
          return false;
        }
        void (async () => {
          try {
            if (!(await canBypassHost(host, SITE))) {
              reply(false);
              return;
            }
            reply(await armReferer(tabId, host, referer));
          } catch {
            reply(false);
          }
        })();
        return true;
      }

      if (msg.type === MSG_DISARM) {
        if (tabId == null) {
          reply(false);
          return false;
        }
        void disarmReferer(tabId).then(() => reply(true));
        return true;
      }

      if (msg.type === MSG_OPEN) {
        const url = typeof msg.url === 'string' ? msg.url : '';
        if (tabId == null || !isHttpUrl(url)) {
          reply(false);
          return false;
        }
        void (async () => {
          try {
            const tabHost = sender.tab?.url ? new URL(sender.tab.url).hostname : '';
            if (!tabHost || !(await canBypassHost(tabHost, SITE))) {
              reply(false);
              return;
            }
            await disarmReferer(tabId);
            reply(await openTab(tabId, url));
          } catch {
            reply(false);
          }
        })();
        return true;
      }

      if (msg.type !== MSG_RESOLVE) return false;
      const pageUrl = typeof msg.pageUrl === 'string' ? msg.pageUrl : '';
      const action = typeof msg.action === 'string' ? msg.action : '';
      const fields = msg.fields && typeof msg.fields === 'object' ? msg.fields : null;
      void (async () => {
        try {
          if (!fields || !(await isAliasUrl(pageUrl))) {
            reply({ ok: false });
            return;
          }
          const host = new URL(pageUrl).hostname;
          if (!(await canBypassHost(host, SITE))) {
            reply({ ok: false });
            return;
          }
          if (shortenerFor(host).kind !== 'shrinkpe' || !isHttpUrl(action)) {
            reply({ ok: false });
            return;
          }
          const push = (p: ShrinkpeProgress): void => {
            if (tabId == null) return;
            void chrome.tabs.sendMessage(tabId, { type: MSG_PROGRESS, ...p }).catch(() => {});
          };
          reply({ ok: true, dest: await resolveShrinkpeDestination(pageUrl, action, fields, push) });
        } catch {
          reply({ ok: false });
        }
      })();
      return true;
    },
  );
};
