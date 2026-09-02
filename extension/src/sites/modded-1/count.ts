import { countWhenElement } from '../../free-bypass';
import { canBypass } from '../../gate';

export function initModded1Count(): void {
  void canBypass('modded-1').then((ok) => {
    if (ok) countWhenElement('#skipwait-modded1-brand');
  });
}
