import { isRemoteSite } from '../../hosts/check';
import { whenDomParsed } from '../../utils/domain-check';

function redirect(): void {
  const u = document.querySelector<HTMLAnchorElement>('#butunlock a')?.href;
  if (u) location.replace(u);
}

export function initSub2getRedirect(): void {
  if (!/[?&]l=/.test(location.search)) return;
  void isRemoteSite('sub2get').then((ok) => {
    if (ok) whenDomParsed(redirect);
  });
}
