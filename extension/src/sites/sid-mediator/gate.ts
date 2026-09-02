import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { decryptSidDestination } from './decode';
import { mountOverlay, NOTE, NOTE_OPEN } from './overlay';

let started = false;

const run = async (sid: string): Promise<void> => {
  if (started) return;
  started = true;
  const overlay = mountOverlay('Decoding your link…', NOTE);
  try {
    overlay.setStatus('Decrypting destination…');
    const dest = await decryptSidDestination(sid);
    overlay.setNote(NOTE_OPEN);
    overlay.setStatus('Opening your link…');
    recordBypassSuccess();
    location.replace(dest);
  } catch (e) {
    overlay.setNote(NOTE);
    overlay.setStatus('Couldn’t decode this link. Reload and try again.');
    if (e instanceof Error && e.message) overlay.setError(e.message);
    started = false;
  }
};

export function initSidMediatorBypass(): void {
  if (window !== window.top) return;
  const sid = new URLSearchParams(location.search).get('sid')?.trim();
  if (!sid) return;
  void canBypass('sid-mediator').then((ok) => {
    if (!ok) return;
    void run(sid);
  });
}
