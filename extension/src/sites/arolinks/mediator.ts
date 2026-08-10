import { hostnameMatches } from '../../utils/domain-check';
import {
  isArolinksShortenerHref,
  msUntilUnlockReady,
  readArolinksChain,
  shortenerUrl,
  type ArolinksChain,
} from './chain';
import { continueEndpoint, isArticleGate, jsRedirect, seedGateCookies } from './gate';
import { AROLINKS_HOSTS } from './hosts';
import { createOverlay, spoofVisibility } from './overlay';

const mount = createOverlay('skip-wait-arolinks-mediator', 'skip-wait-arolinks-mediator-boot');
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

async function goNext(chain: ArolinksChain, next: string): Promise<void> {
  if (isArolinksShortenerHref(next, chain.alias)) {
    const waitMs = msUntilUnlockReady(chain);
    if (waitMs > 0) {
      const overlay = mount('Almost ready…');
      overlay.startCountdown(Date.now() + waitMs);
      await sleep(waitMs);
      overlay.hideCountdown();
    }
    mount('Opening your link…');
    location.replace(shortenerUrl(chain));
    return;
  }
  mount('Moving to the next page…');
  location.replace(next);
}

export function initArolinksMediator(): void {
  if (hostnameMatches(location.hostname, AROLINKS_HOSTS)) return;

  void (async () => {
    const chain = await readArolinksChain();
    if (!chain) return;

    let done = false;

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
        await goNext(chain, next);
        return;
      }

      const next = jsRedirect(document.documentElement.innerHTML, location.href);
      if (!next) return;
      done = true;
      spoofVisibility();
      await goNext(chain, next);
    };

    await run();
    if (done) return;

    const observer = new MutationObserver(() => {
      void (async () => {
        await run();
        if (done) observer.disconnect();
      })();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  })();
}
