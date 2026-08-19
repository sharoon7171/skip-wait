import { isRemoteSite } from '../../hosts/check';
import { whenDomParsed } from '../../utils/domain-check';

const BRAND_ID = 'skipwait-vegamovies-brand';

const REFRESH =
  /http-equiv=["']refresh["'][^>]*content=["']\d+\s*;\s*url=([^"']+)["']/i;

const cache = new Map<string, string>();

function destinationFromHtml(html: string): string | null {
  const url = html.match(REFRESH)?.[1]?.trim();
  return url && /^https?:\/\//i.test(url) ? url : null;
}

function reHref(href: string): string | null {
  try {
    const u = new URL(href, location.href);
    if (!u.searchParams.has('re')) return null;
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return u.href;
  } catch {
    return null;
  }
}

async function resolve(reUrl: string): Promise<string | null> {
  const hit = cache.get(reUrl);
  if (hit) return hit;
  const r = await fetch(reUrl, { cache: 'no-store', credentials: 'same-origin' });
  if (!r.ok) return null;
  const dest = destinationFromHtml(await r.text());
  if (dest) cache.set(reUrl, dest);
  return dest;
}

function go(dest: string, blank: boolean): void {
  if (blank) window.open(dest, '_blank', 'noopener,noreferrer');
  else location.replace(dest);
}

function mountBrand(): void {
  if (document.getElementById(BRAND_ID)) return;
  if (destinationFromHtml(document.documentElement.innerHTML)) return;
  const grid = document.querySelector('nav.link-grid');
  if (!grid) return;

  const el = document.createElement('aside');
  el.id = BRAND_ID;
  el.className = 'reveal in';
  el.setAttribute('role', 'status');
  el.style.cssText =
    'display:flex;align-items:center;gap:14px;width:100%;box-sizing:border-box;margin:0 0 18px;padding:20px 22px;' +
    'border-radius:var(--radius-xl,24px);border:1px solid rgba(0,255,170,.28);' +
    'background:linear-gradient(135deg,rgba(0,255,170,.1),rgba(14,165,233,.06)),var(--surface,#08080f);' +
    'box-shadow:0 0 32px rgba(0,255,170,.14);color:var(--text,#e4e6f0);' +
    'font:500 13px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif';
  el.innerHTML =
    '<span style="flex:0 0 auto;width:44px;height:44px;border-radius:14px;display:inline-flex;align-items:center;justify-content:center;' +
    'background:linear-gradient(135deg,var(--mint,#00ffaa),var(--blue,#0ea5e9));box-shadow:0 0 20px var(--mint-dim,#00cc8840);color:#020205">' +
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></span>' +
    '<span style="flex:1;min-width:0">' +
    '<span style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:5px">' +
    '<strong style="font-size:15px;font-weight:800;letter-spacing:.02em;background:linear-gradient(90deg,var(--mint,#00ffaa),var(--blue,#0ea5e9));' +
    '-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:var(--mint,#00ffaa)">Skip Wait</strong>' +
    '<span style="font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:3px 9px;border-radius:999px;' +
    'border:1px solid rgba(0,255,170,.45);color:var(--mint,#00ffaa);background:rgba(0,255,170,.08)">Instant Unlock</span></span>' +
    '<span style="display:block;color:var(--muted,#55607a);font-weight:500">' +
    'Connecting delay skipped — VegaMovies, RogMovies, Anime &amp; Xprime open the live server immediately.' +
    '</span></span>';
  grid.before(el);
}

function prefetchLinks(): void {
  for (const a of document.querySelectorAll('a[href]')) {
    if (!(a instanceof HTMLAnchorElement)) continue;
    const reUrl = reHref(a.getAttribute('href') || '');
    if (!reUrl) continue;
    void resolve(reUrl).then((dest) => {
      if (dest) a.href = dest;
    });
  }
}

function bindClicks(): void {
  document.addEventListener(
    'click',
    (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]');
      if (!(a instanceof HTMLAnchorElement)) return;
      const reUrl = reHref(a.getAttribute('href') || a.href);
      if (!reUrl) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      const blank = a.target === '_blank';
      void resolve(reUrl)
        .then((dest) => {
          if (dest) go(dest, blank);
          else if (blank) window.open(reUrl, '_blank', 'noopener,noreferrer');
          else location.assign(reUrl);
        })
        .catch(() => {
          if (blank) window.open(reUrl, '_blank', 'noopener,noreferrer');
          else location.assign(reUrl);
        });
    },
    true,
  );
}

export function initVegamoviesLandingRedirect(): void {
  const allowed = isRemoteSite('vegamovies-landing');
  whenDomParsed(() => {
    const waitDest = destinationFromHtml(document.documentElement.innerHTML);
    if (!waitDest && !document.querySelector('nav.link-grid')) return;
    void allowed.then((ok) => {
      if (!ok) return;
      if (waitDest) {
        location.replace(waitDest);
        return;
      }
      bindClicks();
      mountBrand();
      prefetchLinks();
    });
  });
}
