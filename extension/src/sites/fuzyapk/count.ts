import { countWhenElement } from '../../free-bypass';
import { canBypass } from '../../gate';

export function initFuzyapkCount(): void {
  void canBypass('fuzyapk').then((ok) => {
    if (ok) countWhenElement('#skipwait-fuzyapk-brand');
  });
}
