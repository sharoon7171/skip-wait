type Link = { id: number; type: string };
type Fiber = {
  memoizedProps?: Record<string, unknown>;
  pendingProps?: Record<string, unknown>;
  return?: Fiber | null;
};

export function runApktealDirectDownload(): void {
  type Flagged = Window & { __swApktealDirect?: boolean };
  const w = window as Flagged;
  if (w.__swApktealDirect) return;
  w.__swApktealDirect = true;

  const BRAND = 'data-skipwait-brand';
  const WIRED = 'data-skipwait-direct';
  const PENDING = 'data-skipwait-pending';
  const ROW = '[class*="download_wrap"]';
  const CTA = `${ROW} button, ${ROW} a`;
  const cache = new Map<number, Promise<string | null>>();
  let actionId: string | undefined;
  let actionPending: Promise<string | null> | null = null;

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

  const actionIdFromChunk = (text: string): string | null => {
    const cd = text.match(/cd:function\(\)\{return (\w+)\}/);
    if (!cd) return null;
    const from = text.indexOf(cd[0]);
    const bound = text
      .slice(from, from + 500)
      .match(new RegExp(`${cd[1]}=\\(0,\\w+\\.\\$\\)\\("([a-f0-9]{40})"\\)`));
    return bound?.[1] ?? null;
  };

  const loadActionId = async (): Promise<string | null> => {
    const html = await fetch(`${location.origin}/download/`, {
      credentials: 'include',
      cache: 'force-cache',
    }).then((r) => (r.ok ? r.text() : ''));
    if (!html) return null;
    for (const m of html.matchAll(/src="(\/_next\/static\/chunks\/[^"]+)"/g)) {
      const text = await fetch(`${location.origin}${m[1]}`, {
        credentials: 'omit',
        cache: 'force-cache',
      })
        .then((r) => (r.ok ? r.text() : ''))
        .catch(() => '');
      const id = actionIdFromChunk(text);
      if (id) return id;
    }
    return null;
  };

  const getActionId = (): Promise<string | null> => {
    if (actionId) return Promise.resolve(actionId);
    if (!actionPending) {
      actionPending = loadActionId()
        .catch(() => null)
        .then((id) => {
          actionPending = null;
          if (id) actionId = id;
          return id;
        });
    }
    return actionPending;
  };

  const resolveLink = (linkId: number): Promise<string | null> => {
    let pending = cache.get(linkId);
    if (!pending) {
      pending = getActionId()
        .then(async (id) => {
          if (!id) return null;
          const res = await fetch(`${location.origin}/download/`, {
            method: 'POST',
            credentials: 'include',
            cache: 'no-store',
            headers: {
              'Next-Action': id,
              'Content-Type': 'text/plain;charset=UTF-8',
              Accept: 'text/x-component',
            },
            body: JSON.stringify([String(linkId)]),
          });
          if (!res.ok) return null;
          return (await res.text()).match(/"url"\s*:\s*"(https:[^"\\]+)"/)?.[1] ?? null;
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
    if (row.querySelector(`[${BRAND}]`)) return;
    const el = document.createElement('div');
    el.setAttribute(BRAND, '1');
    el.setAttribute('role', 'status');
    el.style.cssText =
      'display:flex;align-items:flex-start;gap:10px;margin:0;padding:10px 12px;border-radius:12px;' +
      'background:#ecfdf5;color:#065f46;font:600 13px/1.4 Roboto,ui-sans-serif,system-ui,sans-serif;' +
      'flex:1 1 100%;width:100%;max-width:100%;min-width:0;box-sizing:border-box;order:-1';
    el.innerHTML =
      '<span style="flex:0 0 auto;width:20px;height:20px;border-radius:50%;background:#00a173;color:#fff;' +
      'display:inline-flex;align-items:center;justify-content:center;font-size:12px;line-height:1;margin-top:1px">✓</span>' +
      '<span style="min-width:0;flex:1 1 auto">' +
      '<span style="display:block;font-size:14px;line-height:1.3;color:#065f46">Skip Wait — timers bypassed</span>' +
      '<span style="display:block;margin-top:2px;font-weight:500;opacity:.78;font-size:12px;line-height:1.4;color:#047857">' +
      'This download opens the file directly. No wait page.</span></span>';
    row.prepend(el);
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
    for (const row of document.querySelectorAll<HTMLElement>(ROW)) {
      mountBrand(row);
      const cta = row.querySelector<HTMLElement>('button, a[class*="bg-brand"]');
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
