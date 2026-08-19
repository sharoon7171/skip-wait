import { isRemoteSite } from '../../hosts/check';
import { MSG_ANYGAME_MAIN } from './hosts';

export function initAnygameProductPage(): void {
  void isRemoteSite('anygame').then((ok) => {
    if (!ok) return;
    chrome.runtime.sendMessage({ type: MSG_ANYGAME_MAIN }).catch(() => {});
  });
}
