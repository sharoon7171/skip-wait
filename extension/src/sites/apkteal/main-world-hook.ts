type Link = { id: number; type: string };
type Fiber = {
  memoizedProps?: Record<string, unknown>;
  pendingProps?: Record<string, unknown>;
  return?: Fiber | null;
  child?: Fiber | null;
};

export function runApktealDirectDownload(): void {
  type Flagged = Window & { __swApktealDirect?: boolean };
  const w = window as Flagged;
  if (w.__swApktealDirect) return;
  w.__swApktealDirect = true;

  const ROW = '[class*="download_wrap"]';
  const CTA = `${ROW} button, ${ROW} a`;
  const LABEL = 'Free Download · Skip Wait';
  const wired = new WeakSet<HTMLElement>();
  const pending = new WeakSet<HTMLElement>();
  const urls = new WeakMap<HTMLElement, string>();
  const linkIds = new WeakMap<HTMLElement, number>();
  const cache = new Map<number, Promise<string | null>>();
  let actionId: string | undefined;
  let actionPending: Promise<string | null> | null = null;
  let signaled = false;

  const signalCdn = (): void => {
    if (signaled) return;
    signaled = true;
    window.postMessage({ source: 'skip-wait-apkteal', type: 'cdn' }, location.origin);
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
    let job = cache.get(linkId);
    if (!job) {
      job = getActionId()
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
