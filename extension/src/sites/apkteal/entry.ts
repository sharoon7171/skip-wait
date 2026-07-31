import { isAllowedHost } from '../../utils/domain-check';
import { APKTEAL_HOSTS, MSG_APKTEAL_MAIN } from './hosts';

export function initApktealProductPage(): void {
  if (!isAllowedHost(APKTEAL_HOSTS)) return;
  chrome.runtime.sendMessage({ type: MSG_APKTEAL_MAIN }).catch(() => {});
}
