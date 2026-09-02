import { canBypassHost, licensedHosts, onBypassAccessChange } from '../../gate';
import { MSG_ARM, MSG_MEDIATOR, MSG_OPEN } from './hosts';
import { fetchLastMediatorReferer } from './hop';

const RULE_BASE = 917301;
const CSP_RULE = 917300;

const isHttp = (v: string): boolean => /^https?:\/\//i.test(v);

const ruleIdForTab = (tabId: number): number => RULE_BASE + tabId;

const armCsp = async (): Promise<void> => {
  const hosts = await licensedHosts('arolinks');
  if (!hosts.length) {
    await chrome.declarativeNetRequest.updateSessionRules({ removeRuleIds: [CSP_RULE], addRules: [] });
    return;
  }
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [CSP_RULE],
    addRules: [
      {
        id: CSP_RULE,
        priority: 2,
        action: {
          type: 'modifyHeaders',
          responseHeaders: [
            { header: 'Content-Security-Policy', operation: 'set', value: "script-src 'none'" },
          ],
        },
        condition: {
          requestDomains: hosts,
          resourceTypes: ['main_frame'],
        },
      },
    ],
  });
};

const armReferer = async (tabId: number, url: string, referer: string): Promise<boolean> => {
  const id = ruleIdForTab(tabId);
  try {
    await chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds: [id],
      addRules: [
        {
          id,
          priority: 1,
          action: {
            type: 'modifyHeaders',
            requestHeaders: [{ header: 'Referer', operation: 'set', value: referer }],
          },
          condition: {
            urlFilter: `|${url}`,
            resourceTypes: ['main_frame'],
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

const clearReferer = (tabId: number): Promise<void> =>
  chrome.declarativeNetRequest
    .updateSessionRules({ removeRuleIds: [ruleIdForTab(tabId)] })
    .catch(() => {});

export const initArolinksBackground = (): void => {
  void armCsp();
  onBypassAccessChange(() => {
    void armCsp();
  });
  chrome.tabs.onRemoved.addListener((tabId) => {
    void clearReferer(tabId);
  });
  chrome.runtime.onMessage.addListener(
    (msg: { type?: string; url?: string; referer?: string; shortUrl?: string; assigned?: string }, sender, reply) => {
      const tabId = sender.tab?.id;
      if (msg.type === MSG_MEDIATOR) {
        const shortUrl = typeof msg.shortUrl === 'string' ? msg.shortUrl : '';
        const assigned = typeof msg.assigned === 'string' ? msg.assigned : '';
        if (!isHttp(shortUrl) || !isHttp(assigned)) {
          reply(null);
          return false;
        }
        void (async () => {
          try {
            const host = new URL(shortUrl).hostname;
            if (!(await canBypassHost(host, 'arolinks'))) {
              reply(null);
              return;
            }
            reply(await fetchLastMediatorReferer(shortUrl, assigned));
          } catch {
            reply(null);
          }
        })();
        return true;
      }
      if (msg.type === MSG_OPEN) {
        const url = typeof msg.url === 'string' ? msg.url : '';
        if (tabId == null || !isHttp(url)) {
          reply(false);
          return false;
        }
        void (async () => {
          try {
            const tabHost = sender.tab?.url ? new URL(sender.tab.url).hostname : '';
            if (!tabHost || !(await canBypassHost(tabHost, 'arolinks'))) {
              reply(false);
              return;
            }
            await clearReferer(tabId);
            await chrome.tabs.update(tabId, { url });
            reply(true);
          } catch {
            reply(false);
          }
        })();
        return true;
      }
      if (msg.type !== MSG_ARM) return false;
      const url = typeof msg.url === 'string' ? msg.url : '';
      const referer = typeof msg.referer === 'string' ? msg.referer : '';
      if (tabId == null || !isHttp(url) || !isHttp(referer)) {
        reply(false);
        return false;
      }
      void (async () => {
        try {
          if (!(await canBypassHost(new URL(url).hostname, 'arolinks'))) {
            reply(false);
            return;
          }
          reply(await armReferer(tabId, url, referer));
        } catch {
          reply(false);
        }
      })();
      return true;
    },
  );
};
