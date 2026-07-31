import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';

const HOSTS = ['pesktop.com'] as const;
const CDN = /window\.location\.href\s*=\s*["'](https?:\/\/[^"']+)["']/;

function resolve(form: HTMLFormElement): Promise<string> {
  return fetch(form.action, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    body: new FormData(form),
  })
    .then((r) => r.text())
    .then((html) => CDN.exec(html)![1]!);
}

export function initPesktopBypass(): void {
  if (!isAllowedHost(HOSTS)) return;
  whenDomParsed(() => {
    const form = document.querySelector<HTMLFormElement>('form[name="myForm"][action*="/downloads"]');
    if (!form) return;

    const brand = Object.assign(document.createElement('div'), {
      id: 'skipwait-pesktop',
      innerHTML:
        '<strong style="display:block;font-size:14px;margin-bottom:2px">Skip Wait</strong>' +
        '<span style="font-size:12px;opacity:.9">Waiting page skipped — download opens the file directly.</span>',
    });
    brand.setAttribute('role', 'status');
    brand.style.cssText =
      'width:100%;box-sizing:border-box;margin:0 0 10px;padding:10px 12px;border-radius:8px;' +
      'background:linear-gradient(135deg,#0b6bcb,#084a8a);color:#fff;font:13px/1.4 system-ui,sans-serif;text-align:center';
    form.before(brand);

    let ready = resolve(form);
    const path = form.querySelector<HTMLInputElement>('input[name="path"]')!;
    for (const li of document.querySelectorAll<HTMLElement>('.download_links[data-link]')) {
      li.addEventListener('click', () => {
        path.value = li.dataset['link']!;
        ready = resolve(form);
      });
    }

    form.addEventListener(
      'click',
      (e) => {
        if (!(e.target instanceof Element) || !e.target.closest('.download_link')) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        void ready.then((url) => location.replace(url));
      },
      true,
    );
  });
}
