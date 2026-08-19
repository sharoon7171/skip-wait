import { isRemoteSite } from '../../hosts/check';
import { whenDomParsed } from '../../utils/domain-check';

const isPremiumGate = (): boolean => {
  if (/[?&](?:pid|vid|skip_sub)=/.test(location.search)) return false;
  if (document.querySelector('#go-link, form[action*="/links/go"], a.get-link')) return false;
  return !!(
    document.querySelector('a.gate-btn-skip[href*="skip_sub"]') ||
    document.querySelector('.gate-btn-skip, .gate-hero, #gatePayBtn')
  );
};

const skipPremium = (): void => {
  if (!isPremiumGate()) return;
  const skip = document.querySelector<HTMLAnchorElement>('a.gate-btn-skip[href*="skip_sub"]');
  if (skip?.href) {
    location.replace(skip.href);
    return;
  }
  const u = new URL(location.href);
  u.searchParams.set('skip_sub', '1');
  location.replace(u.href);
};

export function initGplinksGate(): void {
  void isRemoteSite('gplinks').then((ok) => {
    if (!ok) return;
    whenDomParsed(skipPremium);
  });
}
