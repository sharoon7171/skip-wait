import { countOnMessage } from '../../free-bypass';
import { canBypass } from '../../gate';
import { MSG_APKTEAL_MAIN } from './hosts';

export function initApktealProductPage(): void {
  void canBypass('apkteal').then((ok) => {
    if (!ok) return;
    countOnMessage('skip-wait-apkteal', 'cdn');
    chrome.runtime.sendMessage({ type: MSG_APKTEAL_MAIN }).catch(() => {});
  });
}
