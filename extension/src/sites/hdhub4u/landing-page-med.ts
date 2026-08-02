import { isAllowedHost } from '../../utils/domain-check';

const LANDING_PAGE_HOSTS = [
  'hdhub4u.med',
  'hdhub4u.catering',
  'hdhub4u.ec',
  'hdhub4u.gd',
  'hdhub4u.gives',
  'hdhub4u.glass',
  'hdhub4u.gs',
  'hdhub4u.hn',
  'hdhub4u.ht',
  'hdhub4u.insure',
] as const;

const HOST_LOOKUP_URLS = [
  'https://h4.suncdn.org/host/',
  'https://points.topapii.com/host/',
  'https://ml.theapii.org/host/',
  'https://dns.pingora.fyi/v2/host',
  'https://cdn.hub4u.cloud/host/',
] as const;

export function initHdhub4uLandingPageMed(): void {
  if (!isAllowedHost(LANDING_PAGE_HOSTS)) return;
  const d = new Date();
  const v = d.getFullYear() * 1e6 + (d.getMonth() + 1) * 1e4 + d.getDate() * 100 + d.getHours() + 1;
  void Promise.any(
    HOST_LOOKUP_URLS.map(async (base) => {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 5000);
      try {
        const r = await fetch(`${base}?v=${v}`, { cache: 'no-store', signal: ctrl.signal });
        if (!r.ok) throw new Error();
        const data = (await r.json()) as { c?: string };
        if (!data?.c) throw new Error();
        const mirror = atob(data.c);
        return mirror.includes('?') ? mirror.slice(0, mirror.indexOf('?')) : mirror;
      } finally {
        clearTimeout(timer);
      }
    }),
  )
    .then((mirror) => location.replace(mirror))
    .catch(() => {});
}
