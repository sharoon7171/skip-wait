import { isRemoteSite } from '../../hosts/check';
import { whenDomParsed } from '../../utils/domain-check';
import { jsRedirect, readmoreHrefs, seedGateCookies } from './gate';
import { AROLINKS_UNLOCK_READY_MS, isArolinksShortenerHref } from './hosts';
import { unlockHrefFor } from './origin';
import { countdown, createOverlay, spoofVisibility } from './overlay';

const mount = createOverlay('skip-wait-arolinks-mediator', 'skip-wait-arolinks-mediator-boot');
let done = false;
let busy = false;
let slugTried = false;

const sameHost = (href: string): boolean => {
  try {
    return new URL(href, location.href).hostname === location.hostname;
  } catch {
    return false;
  }
};

const hopFrom = async (endpoint: string): Promise<string | null> => {
  const response = await fetch(endpoint, {
    credentials: 'include',
    redirect: 'follow',
    headers: { Accept: 'text/html', Referer: location.href },
  });
  return jsRedirect(await response.text(), endpoint);
};

const hopFromAny = async (endpoints: string[]): Promise<string | null> => {
  seedGateCookies();
  for (const endpoint of endpoints) {
    const next = await hopFrom(endpoint);
    if (next) return next;
  }
  return null;
};

const goNext = async (href: string): Promise<void> => {
  done = true;
  spoofVisibility();
  const overlay = mount('Moving to the next page…');
  const next = (await isArolinksShortenerHref(href)) ? await unlockHrefFor(href) : href;
  if (await isArolinksShortenerHref(next)) {
    await countdown(overlay, AROLINKS_UNLOCK_READY_MS, 'Almost ready…');
    overlay.setStatus('Opening your link…');
  }
  location.replace(next);
};

const run = async (): Promise<void> => {
  if (done || busy) return;

  const learnMore = document.querySelector<HTMLAnchorElement>('a[href*="learn_more.php"]')?.href;
  if (learnMore && document.getElementById('tp-snp2')) {
    busy = true;
    seedGateCookies();
    const next = await hopFrom(learnMore);
    if (!next) {
      busy = false;
      return;
    }
    await goNext(next);
    return;
  }

  const hop = jsRedirect(document.documentElement.innerHTML, location.href);
  if (hop && !sameHost(hop)) {
    await goNext(hop);
    return;
  }

  const landing =
    Boolean(hop && sameHost(hop)) || location.search.length > 0 || document.getElementById('btn7') != null;
  if (!landing) {
    if (slugTried || location.pathname.replace(/\/+$/, '').length <= 1) return;
    slugTried = true;
  }

  busy = true;
  const next = await hopFromAny(readmoreHrefs());
  if (!next) {
    busy = false;
    return;
  }
  await goNext(next);
};

export const initArolinksMediator = (): void => {
  if (window !== window.top) return;
  void isRemoteSite('arolinks-mediator').then((ok) => {
    if (!ok) return;
    mount('Moving to the next page…');
    const tick = (): void => {
      void run();
    };
    tick();
    if (done) return;
    const observer = new MutationObserver(() => {
      tick();
      if (done) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    whenDomParsed(tick);
  });
};
