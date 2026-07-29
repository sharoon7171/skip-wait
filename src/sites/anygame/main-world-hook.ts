type Link = { id: number; type: string };
type Fiber = {
  memoizedProps?: Record<string, unknown>;
  pendingProps?: Record<string, unknown>;
  return?: Fiber | null;
};

export function runAnygameDirectDownload(): void {
  type Flagged = Window & { __swAnygameDirect?: boolean };
  const w = window as Flagged;
  if (w.__swAnygameDirect) return;
  w.__swAnygameDirect = true;

  const BRAND = 'data-skipwait-brand';
  const WIRED = 'data-skipwait-direct';
  const PENDING = 'data-skipwait-pending';
  const CTA = '.version--cta button, .version--cta a';
  const cache = new Map<number, Promise<string | null>>();

  const onDownload = (): boolean => /^\/download\/?$/i.test(location.pathname);

  const fiberOf = (el: Element): Fiber | null => {
    const key = Object.keys(el).find((k) => k.startsWith('__reactFiber$'));
    return key ? ((el as unknown as Record<string, Fiber>)[key] ?? null) : null;
  };

  const asLinks = (value: unknown): Link[] | null => {
    if (!Array.isArray(value) || !value.length) return null;
    const out: Link[] = [];
    for (const item of value) {
      if (!item || typeof item !== 'object') continue;
      const rec = item as Record<string, unknown>;
      const id = Number(rec['id']);
      const type = typeof rec['type'] === 'string' ? rec['type'] : '';
      if (Number.isFinite(id) && id > 0 && type) out.push({ id, type });
    }
    return out.length ? out : null;
  };

  const linksNear = (el: Element): Link[] | null => {
    let node: Element | null = el;
    for (let d = 0; d < 12 && node; d++) {
      for (let fiber = fiberOf(node); fiber; fiber = fiber.return ?? null) {
        const props = fiber.memoizedProps ?? fiber.pendingProps;
        if (!props) continue;
        const download = props['download'];
        if (download && typeof download === 'object') {
          const nested = asLinks((download as Record<string, unknown>)['links']);
          if (nested) return nested;
        }
        const links = asLinks(props['links']);
        if (links) return links;
      }
      node = node.parentElement;
    }
    return null;
  };

  const pickLink = (btn: Element, links: Link[]): Link | null => {
    const text = (btn.textContent ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (/fast\s*download/i.test(text) || btn.classList.contains('fast-download')) {
      return links.find((l) => l.type === 'Worker') ?? null;
    }
    if (/torrent|magnet/i.test(text) || btn.classList.contains('torrent')) {
      return links.find((l) => l.type === 'Torrent') ?? null;
    }
    return links.find((l) => l.type !== 'Worker' && l.type !== 'Instant' && l.type !== 'Torrent') ?? null;
  };

  const resolveLink = (linkId: number): Promise<string | null> => {
    let pending = cache.get(linkId);
    if (!pending) {
      pending = fetch(`/api/action/download/?link=${linkId}`, {
        credentials: 'include',
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      })
        .then(async (res) => {
          if (!res.ok) return null;
          const data = (await res.json()) as { success?: boolean; url?: string | null };
          return data.success && typeof data.url === 'string' && data.url ? data.url : null;
        })
        .catch(() => null)
        .then((url) => {
          if (!url) cache.delete(linkId);
          return url;
        });
      cache.set(linkId, pending);
    }
    return pending;
  };

  const mountBrand = (row: HTMLElement): void => {
    const main = row.querySelector('.version--main');
    if (!(main instanceof HTMLElement) || main.querySelector(`[${BRAND}]`)) return;
    const dark = row.classList.contains('latest');
    const el = document.createElement('div');
    el.setAttribute(BRAND, '1');
    el.setAttribute('role', 'status');
    el.style.cssText =
      'display:flex;align-items:flex-start;gap:10px;margin:0 0 14px;padding:10px 12px;border-radius:4px;' +
      `background:${dark ? '#05856e' : '#e6fffa'};color:${dark ? '#fff' : '#234e52'};` +
      'font:600 13px/1.4 "Titillium Web",system-ui,sans-serif;max-width:100%;min-width:0;' +
      'box-sizing:border-box;position:relative;z-index:2';
    el.innerHTML =
      `<span style="flex:0 0 auto;width:20px;height:20px;border-radius:50%;background:${dark ? '#fff' : '#05856e'};` +
      `color:${dark ? '#05856e' : '#fff'};display:inline-flex;align-items:center;justify-content:center;` +
      'font-size:12px;line-height:1;margin-top:1px">✓</span>' +
      '<span style="min-width:0;flex:1 1 auto">' +
      '<span style="display:block;font-size:14px;line-height:1.3">Skip Wait — timers bypassed</span>' +
      `<span style="display:block;margin-top:2px;font-weight:500;opacity:${dark ? '.9' : '.75'};font-size:12px;line-height:1.4">` +
      'This download opens the file directly. No wait page.</span></span>';
    main.prepend(el);
  };

  const replaceCta = (btn: HTMLElement, url: string): void => {
    btn.removeAttribute(PENDING);
    if (btn instanceof HTMLAnchorElement) {
      btn.href = url;
      btn.setAttribute(WIRED, '1');
      return;
    }
    const a = document.createElement('a');
    a.href = url;
    a.className = btn.className;
    a.style.cssText = btn.getAttribute('style') ?? '';
    a.setAttribute(WIRED, '1');
    a.rel = 'noopener';
    while (btn.firstChild) a.append(btn.firstChild);
    btn.replaceWith(a);
  };

  const wireCta = (btn: HTMLElement): void => {
    if (btn.hasAttribute(WIRED) || btn.hasAttribute(PENDING)) return;
    const links = linksNear(btn);
    const link = links && pickLink(btn, links);
    if (!link) return;
    btn.setAttribute(PENDING, '1');
    void resolveLink(link.id).then((url) => {
      if (!url || !btn.isConnected) {
        btn.removeAttribute(PENDING);
        return;
      }
      replaceCta(btn, url);
    });
  };

  const apply = (): void => {
    if (onDownload()) return;
    for (const row of document.querySelectorAll<HTMLElement>('.version')) {
      mountBrand(row);
      const cta = row.querySelector<HTMLElement>(CTA);
      if (cta) wireCta(cta);
    }
  };

  document.addEventListener(
    'click',
    (e) => {
      if (onDownload()) return;
      const hit = (e.target as Element | null)?.closest(CTA);
      if (!(hit instanceof HTMLElement)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      if (hit instanceof HTMLAnchorElement && hit.hasAttribute(WIRED) && /^https?:/i.test(hit.href)) {
        location.assign(hit.href);
        return;
      }
      const links = linksNear(hit);
      const link = links && pickLink(hit, links);
      if (!link) return;
      void resolveLink(link.id).then((url) => {
        if (url) location.assign(url);
      });
    },
    true,
  );

  const start = (): void => {
    apply();
    new MutationObserver(apply).observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}
