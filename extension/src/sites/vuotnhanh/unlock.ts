import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { SITE, csrfToken, readAlias, trafficDest } from './hosts';
import { createOverlay, spoofVisibility } from './overlay';
import { resolveDestination } from './resolve';

const ui = createOverlay();
let done = false;

const run = async (alias: string | null): Promise<void> => {
  if (done) return;
  done = true;
  spoofVisibility();
  try {
    const dest = await resolveDestination(alias ?? '', ui.progress);
    recordBypassSuccess();
    location.replace(dest);
  } catch {
    done = false;
    ui.setError('Could not unlock.');
  }
};

export const initVuotnhanhUnlock = (): void => {
  if (window !== window.top) return;

  if (trafficDest(location.href)) {
    void canBypass(SITE).then((ok) => {
      if (ok) void run(null);
    });
    return;
  }

  const alias = readAlias();
  if (!alias) return;

  void canBypass(SITE).then((ok) => {
    if (!ok) return;
    spoofVisibility();
    ui.progress({
      lead: 'Hang tight — unlocking your link.',
      detail: 'Skip Wait is skipping VuotNhanh waits for you.',
      status: 'Getting things ready',
    });
    const tick = (): void => {
      if (csrfToken()) void run(alias);
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
