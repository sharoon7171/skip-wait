import { isRemoteSite } from '../../hosts/check';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';

const OVERLAY_ID = 'skip-wait-10drives-overlay';
const BOOT_STYLE_ID = 'skip-wait-10drives-boot';
const DL_RE = /https:\/\/10drives\.com\/op\/dl\/[^"'\s<>]+/i;
const OPEN_RE = /window\.open\("(https:\/\/gamesmain\.xyz\/[^"]+)"/i;
const FILE_RE = /<strong[^>]*>([^<]+)<\/strong>\s*<span[^>]*>File Size:\s*([^<]+)<\/span>/i;
const ACTION = 'Direct Download · Skip Wait — No Timer, No Mediator';

let ui: FullPageOverlay | null = null;
let started = false;

const fileNote = (name: string, size = '') =>
  size
    ? { lead: name || 'Hang tight — unlocking your file.', detail: size }
    : { lead: name || 'Hang tight — unlocking your file.' };

const fileFromHtml = (html: string): { name: string; size: string } => {
  const m = html.match(FILE_RE);
  return { name: m?.[1]?.replace(/\s+/g, ' ').trim() ?? '', size: m?.[2]?.trim() ?? '' };
};

const fileFromDl = (url: string): string => {
  const m = url.match(/\/op\/dl\/\d+\/[^/]+\/([^/]+)/);
  if (!m?.[1]) return '';
  try {
    const b64 = m[1] + '='.repeat((4 - (m[1].length % 4)) % 4);
    return atob(b64).split('|')[0]?.trim() ?? '';
  } catch {
    return '';
  }
};

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

const html = async (url: string): Promise<string> => {
  const res = await fetch(url, { credentials: 'include', cache: 'no-store' });
  if (!res.ok) throw new Error('fetch');
  return res.text();
};

const mintDl = async (): Promise<{ url: string; name: string; size: string }> => {
  const page = document.documentElement.innerHTML;
  let { name, size } = fileFromHtml(page);
  const ready = page.match(DL_RE)?.[0];
  if (ready) return { url: ready, name: name || fileFromDl(ready), size };

  let article = /\/20\d{2}\/\d{2}\//.test(location.pathname) ? location.href : page.match(OPEN_RE)?.[1];
  if (!article) {
    document.cookie = 'page=2; path=/';
    const home = await html(`${location.origin}/`);
    if (!name) ({ name, size } = fileFromHtml(home));
    article = home.match(OPEN_RE)?.[1];
  }
  if (!article) throw new Error('article');

  document.cookie = 'page=3; path=/';
  const body = await html(article);
  if (!name) ({ name, size } = fileFromHtml(body));
  const url = body.match(DL_RE)?.[0];
  if (!url) throw new Error('dl');
  return { url, name: name || fileFromDl(url), size };
};

export const initTendrivesMediator = (): void => {
  if (window !== window.top || started) return;
  if (!document.cookie.split('; ').some((c) => c.startsWith('fid='))) return;
  void isRemoteSite('tendrives').then((ok) => {
    if (!ok || started) return;
    started = true;
    const first = fileFromHtml(document.documentElement.innerHTML);
    const overlay = mount('Resolving direct CDN…', first.name, first.size);
    void mintDl()
      .then(({ url, name, size }) => {
        overlay.setNote(fileNote(name, size));
        overlay.setStatus('Ready — tap Direct Download when you want the file.');
        overlay.setAction(url, ACTION);
      })
      .catch(() => {
        started = false;
        overlay.setAction(null);
        overlay.setError('Could not unlock this file. Reload and try again.');
      });
  });
};
