import { countWhenElement } from '../../free-bypass';
import { canBypass } from '../../gate';

export function initModdroidCount(): void {
  void canBypass('moddroid').then((ok) => {
    if (ok) countWhenElement('#skipwait-moddroid-brand');
  });
}
