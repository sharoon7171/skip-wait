import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { ANKERGAMES_HOSTS } from './hosts';

const BRAND = 'skipwait-ankergames-brand';
const ID_RE = /generateDownloadUrl\((\d+)\)/;
const CDN_RE = /downloadPage\(\s*'([^']+)'/;

function csrf(): string {
  return document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')!.content.trim();
}

function cdnFromHtml(html: string): string {
  return decodeURIComponent(html.match(CDN_RE)![1]!);
}

async function resolveCdn(id: string): Promise<string> {
  const gen = (await (
    await fetch(`/generate-download-url/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrf(),
      },
      body: JSON.stringify({ 'g-recaptcha-response': 'development-mode' }),
    })
  ).json()) as { download_url: string };
  return cdnFromHtml(await (await fetch(gen.download_url)).text());
}

function downloadId(target: EventTarget | null): string | null {
  let el = target instanceof Element ? target : null;
  while (el) {
    const m = el.getAttribute('@click.prevent')?.match(ID_RE);
    if (m) return m[1]!;
    el = el.parentElement;
  }
  return null;
}

function mountBrand(): void {
  if (document.getElementById(BRAND)) return;
  const slot = document.getElementById('downloadOpen-title')?.parentElement;
  if (!slot) return;
  const row = Object.assign(document.createElement('div'), {
    id: BRAND,
    className: 'flex items-center gap-2 mt-1.5',
  });
  row.setAttribute('role', 'status');
  row.innerHTML =
    '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">Skip Wait</span>' +
    '<span class="text-xs text-slate-500 dark:text-slate-400">Wait page bypassed</span>';
  slot.append(row);
}

export function initAnkergamesDirectDownload(): void {
  if (!isAllowedHost(ANKERGAMES_HOSTS)) return;
  whenDomParsed(() => {
    if (/^\/download\//i.test(location.pathname)) {
      location.replace(cdnFromHtml(document.documentElement.innerHTML));
      return;
    }
    if (!/^\/game\//i.test(location.pathname)) return;

    window.addEventListener('open-download-modal', () => queueMicrotask(mountBrand));
    document.addEventListener(
      'click',
      (e) => {
        const id = downloadId(e.target);
        if (!id) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        void resolveCdn(id).then((cdn) => location.assign(cdn));
      },
      true,
    );
  });
}
