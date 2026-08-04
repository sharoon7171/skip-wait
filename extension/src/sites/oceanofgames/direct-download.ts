import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { OCEANOFGAMES_HOSTS } from './hosts';
import { requestOceanofgamesCdn } from './resolve';

const IDLE = 'Free Download · Skip Wait — No Timer, No Please-Wait Pages';
const BUSY = 'Generating…';
const FAIL = 'Failed';
const BG = { ok: '#4caf50', busy: '#2196f3', err: '#e53935' } as const;
const BTN_STYLE =
  'display:block;width:100%;max-width:271px;margin:0 auto;padding:14px 12px;border:0;border-radius:5px;font:700 13px/1.35 Verdana,Arial,Helvetica,sans-serif;color:#fff;cursor:pointer';

function paint(btn: HTMLButtonElement, text: string, tone: keyof typeof BG = 'ok'): void {
  btn.disabled = tone === 'busy';
  btn.textContent = text;
  btn.style.background = BG[tone];
}

function brandButton(form: HTMLFormElement): HTMLButtonElement | null {
  const img = form.querySelector<HTMLInputElement>('input[type="image"]');
  if (img) {
    const w = img.width || Number(img.getAttribute('width')) || 271;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.cssText = `${BTN_STYLE};max-width:${w}px`;
    img.replaceWith(btn);
    return btn;
  }
  const existing = form.querySelector<HTMLButtonElement>('button');
  if (!existing) return null;
  existing.type = 'button';
  existing.removeAttribute('title');
  existing.className = '';
  existing.style.cssText = BTN_STYLE;
  return existing;
}

function wire(form: HTMLFormElement): void {
  const fd = new FormData(form);
  const id = String(fd.get('id') ?? '').trim();
  const filename = String(fd.get('filename') ?? '').trim();
  if (!id || !filename) return;
  const filesize = String(fd.get('filesize') ?? '').trim();
  const btn = brandButton(form);
  if (!btn) return;

  paint(btn, IDLE);
  let busy = false;
  btn.addEventListener('click', () => {
    if (busy) return;
    busy = true;
    paint(btn, BUSY, 'busy');
    void requestOceanofgamesCdn(id, filename, filesize)
      .then((url) => {
        if (!url) throw new Error('cdn');
        paint(btn, IDLE);
        window.open(url, '_blank', 'noopener,noreferrer');
      })
      .catch(() => paint(btn, FAIL, 'err'))
      .finally(() => {
        busy = false;
      });
  });
}

export function initOceanofgamesDirectDownload(): void {
  if (!isAllowedHost(OCEANOFGAMES_HOSTS)) return;
  whenDomParsed(() => {
    for (const form of document.querySelectorAll(
      'form[action*="getsoft.php"], form[action*="Please-Wait.php"], form[action*="wait-for-resource"]',
    )) {
      if (!(form instanceof HTMLFormElement)) continue;
      if (!form.querySelector('input[name="filename"]')) continue;
      wire(form);
    }
    const delayed = document.getElementById('delayedText');
    if (delayed) delayed.style.visibility = 'visible';
  });
}
