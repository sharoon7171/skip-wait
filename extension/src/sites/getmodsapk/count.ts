import { countWhenElement } from '../../free-bypass';
import { canBypass } from '../../gate';

export function initGetmodsapkCount(): void {
  void canBypass('getmodsapk').then((ok) => {
    if (ok) countWhenElement('#skipwait-getmodsapk-brand');
  });
}
