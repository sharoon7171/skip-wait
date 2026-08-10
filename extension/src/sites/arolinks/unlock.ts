import { isAllowedHost } from '../../utils/domain-check';
import {
  arolinksAliasFromPath,
  clearArolinksChain,
  isArolinksShortenerHref,
  writeArolinksChain,
} from './chain';
import { gtLinkDestination, isUnlockShell, jsRedirect } from './gate';
import { AROLINKS_DEST_WAIT_MS, AROLINKS_HOSTS, isTimedDestUrl } from './hosts';
import { createOverlay, spoofVisibility } from './overlay';

const mount = createOverlay('skip-wait-arolinks-unlock', 'skip-wait-arolinks-unlock-boot');
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export function initArolinksUnlock(): void {
  if (!isAllowedHost(AROLINKS_HOSTS)) return;
  const alias = arolinksAliasFromPath(location.pathname);
  if (!alias) return;

  const chainWrite = writeArolinksChain(alias, location.origin);
  mount('Getting things ready…');
  spoofVisibility();

  let done = false;

  const run = async (): Promise<void> => {
    if (done) return;

    if (isUnlockShell()) {
      const dest = gtLinkDestination();
      if (!dest) return;
      done = true;
      await clearArolinksChain();
      if (isTimedDestUrl(dest)) {
        const overlay = mount('Waiting for access window…');
        overlay.startCountdown(Date.now() + AROLINKS_DEST_WAIT_MS);
        await sleep(AROLINKS_DEST_WAIT_MS);
        overlay.hideCountdown();
      }
      mount('Opening your link…');
      location.replace(dest);
      return;
    }

    const next = jsRedirect(document.documentElement.innerHTML, location.href);
    if (!next || isArolinksShortenerHref(next, alias)) return;
    done = true;
    mount('Moving to the next page…');
    await chainWrite;
    location.replace(next);
  };

  void run();
  if (done) return;

  const observer = new MutationObserver(() => {
    void (async () => {
      await run();
      if (done) observer.disconnect();
    })();
  });
  observer.observe(document.documentElement, {
    attributeFilter: ['href'],
    attributes: true,
    childList: true,
    subtree: true,
  });
}
