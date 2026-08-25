import { licensedHosts, onBypassAccessChange } from '../../gate';

const RULE_ID = 917410;

const syncRedirect = async (): Promise<void> => {
  const hosts = await licensedHosts('shortxlinks');
  const origin = hosts[0] ? `https://${hosts[0]}` : '';
  if (!origin) {
    await chrome.declarativeNetRequest.updateSessionRules({ removeRuleIds: [RULE_ID], addRules: [] });
    return;
  }
  await chrome.declarativeNetRequest.updateSessionRules({
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
};

export function initShortxlinksBackground(): void {
  void syncRedirect();
  onBypassAccessChange(() => {
    void syncRedirect();
  });
}
