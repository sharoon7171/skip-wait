import { remoteSiteHosts } from '../../hosts/check';
import { ALIAS_DNR, MSG_PROGRESS, MSG_RESOLVE, SITE, isShortUrl, type SflProgress } from './hosts';
import { resolveDestination } from './resolve';

const RULE_BASE = 918620;
const RULE_SLOTS = 8;

const ruleIds = (): number[] => Array.from({ length: RULE_SLOTS }, (_, i) => RULE_BASE + i);

const syncRedirects = async (): Promise<void> => {
  const hosts = await remoteSiteHosts(SITE);
  if (!hosts.length) return;
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: ruleIds(),
    addRules: hosts.slice(0, RULE_SLOTS).map((host, i) => ({
      id: RULE_BASE + i,
      priority: 1,
      action: {
        type: 'redirect' as const,
        redirect: {
          regexSubstitution: `chrome-extension://${chrome.runtime.id}/working.html?site=${SITE}&u=https://${host}/\\1`,
        },
      },
      condition: {
        regexFilter: `^https?://${host.replace(/\./g, '\\.')}/${ALIAS_DNR}/?$`,
        resourceTypes: ['main_frame' as const],
      },
    })),
  });
};

export const initSflBackground = (): void => {
  void syncRedirects();
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && ('skipWaitHosts' in changes || 'skipWaitHostsUpdatedAt' in changes)) {
      void syncRedirects();
    }
  });
  chrome.runtime.onMessage.addListener((msg: { type?: string; unlockUrl?: string }, _sender, reply) => {
    if (msg.type !== MSG_RESOLVE) return false;
    const unlockUrl = typeof msg.unlockUrl === 'string' ? msg.unlockUrl : '';
    if (!isShortUrl(unlockUrl)) {
      reply({ ok: false });
      return false;
    }
    const push = (p: SflProgress): void => {
      void chrome.runtime.sendMessage({ type: MSG_PROGRESS, ...p }).catch(() => {});
    };
    void resolveDestination(unlockUrl, push)
      .then((dest) => reply({ ok: true, dest }))
      .catch(() => reply({ ok: false }));
    return true;
  });
};
