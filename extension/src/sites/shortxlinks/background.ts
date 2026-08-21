import { remoteSiteHosts } from '../../hosts/check';

const RULE_ID = 917410;

export function initShortxlinksBackground(): void {
  void remoteSiteHosts('shortxlinks').then((hosts) => {
    const origin = hosts[0] ? `https://${hosts[0]}` : '';
    if (!origin) return;
    void chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds: [RULE_ID],
      addRules: [
        {
          id: RULE_ID,
          priority: 1,
          action: {
            type: 'redirect',
            redirect: { regexSubstitution: `${origin}/\\1?\\2` },
          },
          condition: {
            regexFilter: '^https?://[^/?#]+/?\\?adlinkfly=([A-Za-z0-9_-]+)\\?([A-Za-z0-9]+)$',
            resourceTypes: ['main_frame'],
          },
        },
      ],
    });
  });
}
