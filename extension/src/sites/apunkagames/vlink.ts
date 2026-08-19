import { isRemoteSite } from '../../hosts/check';
import { whenDomParsed } from '../../utils/domain-check';

const BRAND = 'skipwait-apunkagames-brand';
const FORM = 'form[action*="download-process.php"]';

function mountBrand(form: Element): void {
  if (document.getElementById(BRAND)) return;
  const banner = Object.assign(document.createElement('div'), {
    id: BRAND,
    innerHTML:
      '<strong style="display:block;font-size:16px;color:#42a8e7;margin-bottom:4px">Skip Wait</strong>' +
      '<span style="display:block;font-size:14px;font-weight:700;color:#333">Download timer bypassed — each part opens the file host directly.</span>',
  });
  banner.setAttribute('role', 'status');
  banner.style.cssText =
    'text-align:center;margin:18px auto 22px;padding:14px 18px;max-width:480px;box-sizing:border-box;' +
    'border-radius:18px;background:#e8f5fc;border:2px solid #42a8e7;' +
    'font:15px/1.45 Arial,Helvetica,sans-serif;color:#1a5f8a';
  form.before(banner);
}

function unlock(): void {
  const forms = [...document.querySelectorAll<HTMLFormElement>(FORM)];
  const first = forms[0];
  if (!first) return;
  for (const form of forms) {
    const file = form.querySelector<HTMLInputElement>('input[name="file"]')?.value.trim();
    if (!file || !/^https?:\/\//i.test(file)) continue;
    form.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        window.open(file, '_blank', 'noopener,noreferrer');
      },
      true,
    );
  }
  mountBrand(first);
}

export function initApunkagamesVlink(): void {
  if (!location.pathname.startsWith('/vlink/')) return;
  void isRemoteSite('apunkagames').then((ok) => {
    if (!ok) return;
    whenDomParsed(unlock);
  });
}
