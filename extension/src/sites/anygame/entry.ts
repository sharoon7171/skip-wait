import { isAllowedHost } from '../../utils/domain-check';
import { ANYGAME_HOSTS, MSG_ANYGAME_MAIN } from './hosts';

export function initAnygameProductPage(): void {
  if (!isAllowedHost(ANYGAME_HOSTS)) return;
  chrome.runtime.sendMessage({ type: MSG_ANYGAME_MAIN }).catch(() => {});
}
