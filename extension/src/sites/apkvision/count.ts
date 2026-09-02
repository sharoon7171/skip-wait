import { countWhenElement } from '../../free-bypass';
import { canBypass } from '../../gate';

export function initApkvisionCount(): void {
  void canBypass('apkvision').then((ok) => {
    if (ok) countWhenElement('#skipwait-apkvision-brand');
  });
}
