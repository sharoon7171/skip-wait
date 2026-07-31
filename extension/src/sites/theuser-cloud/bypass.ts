import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';

const HOSTS = ['theuser.cloud'] as const;
const BRAND = 'skipwait-theuser-cloud';
const BTN = '#downloadbtn';
const DIRECT = /href=["'](https?:\/\/[^"']+\/d\/[^"']+)["']/i;

function captchaCode(form: HTMLFormElement): string {
  const table = form.querySelector('input[name="code"]')?.closest('table');
  if (!table) throw new Error('captcha');
  return [...table.querySelectorAll('span')]
    .map((el) => {
      const s = el as HTMLElement;
      return { pl: parseInt(s.style.paddingLeft, 10), ch: (s.textContent ?? '').trim() };
    })
    .filter((d) => d.ch.length === 1 && Number.isFinite(d.pl))
    .sort((a, b) => a.pl - b.pl)
    .map((d) => d.ch)
    .join('');
}

async function resolveDirect(form: HTMLFormElement): Promise<string> {
  const code = captchaCode(form);
  if (!code) throw new Error('captcha');

  const body = new URLSearchParams();
  for (const [key, value] of new FormData(form)) {
    if (typeof value === 'string') body.append(key, value);
  }
  body.set('code', code);

  const res = await fetch(location.href, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) throw new Error('post');
  const html = await res.text();
  if (/You have to wait\s+\d+\s+seconds/i.test(html)) throw new Error('wait');
  const url = html.match(DIRECT)?.[1];
  if (!url) throw new Error('link');
  return url;
}

function mountBrand(before: Element): void {
  if (document.getElementById(BRAND)) return;
  const el = Object.assign(document.createElement('div'), {
    id: BRAND,
    innerHTML:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex:0 0 auto"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>' +
      '<div><div style="font-weight:700;font-size:15px;letter-spacing:-.01em">Skip Wait</div>' +
      '<div style="font-size:12.5px;opacity:.92;margin-top:2px;line-height:1.4">' +
      'Captcha is handled for you — click Create download link to start your file.</div></div>',
  });
  el.setAttribute('role', 'status');
  el.style.cssText =
    'display:flex;align-items:center;gap:12px;margin:0 auto 16px;padding:14px 16px;border-radius:12px;max-width:28rem;' +
    'background:linear-gradient(135deg,#153fb9,#0f2e79);color:#fff;box-shadow:0 6px 18px rgba(15,46,121,.28);' +
    'font-family:Manrope,system-ui,-apple-system,sans-serif';
  before.before(el);
}

function wire(form: HTMLFormElement, btn: Element): void {
  const input = form.querySelector<HTMLInputElement>('input[name="code"]');
  if (!input) return;
  input.disabled = true;
  input.style.pointerEvents = 'none';

  const wrap = btn.closest('.col-lg-4');
  if (!wrap) return;
  mountBrand(wrap);

  let cached: string | undefined;
  let busy = false;

  const start = (): void => {
    if (cached) {
      location.assign(cached);
      return;
    }
    if (busy) return;
    busy = true;
    void resolveDirect(form)
      .then((url) => {
        cached = url;
        busy = false;
        location.assign(url);
      })
      .catch(() => {
        busy = false;
      });
  };

  document.addEventListener(
    'click',
    (e) => {
      if (!(e.target as Element).closest(BTN)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      start();
    },
    true,
  );
  form.addEventListener(
    'submit',
    (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      start();
    },
    true,
  );
}

export function initTheuserCloudBypass(): void {
  if (!isAllowedHost(HOSTS)) return;
  whenDomParsed(() => {
    const ready = document.querySelector<HTMLAnchorElement>('#direct_link a[href*="/d/"]')?.href;
    if (ready) {
      location.assign(ready);
      return;
    }
    const form = document.querySelector<HTMLInputElement>('input[name="op"][value="download2"]')?.form;
    const btn = document.querySelector(BTN);
    if (form && btn) wire(form, btn);
  });
}
