import { isRemoteSite } from '../../hosts/check';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { whenDomParsed } from '../../utils/domain-check';
import { requestCdn } from './resolve';

const OVERLAY_ID = 'skip-wait-devuploads-overlay';
const BOOT_STYLE_ID = 'skip-wait-devuploads-boot';
const SIZE_RE = /(\d+(?:\.\d+)?\s*[KMGT]?B)/i;
const ACTION = 'Direct Download · Skip Wait — No Timer, No Mediator';

let ui: FullPageOverlay | null = null;
let started = false;

const fileMeta = (): { name: string; size: string } => {
  const name =
    document.querySelector('.file-info .name h4')?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
  const size =
    [...document.querySelectorAll('.file-info .name span')]
      .map((el) => el.textContent?.replace(/\s+/g, ' ').trim() ?? '')
      .map((t) => t.match(SIZE_RE)?.[1]?.replace(/\s+/g, ' ').trim() ?? '')
      .find(Boolean) ?? '';
  return { name, size };
};

const fileNote = (name: string, size: string) =>
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
  (document.head || document.documentElement).appendChild(s);
};

const mount = (status: string, name: string, size: string): FullPageOverlay => {
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

const isDevuploadsCard = (): HTMLFormElement | null => {
  const form = document.querySelector<HTMLFormElement>('#dlform');
  if (!form?.querySelector('input[name="op"][value="download2"]')) return null;
  if (!/devuploads\.com/i.test(form.getAttribute('action') || form.action)) return null;
  return form;
};

const unlock = async (id: string, name: string, size: string): Promise<void> => {
  const overlay = mount('Resolving direct CDN…', name, size);
  try {
    const url = await requestCdn(id);
    overlay.setStatus('Ready — tap Direct Download when you want the file.');
    overlay.setAction(url, ACTION);
  } catch {
    started = false;
    overlay.setAction(null);
    overlay.setError('Could not unlock this file. Reload and try again.');
  }
};

export const initDevuploadsMediator = (): void => {
  if (window !== window.top) return;
  void isRemoteSite('devuploads-mediator').then((ok) => {
    if (!ok) return;
    whenDomParsed(() => {
      const form = isDevuploadsCard();
      const id = form?.querySelector<HTMLInputElement>('input[name="id"]')?.value.trim();
      if (!form || !id || started) return;
      started = true;
      const { name, size } = fileMeta();
      boot();
      mount('Getting things ready…', name, size);
      void unlock(id, name, size);
    });
  });
};
