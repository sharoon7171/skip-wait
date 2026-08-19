import { isRemoteSite } from '../../hosts/check';
import { unlocktoearnAliasFromPath } from './hosts';
import { createOverlay } from './overlay';

const mount = createOverlay('skip-wait-unlocktoearn-entry', 'skip-wait-unlocktoearn-entry-boot');

export function initUnlocktoearnEntry(): void {
  if (window !== window.top || !unlocktoearnAliasFromPath(location.pathname)) return;
  void isRemoteSite('unlocktoearn').then((ok) => {
    if (ok) mount('Opening…');
  });
}
