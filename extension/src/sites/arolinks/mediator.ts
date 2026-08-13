import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { continueEndpoint, isArticleGate, jsRedirect, seedGateCookies } from './gate';
import {
  AROLINKS_MEDIATOR_HOSTS,
  AROLINKS_UNLOCK_READY_MS,
  isArolinksShortenerHref,
} from './hosts';
import { unlockHrefFor } from './origin';
import { countdown, createOverlay, spoofVisibility } from './overlay';

const mount = createOverlay('skip-wait-arolinks-mediator', 'skip-wait-arolinks-mediator-boot');
let done = false;

const goNext = async (href: string): Promise<void> => {
  const overlay = mount('Moving to the next page…');
  const next = isArolinksShortenerHref(href) ? await unlockHrefFor(href) : href;
  if (isArolinksShortenerHref(next)) {
    await countdown(overlay, AROLINKS_UNLOCK_READY_MS, 'Almost ready…');
    overlay.setStatus('Opening your link…');
  }
  location.replace(next);
};

const run = async (): Promise<void> => {
  if (done) return;

  if (isArticleGate()) {
    done = true;
    spoofVisibility();
    mount('Moving to the next page…');
    seedGateCookies();
    const endpoint = continueEndpoint();
    if (!endpoint) return;
    const response = await fetch(endpoint, {
      credentials: 'include',
      redirect: 'follow',
      headers: { Accept: 'text/html', Referer: location.href },
    });
    const next = jsRedirect(await response.text(), endpoint);
    if (!next) return;
    await goNext(next);
    return;
  }

  const next = jsRedirect(document.documentElement.innerHTML, location.href);
  if (!next) return;
  done = true;
  spoofVisibility();
  await goNext(next);
};

export const initArolinksMediator = (): void => {
  if (window !== window.top || !isAllowedHost(AROLINKS_MEDIATOR_HOSTS)) return;
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
};
