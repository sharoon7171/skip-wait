import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { isAllowedHost } from '../../utils/domain-check';
import { DUPLOAD_HOSTS, DUPLOAD_ID_RE } from './hosts';
import { requestCdn } from './resolve';

const OVERLAY_ID = 'skip-wait-dupload-overlay';
const BOOT_STYLE_ID = 'skip-wait-dupload-boot';
const ACTION = 'Direct Download · Skip Wait — No Timer, No Mediator';

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

export const initDuploadBypass = (): void => {
  if (window !== window.top || !isAllowedHost(DUPLOAD_HOSTS) || started) return;
  const id = fileId();
  if (!id) return;
  started = true;

  const overlay = mount('Resolving direct CDN…', '', '');
  const syncMeta = (): void => {
    const { name, size } = fileMeta();
    if (name || size) overlay.setNote(fileNote(name, size));
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncMeta, true);
  else syncMeta();

  void requestCdn(id)
    .then((url) => {
      syncMeta();
      overlay.setStatus('Ready — tap Direct Download when you want the file.');
      overlay.setAction(url, ACTION);
    })
    .catch(() => {
      started = false;
      overlay.setAction(null);
      overlay.setError('Could not unlock this file. Reload and try again.');
    });
};
