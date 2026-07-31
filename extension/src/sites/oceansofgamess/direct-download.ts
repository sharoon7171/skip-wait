import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { OCEANSOFGAMESS_HOSTS } from './hosts';
import { requestOceansofgamessCdn } from './resolve';

const BRAND = 'skipwait-oceansofgamess-brand';
const IDLE = 'Skip Wait — waits bypassed, direct download';
const BASE =
  'display:block;width:100%;margin:12px auto 0;padding:8px 12px;box-sizing:border-box;text-align:center;border:0;border-radius:5px;font:700 13px/1.35 Verdana,Arial,Helvetica,sans-serif';

const TONE = {
  ok: 'color:#fff;background:#4caf50',
  busy: 'color:#fff;background:#2196f3',
  err: 'color:#fff;background:#e53935',
} as const;

type Tone = keyof typeof TONE;

function setBrand(form: HTMLFormElement, text: string, tone: Tone = 'ok'): void {
  let el = form.querySelector<HTMLElement>('.' + BRAND);
  if (!el) {
    const img = form.querySelector<HTMLInputElement>('input[type="image"]');
    const w = img?.width || Number(img?.getAttribute('width')) || 271;
    el = Object.assign(document.createElement('p'), { className: BRAND });
    el.setAttribute('role', 'status');
    el.dataset['width'] = String(w);
    (form.querySelector('div[align="center"]') ?? form).append(el);
  }
  el.style.cssText = `${BASE};max-width:${el.dataset['width']}px;${TONE[tone]}`;
  el.textContent = text;
}

function wire(form: HTMLFormElement): void {
  const fd = new FormData(form);
  const id = String(fd.get('id') ?? '').trim();
  const filename = String(fd.get('filename') ?? '').trim();
  if (!id || !filename) return;
  const filesize = String(fd.get('filesize') ?? '').trim();

  form.addEventListener(
    'submit',
    (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      setBrand(form, 'Skip Wait — generating…', 'busy');
      void requestOceansofgamessCdn(id, filename, filesize).then((url) => {
        if (!url) {
          setBrand(form, 'Skip Wait — file not found', 'err');
          return;
        }
        setBrand(form, IDLE, 'ok');
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    },
    true,
  );

  setBrand(form, IDLE, 'ok');
}

export function initOceansofgamessDirectDownload(): void {
  if (!isAllowedHost(OCEANSOFGAMESS_HOSTS)) return;
  whenDomParsed(() => {
    for (const form of document.querySelectorAll('form[action*="getsoft.php"]')) {
      if (!(form instanceof HTMLFormElement)) continue;
      if (!form.querySelector('input[name="filename"]')) continue;
      wire(form);
    }
    const delayed = document.getElementById('delayedText');
    if (delayed) delayed.style.visibility = 'visible';
  });
}
