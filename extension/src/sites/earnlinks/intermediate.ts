import { createFullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { hostnameMatches } from '../../utils/domain-check';
import { EARNLINKS_ALIAS_RE, readEarnlinksChain } from './chain';
import { EARNLINKS_HOSTS } from './hosts';

const ID = 'skip-wait-earnlinks-med';
const BOOT = 'skip-wait-earnlinks-med-boot';
const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let started = false;

const alias = (): string | null => {
  const q = new URLSearchParams(location.search);
  for (const k of ['isp', 'dsp', 'grey'] as const) {
    const v = q.get(k)?.trim();
    if (v && EARNLINKS_ALIAS_RE.test(v)) return v;
  }
  const v = document.cookie.match(/(?:^|;\s*)(?:me_e|buys|mew111|me)=([^;]+)/)?.[1]?.trim();
  return v && EARNLINKS_ALIAS_RE.test(v) ? v : null;
};

export const initEarnlinksIntermediate = (): void => {
  if (window !== window.top || hostnameMatches(location.hostname, EARNLINKS_HOSTS) || started) return;
  void (async () => {
    const chain = await readEarnlinksChain();
    const a = alias();
    if (!chain || !a) return;
    started = true;
    const active = overlayActiveClass(ID);
    document.documentElement.classList.add(active);
    if (!document.getElementById(BOOT)) {
      const s = document.createElement('style');
      s.id = BOOT;
      s.textContent = buildFullPageOverlayCss(ID, active);
      document.documentElement.appendChild(s);
    }
    createFullPageOverlay({ id: ID, brand: 'Skip Wait', note: NOTE, status: 'Skipping ads…' });
    for (const path of [
      `/essentialgios/?isp=${a}`,
      `/projectsafai/?dsp=${a}`,
      `/geion.php?grey=${a}`,
      `/geio.php?grey=${a}`,
    ]) {
      try {
        await fetch(location.origin + path, { credentials: 'include', redirect: 'manual' });
      } catch {}
    }
    location.replace(`${chain.origin}/${a}`);
  })();
};
