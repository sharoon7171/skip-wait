import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { cdnFromPleaseWaitHtml } from './decrypt';
import { OCEANSOFGAMESS_WAIT_HOSTS } from './hosts';

function postedId(): string {
  const input = document.querySelector('input[name="id"]');
  return input instanceof HTMLInputElement ? input.value.trim() : '';
}

export function initOceansofgamessPleaseWait(): void {
  if (!isAllowedHost(OCEANSOFGAMESS_WAIT_HOSTS)) return;
  if (!/Please-Wait\.php/i.test(location.pathname)) return;
  whenDomParsed(() => {
    document.getElementById('gip_form')?.removeAttribute('id');
    void cdnFromPleaseWaitHtml(document.documentElement.innerHTML, postedId()).then((cdn) => {
      if (cdn) location.replace(cdn);
    });
  });
}
