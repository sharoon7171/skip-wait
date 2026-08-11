import { isAllowedHost } from '../../utils/domain-check';
import { UNLOCKTOEARN_HOSTS, unlocktoearnAliasFromPath } from './hosts';
import { createOverlay } from './overlay';

const mount = createOverlay('skip-wait-unlocktoearn-entry', 'skip-wait-unlocktoearn-entry-boot');

export function initUnlocktoearnEntry(): void {
  if (window !== window.top || !isAllowedHost(UNLOCKTOEARN_HOSTS)) return;
  if (!unlocktoearnAliasFromPath(location.pathname)) return;
  mount('Opening…');
}
