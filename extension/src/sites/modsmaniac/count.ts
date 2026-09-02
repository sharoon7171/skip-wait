import { countWhenElement } from '../../free-bypass';
import { canBypass } from '../../gate';

export function initModsmaniacCount(): void {
  void canBypass('modsmaniac').then((ok) => {
    if (ok) countWhenElement('#skipwait-modsmaniac-brand');
  });
}
