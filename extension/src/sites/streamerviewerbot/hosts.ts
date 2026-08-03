import { hostnameMatches } from '../../utils/domain-check';

export const STREAMERVIEWERBOT_HOSTS = ['streamerviewerbot.com'] as const;

export function isStreamerviewerbotTrialUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return (
      hostnameMatches(u.hostname, STREAMERVIEWERBOT_HOSTS) &&
      u.pathname.includes('/trial/trial.php')
    );
  } catch {
    return false;
  }
}
