import { canBypass } from '../../gate';
import { whenDomParsed } from '../../utils/domain-check';
import { DUPLOAD_ID_RE } from './hosts';
import { createOverlay } from './overlay';
import { requestCdn } from './resolve';

const ACTION = 'Direct Download · Skip Wait — No Timer, No Mediator';
const ERR_MISSING = 'This file was deleted or is no longer available.';
const ERR_UNLOCK = 'Could not unlock this file. Reload and try again.';

let ui: ReturnType<typeof createOverlay> | null = null;
let started = false;

const fileId = (): string | null => {
  const id = location.pathname.replace(/^\/+|\/+$/g, '');
  return id && !id.includes('/') && DUPLOAD_ID_RE.test(id) ? id : null;
};

const fileMeta = (): { name: string; size: string } => ({
  name: document.querySelector<HTMLInputElement>('form#my_form input[name="filename"]')?.value.trim() ?? '',
  size: document.querySelector<HTMLInputElement>('form#my_form input[name="size"]')?.value.trim() ?? '',
});

const isMissingFile = (): boolean => {
  const label = document.querySelector('.dfilename')?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
  if (/^file not found$/i.test(label)) return true;
  return /the file you were looking for could not be found/i.test(document.body?.innerText ?? '');
};

export const initDuploadBypass = (): void => {
  if (window !== window.top || started) return;
  const id = fileId();
  if (!id) return;
  void canBypass('dupload').then((ok) => {
    if (!ok || started) return;
    started = true;
    ui = createOverlay();
    ui.progress({ status: 'Getting things ready' });

    whenDomParsed(() => {
      const meta = fileMeta();
      if (isMissingFile()) {
        started = false;
        ui!.setError('File unavailable', ERR_MISSING, 'Nothing to download here.');
        return;
      }
      ui!.progress({ status: 'Reading your file', ...meta });
      ui!.progress({ status: 'Resolving direct CDN', ...meta });
      void requestCdn(id)
        .then((url) => {
          const ready = fileMeta();
          ui!.setReady({
            status: 'Ready — tap Direct Download when you want the file',
            ...ready,
            url,
            action: ACTION,
          });
        })
        .catch((err: unknown) => {
          started = false;
          const missing = err instanceof Error && err.message === 'missing';
          ui!.setError(
            missing ? 'File unavailable' : 'Unlock failed',
            missing ? ERR_MISSING : ERR_UNLOCK,
            missing ? 'Nothing to download here.' : undefined,
          );
        });
    });
  });
};
