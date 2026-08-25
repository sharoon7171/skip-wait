import { canBypass } from '../../gate';
import { createOverlay } from './overlay';

const HOST_LOOKUP_URLS = [
  'https://h4.suncdn.org/host/',
  'https://points.topapii.com/host/',
  'https://ml.theapii.org/host/',
  'https://dns.pingora.fyi/v2/host',
  'https://cdn.hub4u.cloud/host/',
] as const;

const LOOKUP_TIMEOUT_MS = 5000;

type HostLookup = { c?: unknown };

const mount = createOverlay('skip-wait-hdhub4u-landing', 'skip-wait-hdhub4u-landing-boot', {
  lead: 'Hang tight — opening the main site.',
  detail: "You don't need to tap anything on the page.",
});

const lookupVersion = (d: Date): number =>
  d.getFullYear() * 1e6 + (d.getMonth() + 1) * 1e4 + d.getDate() * 100 + d.getHours() + 1;

async function fetchMirror(base: string, version: number): Promise<string> {
  const res = await fetch(`${base}?v=${version}`, {
    cache: 'no-store',
    signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`host lookup ${res.status}`);
  const { c } = (await res.json()) as HostLookup;
  if (typeof c !== 'string') throw new Error('host lookup payload missing mirror');
  const mirror = atob(c);
  const query = mirror.indexOf('?');
  return query === -1 ? mirror : mirror.slice(0, query);
}

export function initHdhub4uLandingPageMed(): void {
  void canBypass('hdhub4u').then((ok) => {
    if (!ok) return;
    const overlay = mount('Opening the main site…');
    const version = lookupVersion(new Date());
    void Promise.any(HOST_LOOKUP_URLS.map((base) => fetchMirror(base, version)))
      .then((mirror) => location.replace(mirror))
      .catch(() => overlay.setError('Could not find the main site. Reload and try again.'));
  });
}
