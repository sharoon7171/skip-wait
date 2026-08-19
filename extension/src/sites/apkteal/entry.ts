import { isRemoteSite } from '../../hosts/check';
import { MSG_APKTEAL_MAIN } from './hosts';

export function initApktealProductPage(): void {
  void isRemoteSite('apkteal').then((ok) => {
    if (!ok) return;
    chrome.runtime.sendMessage({ type: MSG_APKTEAL_MAIN }).catch(() => {});
  });
}
