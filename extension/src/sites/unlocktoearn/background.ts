import { canBypassHost, licensedHosts, onBypassAccessChange } from '../../gate';
import { MSG_OPEN, MSG_RESOLVE, SITE, aliasFromPath, isHttpUrl } from './hosts';
import { resolveDestination } from './resolve';

const LOCATION_RULE = 918800;
const CSP_RULE = 918801;

const inflight = new Map<string, Promise<string>>();

const resolveOnce = (alias: string): Promise<string> => {
  const hit = inflight.get(alias);
  if (hit) return hit;
  const job = resolveDestination(alias).finally(() => {
    inflight.delete(alias);
  });
  inflight.set(alias, job);
  return job;
};

const armStayOnHost = async (): Promise<void> => {
  const hosts = await licensedHosts(SITE);
  const removeRuleIds = [LOCATION_RULE, CSP_RULE];
  if (!hosts.length) {
    await chrome.declarativeNetRequest.updateSessionRules({ removeRuleIds, addRules: [] });
    return;
  }
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds,
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
          requestMethods: ['get'],
        },
      },
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

const openTab = async (tabId: number, url: string): Promise<boolean> => {
  try {
    await chrome.tabs.update(tabId, { url });
    return true;
  } catch {
    return false;
  }
};

export const initUnlocktoearnBackground = (): void => {
  void armStayOnHost();
  onBypassAccessChange(() => {
    void armStayOnHost();
  });

  chrome.runtime.onMessage.addListener(
    (msg: { type?: string; alias?: string; url?: string }, sender, reply) => {
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
      const alias = typeof msg.alias === 'string' ? msg.alias.trim() : '';
      if (!aliasFromPath(`/${alias}`)) {
        reply({ ok: false });
        return false;
      }
      void (async () => {
        try {
          const tabHost = sender.tab?.url ? new URL(sender.tab.url).hostname : '';
          if (!tabHost || !(await canBypassHost(tabHost, SITE))) {
            reply({ ok: false });
            return;
          }
          reply({ ok: true, dest: await resolveOnce(alias) });
        } catch {
          reply({ ok: false });
        }
      })();
      return true;
    },
  );
};
