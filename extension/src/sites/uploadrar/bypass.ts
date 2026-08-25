import { canBypass } from '../../gate';
import { whenDomParsed } from '../../utils/domain-check';

const CDN_RE = /href="(https:\/\/fs\d+\.uploadrar\.com(?::\d+)?\/d\/[^"]+)"/i;
const IDLE = 'Free Download · Skip Wait — No Timer, No Mediator Pages';

async function cdn(id: string): Promise<string> {
  const res = await fetch(location.href, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      op: 'download2',
      id,
      rand: '',
      referer: '',
      method_free: 'Free Download',
      method_premium: '',
      adblock_detected: '0',
    }),
  });
  const url = CDN_RE.exec(await res.text())?.[1];
  if (!url) throw new Error('cdn');
  return url;
}

export function initUploadrarBypass(): void {
  const allowed = canBypass('uploadrar');
  whenDomParsed(() => {
    const btn = document.querySelector<HTMLButtonElement>('button[name="method_free"]');
    const form = btn?.form;
    const id = form?.querySelector<HTMLInputElement>('input[name="id"]')?.value.trim();
    if (!btn || !form || !id || !form.querySelector('input[name="op"][value="download1"]')) return;
    void allowed.then((ok) => {
      if (!ok) return;
      btn.classList.replace('btn-outline-primary', 'btn-success');
      btn.textContent = IDLE;
      let busy = false;
      btn.addEventListener(
        'click',
        (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
          if (busy) return;
          busy = true;
          btn.disabled = true;
          btn.textContent = 'Starting…';
          void cdn(id)
            .then((url) => {
              Object.assign(document.createElement('a'), { href: url }).click();
              btn.textContent = IDLE;
            })
            .catch(() => {
              btn.classList.replace('btn-success', 'btn-danger');
              btn.textContent = 'Failed';
            })
            .finally(() => {
              btn.disabled = false;
              busy = false;
            });
        },
        true,
      );
    });
  });
}
