import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { whenDomParsed } from '../../utils/domain-check';
const IDLE = 'Free Download · Skip Wait — Direct CDN, No Mediator';
const BUSY = 'Skip Wait — Resolving CDN…';
const FAIL = 'Skip Wait — Complete check & retry';
const CDN_RE = /href=["']\s*(https?:\/\/[^"'\s]*userdrive\.org[^"'\s]*)/i;
const AD_RE = /alveridium\.xyz|downstack\.space|quickfetchy\.site|distributionmorning\.cfd/i;

function blockAds(): void {
  const open = window.open.bind(window);
  window.open = ((url?: string | URL, target?: string, features?: string) => {
    if (url != null && AD_RE.test(String(url))) return null;
    return open(url, target, features);
  }) as typeof window.open;
}

function pageCdn(): string | null {
  for (const a of document.querySelectorAll<HTMLAnchorElement>('a.btn.btn-download[href]')) {
    const href = a.getAttribute('href')?.trim() ?? '';
    if (/userdrive\.org/i.test(href)) return href;
  }
  return null;
}

function waitToken(form: HTMLFormElement): Promise<void> {
  if (!form.querySelector('.cf-turnstile, [name="cf-turnstile-response"]')) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = (): void => {
      const token = form.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]')?.value.trim();
      if (token && token.length > 20) return resolve();
      if (Date.now() - start > 90_000) return reject(new Error('turnstile'));
      setTimeout(tick, 200);
    };
    tick();
  });
}

async function resolveCdn(form: HTMLFormElement): Promise<string> {
  await waitToken(form);
  const body = new URLSearchParams();
  for (const el of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[name], textarea[name]')) {
    body.append(el.name, el.value);
  }
  const res = await fetch(location.href, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const url = CDN_RE.exec(await res.text())?.[1]?.trim();
  if (!url) throw new Error('cdn');
  return url;
}

export function initUsersdriveAutomation(): void {
  const allowed = canBypass('usersdrive');
  whenDomParsed(() => {
    const ready = pageCdn();
    const form = document.querySelector<HTMLInputElement>('input[name="op"][value="download2"]')?.form;
    const btn =
      document.querySelector<HTMLElement>('a.btn.btn-download[href]') ??
      document.querySelector<HTMLElement>('#downloadbtn');
    if (!btn || (!ready && !form)) return;

    void allowed.then((ok) => {
      if (!ok) return;
      document.querySelector('.countdown')?.remove();
      document.getElementById('skipwait-usersdrive-bypass')?.remove();
      blockAds();

      let cached = ready ?? undefined;
      let pending: Promise<string> | undefined;
      const ensure = (): Promise<string> => {
        if (cached) return Promise.resolve(cached);
        if (!form) return Promise.reject(new Error('form'));
        pending ??= resolveCdn(form)
          .then((url) => {
            cached = url;
            return url;
          })
          .finally(() => {
            pending = undefined;
          });
        return pending;
      };

      const label = (text: string): void => {
        if (btn instanceof HTMLButtonElement) {
          btn.disabled = false;
          btn.classList.remove('disabled');
        }
        btn.textContent = text;
      };

      if (ready && btn instanceof HTMLAnchorElement) {
        btn.href = ready;
        btn.removeAttribute('target');
      }
      label(IDLE);

      document.addEventListener(
        'click',
        (e) => {
          if (!(e.target as Element).closest('#downloadbtn, a.btn.btn-download')) return;
          e.preventDefault();
          e.stopImmediatePropagation();
          label(BUSY);
          void ensure()
            .then((url) => {
              recordBypassSuccess();
              Object.assign(document.createElement('a'), { href: url }).click();
              label(IDLE);
            })
            .catch(() => label(FAIL));
        },
        true,
      );
      form?.addEventListener(
        'submit',
        (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
        },
        true,
      );

      if (!cached && form) {
        label(BUSY);
        void ensure()
          .then(() => label(IDLE))
          .catch(() => label(FAIL));
      }
    });
  });
}
