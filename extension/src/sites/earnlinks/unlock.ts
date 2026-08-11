import { linksGoFormFromHtml, postLinksGo } from '../adlinkfly/unlock';
import { hostnameMatches, isAllowedHost } from '../../utils/domain-check';
import {
  EARNLINKS_HOSTS,
  EARNLINKS_MEDIATOR_HOSTS,
  earnlinksAliasFromPath,
} from './hosts';
import { createOverlay, spoofVisibility } from './overlay';

const mount = createOverlay('skip-wait-earnlinks-unlock', 'skip-wait-earnlinks-unlock-boot');
let done = false;

function hasForm(): boolean {
  return !!document.querySelector('#go-link input[name="ad_form_data"]');
}

function fromMediator(): boolean {
  try {
    return hostnameMatches(new URL(document.referrer).hostname, EARNLINKS_MEDIATOR_HOSTS);
  } catch {
    return false;
  }
}

async function unlock(): Promise<void> {
  if (done) return;
  done = true;
  spoofVisibility();
  document.cookie = 'ab=1; path=/';
  const overlay = mount('Unlocking…');
  const form = linksGoFormFromHtml(document.documentElement.outerHTML, location.href);
  if (!form) {
    overlay.setError('Unlock form missing.');
    return;
  }
  const url = await postLinksGo(form, location.href);
  if (!url) {
    overlay.setError('Could not unlock.');
    return;
  }
  overlay.setStatus('Opening…');
  location.replace(url);
}

function run(): void {
  if (done) return;
  if (!earnlinksAliasFromPath(location.pathname)) return;

  if (hasForm()) {
    void unlock();
    return;
  }

  if (document.readyState === 'loading') return;

  if (fromMediator()) {
    const overlay = mount('Unlocking…');
    if (document.readyState === 'complete') {
      done = true;
      overlay.setError('Unlock form missing.');
    }
    return;
  }

  mount('Waiting for unlock…');
}

export function initEarnlinksUnlock(): void {
  if (window !== window.top || !isAllowedHost(EARNLINKS_HOSTS)) return;
  if (!earnlinksAliasFromPath(location.pathname)) return;
  run();
  if (done) return;
  const observer = new MutationObserver(() => {
    run();
    if (done) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, true);
    document.addEventListener('readystatechange', run, true);
  }
}
