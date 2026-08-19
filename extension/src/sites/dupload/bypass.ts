import { isRemoteSite } from '../../hosts/check';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { whenDomParsed } from '../../utils/domain-check';
import { DUPLOAD_ID_RE } from './hosts';
import { requestCdn } from './resolve';

const OVERLAY_ID = 'skip-wait-dupload-overlay';
const BOOT_STYLE_ID = 'skip-wait-dupload-boot';
const ACTION = 'Direct Download · Skip Wait — No Timer, No Mediator';
const ERR_MISSING = 'This file was deleted or is no longer available.';
const ERR_UNLOCK = 'Could not unlock this file. Reload and try again.';

let ui: FullPageOverlay | null = null;
let started = false;

const fileNote = (name: string, size = '') =>
  size
    ? { lead: name || 'Hang tight — unlocking your file.', detail: size }
    : { lead: name || 'Hang tight — unlocking your file.' };

const boot = (): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = BOOT_STYLE_ID;
  s.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head ?? document.documentElement).appendChild(s);
};

const mount = (status: string, name: string, size = ''): FullPageOverlay => {
  boot();
  if (ui) {
    ui.setNote(fileNote(name, size));
    ui.setStatus(status);
    ui.setError(null);
    return ui;
  }
  ui = createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note: fileNote(name, size),
    status,
  });
  return ui;
};

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

const fail = (overlay: FullPageOverlay, message: string): void => {
  started = false;
  overlay.setAction(null);
  if (message === ERR_MISSING) overlay.setNote({ lead: 'Nothing to download here.' });
  overlay.setStatus(message === ERR_MISSING ? 'File unavailable' : 'Unlock failed');
  overlay.setError(message);
};

export const initDuploadBypass = (): void => {
  if (window !== window.top || started) return;
  const id = fileId();
  if (!id) return;
  void isRemoteSite('dupload').then((ok) => {
    if (!ok || started) return;
    started = true;

    const overlay = mount('Getting things ready…', '', '');
    whenDomParsed(() => {
      const { name, size } = fileMeta();
      if (name || size) overlay.setNote(fileNote(name, size));
      if (isMissingFile()) {
        fail(overlay, ERR_MISSING);
        return;
      }
      overlay.setStatus('Resolving direct CDN…');
      void requestCdn(id)
        .then((url) => {
          const meta = fileMeta();
          if (meta.name || meta.size) overlay.setNote(fileNote(meta.name, meta.size));
          overlay.setStatus('Ready — tap Direct Download when you want the file.');
          overlay.setAction(url, ACTION);
        })
        .catch((err: unknown) => {
          fail(overlay, err instanceof Error && err.message === 'missing' ? ERR_MISSING : ERR_UNLOCK);
        });
    });
  });
};
