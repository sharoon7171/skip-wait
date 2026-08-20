import { isRemoteSite } from '../../hosts/check';
import { whenDomParsed } from '../../utils/domain-check';
import { armUnlockReferer, openDestinationTab } from './background';
import { isVpnPage, pleaseWaitTarget, unlockDestination } from './gate';
import {
  AROLINKS_DEST_WAIT_MS,
  AROLINKS_UNLOCK_READY_MS,
  arolinksAliasFromPath,
  isArolinksAliasNav,
  isTimedDestUrl,
} from './hosts';
import { countdown, createOverlay, spoofVisibility } from './overlay';

const mount = createOverlay();
let done = false;

const openDestination = async (dest: string): Promise<void> => {
  if (await isTimedDestUrl(dest)) {
    const overlay = mount('Waiting for access window…');
    await countdown(overlay, AROLINKS_DEST_WAIT_MS, 'Waiting for access window…');
  }
  const overlay = mount('Opening your link…');
  if (!(await openDestinationTab(dest))) overlay.setStatus('Could not open link');
};

const openUnlockPage = async (alias: string, assigned: string): Promise<void> => {
  const overlay = mount('Getting things ready…');
  await countdown(overlay, AROLINKS_UNLOCK_READY_MS, 'Almost ready…');
  overlay.setStatus('Opening unlock page…');
  const url = `${location.origin}/${alias}`;
  if (!(await armUnlockReferer(url, `${new URL(assigned).origin}/`))) {
    overlay.setStatus('Could not open link');
    return;
  }
  location.replace(url);
};

const run = async (alias: string): Promise<void> => {
  if (done || isVpnPage()) return;
  const dest = unlockDestination();
  if (dest) {
    done = true;
    spoofVisibility();
    await openDestination(dest);
    return;
  }
  const assigned = pleaseWaitTarget(document.documentElement.innerHTML, location.href);
  if (!assigned || isArolinksAliasNav(assigned)) return;
  done = true;
  spoofVisibility();
  await openUnlockPage(alias, assigned);
};

export const initArolinksUnlock = (): void => {
  if (window !== window.top) return;
  const alias = arolinksAliasFromPath(location.pathname);
  if (!alias) return;

  void isRemoteSite('arolinks').then((ok) => {
    if (!ok) return;
    const tick = (): void => {
      void run(alias);
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
    const poll = window.setInterval(() => {
      tick();
      if (done) window.clearInterval(poll);
    }, 200);
    whenDomParsed(tick);
  });
};
