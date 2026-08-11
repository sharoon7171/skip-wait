import { isAllowedHost } from '../../utils/domain-check';
import { EARNLINKS_ALIAS_RE, EARNLINKS_MEDIATOR_HOSTS, earnlinksShortenerUrl } from './hosts';
import { createOverlay } from './overlay';

const mount = createOverlay('skip-wait-earnlinks-mediator', 'skip-wait-earnlinks-mediator-boot');
let done = false;

function alias(): string | null {
  const q = new URLSearchParams(location.search);
  for (const key of ['isp', 'dsp', 'grey'] as const) {
    const value = q.get(key)?.trim();
    if (value && EARNLINKS_ALIAS_RE.test(value)) return value;
  }
  const value = document.cookie.match(/(?:^|;\s*)(?:me_e|buys|mew111|me)=([^;]+)/)?.[1]?.trim();
  return value && EARNLINKS_ALIAS_RE.test(value) ? value : null;
}

function run(): void {
  if (done) return;
  const a = alias();
  if (!a) return;
  done = true;
  mount('Skipping ads…');
  location.replace(earnlinksShortenerUrl(a));
}

export function initEarnlinksMediator(): void {
  if (window !== window.top || !isAllowedHost(EARNLINKS_MEDIATOR_HOSTS)) return;
  run();
  if (done) return;
  const observer = new MutationObserver(() => {
    run();
    if (done) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, true);
  }
}
