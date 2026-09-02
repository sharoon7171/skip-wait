import { canBypass } from '../../gate';
import { SITE, readAlias } from './hosts';
import { createOverlay, spoofVisibility } from './overlay';
import { resolveDestination } from './resolve';

const ui = createOverlay();
let done = false;

const run = async (alias: string): Promise<void> => {
  if (done) return;
  done = true;
  spoofVisibility();
  try {
    location.replace(await resolveDestination(alias, ui.progress));
  } catch {
    done = false;
    ui.setError('Could not unlock.');
  }
};

export const initLink4subUnlock = (): void => {
  if (window !== window.top) return;
  void canBypass(SITE).then((ok) => {
    if (!ok) return;
    const tick = (): void => {
      const alias = readAlias();
      if (alias) void run(alias);
    };
    tick();
    if (done) return;
    const mo = new MutationObserver(() => {
      tick();
      if (done) mo.disconnect();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', tick, true);
    }
  });
};
