import { canBypassHost } from '../../gate';

export async function isStreamerviewerbotTrialUrl(url: string): Promise<boolean> {
  try {
    const u = new URL(url);
    return (await canBypassHost(u.hostname, 'streamerviewerbot')) && u.pathname.includes('/trial/trial.php');
  } catch {
    return false;
  }
}
