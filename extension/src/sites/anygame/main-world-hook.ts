type Link = { id: number; type: string };
type Fiber = {
  memoizedProps?: Record<string, unknown>;
  pendingProps?: Record<string, unknown>;
  return?: Fiber | null;
  child?: Fiber | null;
};

export function runAnygameDirectDownload(): void {
  type Flagged = Window & { __swAnygameDirect?: boolean };
  const w = window as Flagged;
  if (w.__swAnygameDirect) return;
  w.__swAnygameDirect = true;

  const ROW = '.version';
  const CTA = '.version--cta button, .version--cta a';
  const LABEL = 'Free Download · Skip Wait';
  const wired = new WeakSet<HTMLElement>();
  const pending = new WeakSet<HTMLElement>();
  const urls = new WeakMap<HTMLElement, string>();
  const linkIds = new WeakMap<HTMLElement, number>();
  const cache = new Map<number, Promise<string | null>>();
  let signaled = false;

  const signalCdn = (): void => {
    if (signaled) return;
    signaled = true;
    window.postMessage({ source: 'skip-wait-anygame', type: 'cdn' }, location.origin);
  };

  const onDownload = (): boolean => /^\/download\/?$/i.test(location.pathname);

  const fiberOf = (el: Element): Fiber | null => {
    const key = Object.keys(el).find((k) => k.startsWith('__reactFiber$'));
    return key ? ((el as unknown as Record<string, Fiber>)[key] ?? null) : null;
  };

  const brand = (btn: HTMLElement): void => {
    if (btn.textContent?.trim() === LABEL) return;
    btn.textContent = LABEL;
    btn.style.whiteSpace = 'nowrap';
    for (let fiber = fiberOf(btn); fiber; fiber = fiber.child ?? null) {
      const props = fiber.memoizedProps ?? fiber.pendingProps;
      if (!props || typeof props['children'] !== 'string') continue;
      props['children'] = LABEL;
      if (fiber.pendingProps) fiber.pendingProps['children'] = LABEL;
      if (fiber.memoizedProps) fiber.memoizedProps['children'] = LABEL;
      break;
    }
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
    let job = cache.get(linkId);
    if (!job) {
      job = fetch(`/api/action/download/?link=${linkId}`, {
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
      cache.set(linkId, job);
    }
    return job;
  };

  const wireCta = (btn: HTMLElement): void => {
    if (wired.has(btn)) {
      brand(btn);
      return;
    }
    if (pending.has(btn)) return;
    const links = linksNear(btn);
    const link = links && pickLink(btn, links);
    if (!link) return;
    linkIds.set(btn, link.id);
    pending.add(btn);
    brand(btn);
    void resolveLink(link.id).then((url) => {
      pending.delete(btn);
      if (!btn.isConnected || !url) return;
      urls.set(btn, url);
      wired.add(btn);
      if (btn instanceof HTMLAnchorElement) btn.href = url;
      signalCdn();
    });
  };

  const apply = (): void => {
    if (onDownload()) return;
    for (const row of document.querySelectorAll<HTMLElement>(ROW)) {
      for (const cta of row.querySelectorAll<HTMLElement>(CTA)) wireCta(cta);
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
      const ready =
        urls.get(hit) ||
        (hit instanceof HTMLAnchorElement && /^https?:/i.test(hit.href) ? hit.href : '');
      if (ready && /^https?:/i.test(ready)) {
        signalCdn();
        location.assign(ready);
        return;
      }
      const linkId =
        linkIds.get(hit) ??
        (() => {
          const links = linksNear(hit);
          return links && pickLink(hit, links)?.id;
        })();
      if (!linkId) return;
      void resolveLink(linkId).then((url) => {
        if (!url) return;
        urls.set(hit, url);
        linkIds.set(hit, linkId);
        wired.add(hit);
        if (hit instanceof HTMLAnchorElement) hit.href = url;
        signalCdn();
        location.assign(url);
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
