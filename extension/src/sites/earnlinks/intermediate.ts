import { createFullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { hostnameMatches, isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { EARNLINKS_INTERMEDIATE_HOSTS, EARNLINKS_RETURN_HOST } from './hosts';

const OVERLAY_ID = 'skip-wait-earnlinks-med';
const BOOT_STYLE_ID = 'skip-wait-earnlinks-med-boot';
const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;
const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let started = false;

const alias = (): string | null => {
  const q = new URLSearchParams(location.search);
  for (const k of ['isp', 'dsp', 'grey'] as const) {
    const v = q.get(k)?.trim();
    if (v && ALIAS_RE.test(v)) return v;
  }
  const m = document.cookie.match(/(?:^|;\s*)(?:me_e|buys|mew111|me)=([^;]+)/);
  const v = m?.[1]?.trim();
  return v && ALIAS_RE.test(v) ? v : null;
};

const returnHost = (): string | null => {
  const h = location.hostname.toLowerCase();
  for (const [med, ret] of Object.entries(EARNLINKS_RETURN_HOST)) {
    if (hostnameMatches(h, [med])) return ret;
  }
  return null;
};

const hops = (a: string): string[] => [
  `/essentialgios/?isp=${a}`,
  `/projectsafai/?dsp=${a}`,
  `/geion.php?grey=${a}`,
  `/geio.php?grey=${a}`,
];

const run = async (): Promise<void> => {
  if (started) return;
  const a = alias();
  const ret = returnHost();
  if (!a || !ret) return;
  started = true;
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (!document.getElementById(BOOT_STYLE_ID)) {
    const s = document.createElement('style');
    s.id = BOOT_STYLE_ID;
    s.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
    (document.head || document.documentElement).appendChild(s);
  }
  createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note: NOTE,
    status: 'Skipping ads…',
  });
  for (const path of hops(a)) {
    try {
      await fetch(location.origin + path, { credentials: 'include', redirect: 'manual' });
    } catch {}
  }
  location.replace(`https://${ret}/${a}`);
};

export function initEarnlinksIntermediate(): void {
  if (window !== window.top || !isAllowedHost(EARNLINKS_INTERMEDIATE_HOSTS)) return;
  if (alias()) {
    void run();
    return;
  }
  whenDomParsed(() => void run());
}
