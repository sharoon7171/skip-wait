import { canBypassHost, licensedHosts, onBypassAccessChange } from '../../gate';
import {
  MSG_OPEN,
  MSG_PROGRESS,
  MSG_RESOLVE,
  SITE,
  isAliasUrl,
  isHttpUrl,
  type NitrolinkProgress,
} from './hosts';
import { resolveDestination } from './resolve';

const LOCATION_RULE = 918710;

const armStopRedirect = async (): Promise<void> => {
  const hosts = await licensedHosts(SITE);
  if (!hosts.length) {
    await chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds: [LOCATION_RULE],
      addRules: [],
    });
    return;
  }
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [LOCATION_RULE],
    addRules: [
      {
        id: LOCATION_RULE,
        priority: 2,
        action: {
          type: 'modifyHeaders',
          responseHeaders: [{ header: 'Location', operation: 'remove' }],
        },
        condition: {
          requestDomains: hosts,
          resourceTypes: ['main_frame'],
        },
      },
    ],
  });
};

const openTab = async (tabId: number, url: string): Promise<boolean> => {
  try {
    await chrome.tabs.update(tabId, { url });
    return true;
  } catch {
    return false;
  }
};

const pushProgress = (tabId: number | undefined, p: NitrolinkProgress): void => {
  if (tabId == null) return;
  void chrome.tabs.sendMessage(tabId, { type: MSG_PROGRESS, ...p }).catch(() => {});
};

export const initNitrolinkBackground = (): void => {
  void armStopRedirect();
  onBypassAccessChange(() => {
    void armStopRedirect();
  });

  chrome.runtime.onMessage.addListener(
    (msg: { type?: string; pageUrl?: string; url?: string }, sender, reply) => {
      const tabId = sender.tab?.id;

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
            reply(await openTab(tabId, url));
          } catch {
            reply(false);
          }
        })();
        return true;
      }

      if (msg.type !== MSG_RESOLVE) return false;
      const pageUrl = typeof msg.pageUrl === 'string' ? msg.pageUrl : '';
      void (async () => {
        try {
          if (!(await isAliasUrl(pageUrl))) {
            reply({ ok: false });
            return;
          }
          if (!(await canBypassHost(new URL(pageUrl).hostname, SITE))) {
            reply({ ok: false });
            return;
          }
          const dest = await resolveDestination(pageUrl, (p) => pushProgress(tabId, p));
          reply({ ok: true, dest });
        } catch {
          reply({ ok: false });
        }
      })();
      return true;
    },
  );
};
