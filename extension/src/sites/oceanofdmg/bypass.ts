import { isRemoteSite } from '../../hosts/check';
import { whenDomParsed } from '../../utils/domain-check';

const BRAND = 'skipwait-oceanofdmg';
const REFRESH =
  /http-equiv=["']Refresh["'][^>]*content=["']\d+\s*;\s*url=([^"']+)["']/i;

function cdnFromHtml(html: string): string {
  const url = html.match(REFRESH)?.[1];
  if (!url?.startsWith('http')) throw new Error('cdn');
  return url;
}

async function resolveCdn(form: HTMLFormElement): Promise<string> {
  const body = new URLSearchParams();
  for (const [k, v] of new FormData(form)) if (typeof v === 'string' && k) body.set(k, v);

  const res = await fetch(`${location.origin}/download/`, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    body,
  });
  if (!res.ok) throw new Error('post');
  return cdnFromHtml(await res.text());
}

function mountBrand(form: HTMLFormElement): void {
  if (document.getElementById(BRAND)) return;
  const el = Object.assign(document.createElement('div'), {
    id: BRAND,
    innerHTML:
      '<strong style="display:block;font-size:15px;margin-bottom:2px">Skip Wait</strong>' +
      '<span style="font-size:12.5px;opacity:.92">Waiting page skipped — download opens the file directly.</span>',
  });
  el.setAttribute('role', 'status');
  el.style.cssText =
    'text-align:center;margin:14px auto 0;padding:12px 14px;max-width:28rem;box-sizing:border-box;' +
    'border-radius:10px;background:linear-gradient(135deg,#c3251d,#8b1a14);color:#fff;' +
    'font:14px/1.4 "Source Sans Pro",system-ui,sans-serif';
  form.querySelector('div[align="center"]')!.after(el);
}

function wire(form: HTMLFormElement): void {
  mountBrand(form);
  const ready = resolveCdn(form);
  form.addEventListener(
    'submit',
    (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      void ready.then((url) => window.open(url, '_blank', 'noopener,noreferrer'));
    },
    true,
  );
}

export function initOceanofdmgBypass(): void {
  const allowed = isRemoteSite('oceanofdmg');
  whenDomParsed(() => {
    void allowed.then((ok) => {
      if (!ok) return;
      if (/^\/download\/?$/i.test(location.pathname)) {
        location.replace(cdnFromHtml(document.documentElement.innerHTML));
        return;
      }
      document.querySelectorAll<HTMLFormElement>('form[action*="/download/"]').forEach(wire);
    });
  });
}
