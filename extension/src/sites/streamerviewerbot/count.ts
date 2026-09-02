import { countWhenElement } from '../../free-bypass';
import { canBypass } from '../../gate';

export function initStreamerviewerbotCount(): void {
  if (!location.pathname.includes('/trial/trial.php')) return;
  void canBypass('streamerviewerbot').then((ok) => {
    if (ok) countWhenElement('#skipwait-svb-brand');
  });
}
