import { isAllowedHost } from '../../utils/domain-check';
import { unlocktoearnAliasFromPath, writeUnlocktoearnChain } from './chain';
import { UNLOCKTOEARN_HOSTS } from './hosts';
import { createUnlocktoearnOverlay } from './overlay';

const mount = createUnlocktoearnOverlay(
  'skip-wait-unlocktoearn-entry',
  'skip-wait-unlocktoearn-entry-boot',
);

async function resolveGateRedirect(alias: string): Promise<string | null> {
  try {
    const res = await fetch(`${location.origin}/${encodeURIComponent(alias)}`, {
      cache: 'no-store',
      credentials: 'include',
      method: 'GET',
      redirect: 'manual',
    });
    const loc = res.headers.get('Location')?.trim();
    if (!loc) return null;
    return new URL(loc, location.origin).href;
  } catch {
    return null;
  }
}

export function initUnlocktoearnEntry(): void {
  if (window !== window.top) return;
  if (!isAllowedHost(UNLOCKTOEARN_HOSTS)) return;
  const alias = unlocktoearnAliasFromPath(location.pathname);
  if (!alias) return;

  mount('Starting Unlock To Earn…');

  void (async (): Promise<void> => {
    await writeUnlocktoearnChain(alias, location.origin);
    mount('Opening Unlock To Earn gate…');
    const next = await resolveGateRedirect(alias);
    if (!next) return;
    location.replace(next);
  })();
}
