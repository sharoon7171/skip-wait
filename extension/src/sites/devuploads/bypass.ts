import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { requestCdn } from './resolve';

const MEDIATOR_HOSTS = [
  'gujjukhabar.in',
  'djxmaza.in',
  'smartfeecalculator.com',
  'pdfhindibook.com',
  'rfiql.com',
] as const;
const BTN = 'skipwait-devuploads';
const IDLE = 'Direct Download · Skip Wait — No Timer, No Mediator';
const FAIL = 'Skip Wait — Reload & retry';
const JUNK = 'img[src*="scroll_down"], .aboutFile, #featuredimage, #aboutdis, #about';
const NATIVE_BTN = /generate|download link|get download|free download|go to free|please wait/i;

let started = false;
let watching = false;

const brand = (href: string | null, text: string): void => {
  let a = document.getElementById(BTN) as HTMLAnchorElement | null;
  if (!a) {
    a = Object.assign(document.createElement('a'), {
      id: BTN,
      className: 'btn btn-primary btn-lg',
      rel: 'noopener',
    });
    a.style.cssText =
      'display:block;width:100%;max-width:520px;margin:16px 0 24px;padding:16px 22px;font-weight:800;font-size:18px;line-height:1.3;text-align:center;text-decoration:none;box-shadow:0 4px 14px rgba(24,175,228,.35)';
    const info = document.querySelector('.file-info');
    if (info) info.after(a);
    else return;
  }
  if (href) {
    a.href = href;
    a.style.pointerEvents = '';
  } else {
    a.removeAttribute('href');
    a.style.pointerEvents = 'none';
  }
  a.textContent = text;
};

const clean = (): void => {
  document.querySelectorAll(JUNK).forEach((el) => el.remove());
  document.querySelectorAll('a.btn, button.btn, input.btn, input[type="submit"]').forEach((el) => {
    if (el.id === BTN) return;
    if (NATIVE_BTN.test(`${el.textContent ?? ''} ${(el as HTMLInputElement).value ?? ''}`)) el.remove();
  });
};

const watch = (): void => {
  clean();
  if (watching) return;
  watching = true;
  document.querySelector('#dlform')?.addEventListener(
    'submit',
    (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
    },
    true,
  );
  new MutationObserver(clean).observe(document.documentElement, { childList: true, subtree: true });
};

export const initDevuploadsMediator = (): void => {
  if (window !== window.top || !isAllowedHost(MEDIATOR_HOSTS)) return;
  whenDomParsed(() => {
    const form = document.querySelector<HTMLFormElement>('#dlform');
    if (!form?.querySelector('input[name="op"][value="download2"]')) return;
    if (!/devuploads\.com/i.test(form.getAttribute('action') || form.action)) return;
    const id = form.querySelector<HTMLInputElement>('input[name="id"]')?.value.trim();
    if (!id || started) return;
    started = true;
    watch();
    void requestCdn(id)
      .then((url) => {
        clean();
        brand(url, IDLE);
      })
      .catch(() => {
        started = false;
        brand(null, FAIL);
      });
  });
};
