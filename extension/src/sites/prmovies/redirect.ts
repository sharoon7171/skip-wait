import { canBypass } from '../../gate';

export function initPrmoviesRedirect(): void {
  void canBypass('prmovies').then((ok) => {
    if (!ok) return;
    void fetch(`https://rep.prmovies3.online/api/get?v=${Date.now()}`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((d: { response?: string }) => d.response && location.replace(atob(d.response)));
  });
}
