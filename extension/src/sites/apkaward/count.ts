import { countWhenElement } from '../../free-bypass';
import { canBypass } from '../../gate';

export function initApkawardCount(): void {
  void canBypass('apkaward').then((ok) => {
    if (ok) countWhenElement('#skipwait-apkaward-brand');
  });
}
