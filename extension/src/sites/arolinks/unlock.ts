import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { gtLinkDestination, isUnlockPage, jsRedirect } from './gate';
import {
  AROLINKS_DEST_WAIT_MS,
  AROLINKS_HOSTS,
  arolinksAliasFromPath,
  isArolinksShortenerHref,
  isTimedDestUrl,
} from './hosts';
import { rememberArolinksOrigin } from './origin';
import { countdown, createOverlay, spoofVisibility } from './overlay';

const mount = createOverlay('skip-wait-arolinks-unlock', 'skip-wait-arolinks-unlock-boot');
let done = false;

const openDest = async (dest: string): Promise<void> => {
  const overlay = mount('Opening your link…');
  if (isTimedDestUrl(dest)) {
    await countdown(overlay, AROLINKS_DEST_WAIT_MS, 'Waiting for access window…');
  }
  overlay.setStatus('Opening your link…');
  location.replace(dest);
};

const run = async (): Promise<void> => {
  if (done) return;

  if (isUnlockPage()) {
    const dest = gtLinkDestination();
    if (!dest) return;
    done = true;
    spoofVisibility();
    await openDest(dest);
    return;
  }

  const next = jsRedirect(document.documentElement.innerHTML, location.href);
  if (!next || isArolinksShortenerHref(next)) return;
  done = true;
  mount('Moving to the next page…');
  location.replace(next);
};

export const initArolinksUnlock = (): void => {
  if (window !== window.top || !isAllowedHost(AROLINKS_HOSTS)) return;
  const alias = arolinksAliasFromPath(location.pathname);
  if (!alias) return;
  rememberArolinksOrigin(alias, location.origin);
  mount('Getting things ready…');
  spoofVisibility();
  const tick = (): void => {
    void run();
  };
  tick();
  if (done) return;
  const observer = new MutationObserver(() => {
    tick();
    if (done) observer.disconnect();
  });
  observer.observe(document.documentElement, {
    attributeFilter: ['href'],
    attributes: true,
    childList: true,
    subtree: true,
  });
  whenDomParsed(tick);
};
