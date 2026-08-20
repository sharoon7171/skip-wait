const MSG_ARM = 'AROLINKS_ARM_REFERER' as const;
const MSG_OPEN = 'AROLINKS_OPEN_DEST' as const;
const RULE_BASE = 917301;
const CSP_RULE = 917300;

type ArmMsg = { type: typeof MSG_ARM; url: string; referer: string };
type OpenMsg = { type: typeof MSG_OPEN; url: string };

const isHttp = (v: string): boolean => /^https?:\/\//i.test(v);

const ruleIdForTab = (tabId: number): number => RULE_BASE + tabId;

const armCsp = (): void => {
  void chrome.declarativeNetRequest.updateSessionRules({
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
          requestDomains: ['arolinks.com', 'vplink.in'],
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
  armCsp();
  chrome.tabs.onRemoved.addListener((tabId) => {
    void clearReferer(tabId);
  });
  chrome.runtime.onMessage.addListener((msg: { type?: string; url?: string; referer?: string }, sender, reply) => {
    const tabId = sender.tab?.id;
    if (msg.type === MSG_OPEN) {
      const url = typeof msg.url === 'string' ? msg.url : '';
      if (tabId == null || !isHttp(url)) {
        reply(false);
        return false;
      }
      void clearReferer(tabId)
        .then(() => chrome.tabs.update(tabId, { url }))
        .then(() => reply(true))
        .catch(() => reply(false));
      return true;
    }
    if (msg.type !== MSG_ARM) return false;
    const url = typeof msg.url === 'string' ? msg.url : '';
    const referer = typeof msg.referer === 'string' ? msg.referer : '';
    if (tabId == null || !isHttp(url) || !isHttp(referer)) {
      reply(false);
      return false;
    }
    void armReferer(tabId, url, referer).then(reply);
    return true;
  });
};

export const armUnlockReferer = (url: string, referer: string): Promise<boolean> =>
  new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: MSG_ARM, url, referer } satisfies ArmMsg, (ok?: boolean) => {
      resolve(!chrome.runtime.lastError && ok === true);
    });
  });

export const openDestinationTab = (url: string): Promise<boolean> =>
  new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: MSG_OPEN, url } satisfies OpenMsg, (ok?: boolean) => {
      resolve(!chrome.runtime.lastError && ok === true);
    });
  });
