import { canBypass } from '../../gate';

const HUBCDN_DL_PATH_RE = /^\/dl\/?$/i;

export function initHubcdnDl(): void {
  if (!HUBCDN_DL_PATH_RE.test(location.pathname)) return;
  void canBypass('hdhub4u-hubcdn').then((ok) => {
    if (!ok) return;
    let target: string;
    try {
      const raw = new URL(location.href).searchParams.get('link');
      if (!raw) return;
      const u = new URL(raw);
      if (u.protocol !== 'http:' && u.protocol !== 'https:') return;
      if (u.origin === location.origin) return;
      target = u.href;
    } catch {
      return;
    }
    location.replace(target);
  });
}
