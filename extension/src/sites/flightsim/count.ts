import { countOnMessage } from '../../free-bypass';
import { canBypass } from '../../gate';

export function initFlightsimCount(): void {
  void canBypass('flightsim').then((ok) => {
    if (ok) countOnMessage('skip-wait-flightsim', 'skip');
  });
}
