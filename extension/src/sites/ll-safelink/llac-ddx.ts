import { createFullPageOverlay } from '../../injected-ui/full-page-overlay';
import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { LLAC_HOSTS, xxc } from './hosts';

function ddxQuery(): string | null {
  for (const s of document.scripts) {
    const m = /atob\('([^']+)'\)/.exec(s.textContent ?? '');
    if (!m?.[1]) continue;
    try {
      const qs = atob(m[1]);
      if (qs.startsWith('?ddx=')) return qs;
    } catch {}
  }
  return null;
}

async function resolveDdx(url: string): Promise<string> {
  for (;;) {
    const dest = xxc(await fetch(url, { credentials: 'include' }).then((r) => r.text()));
    if (dest) return dest;
    await new Promise((r) => setTimeout(r, 300));
  }
}

export function initLlacDdx(): void {
  if (window !== window.top) return;
  if (!isAllowedHost(LLAC_HOSTS)) return;

  whenDomParsed(() => {
    const qs = ddxQuery();
    if (!qs) return;
    const ui = createFullPageOverlay({
      id: 'skip-wait-llac-ddx-overlay',
      brand: 'Skip Wait',
      note: { lead: 'Unlocking your link.', detail: "You don't need to tap anything on the page." },
      status: 'Decoding destination…',
    });
    void resolveDdx(`${location.pathname}${qs}`)
      .then((dest) => {
        ui.setStatus('Redirecting now…');
        location.replace(dest);
      })
      .catch(() => ui.remove());
  });
}
