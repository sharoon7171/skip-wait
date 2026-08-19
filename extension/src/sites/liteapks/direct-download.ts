import { isRemoteSite } from '../../hosts/check';
import { whenDomParsed } from '../../utils/domain-check';

const LABEL = 'Download · Skip Wait';
const LISTING = /^\/download\/[^/]+\/?$/i;
const MEDIATOR = /^\/download\/[^/]+\/\d+\/?$/i;

const tokenized = (file: string): string => {
  const u = new URL(file);
  u.searchParams.set('token', btoa(btoa(String(Math.floor(Date.now() / 1000) + 10800))));
  return u.href;
};

const fileFromHtml = (html: string): string => {
  const raw = new DOMParser().parseFromString(html, 'text/html').getElementById('download')?.dataset['link'];
  if (!raw) throw new Error('missing data-link');
  return atob(raw);
};

const brand = (a: HTMLAnchorElement): void => {
  const el = a.querySelector('.font-semibold');
  if (el && el.textContent?.trim() !== LABEL) el.textContent = LABEL;
};

const mediatorUrl = (a: HTMLAnchorElement): string | null => {
  if (!URL.canParse(a.href)) return null;
  const u = new URL(a.href);
  return u.hostname === location.hostname && MEDIATOR.test(u.pathname) ? u.href : null;
};

export function initLiteapksDirectDownload(): void {
  void isRemoteSite('liteapks').then((ok) => {
    if (!ok) return;

    if (MEDIATOR.test(location.pathname)) {
      whenDomParsed(() => {
        const raw = document.getElementById('download')?.dataset['link'];
        if (raw) location.replace(tokenized(atob(raw)));
      });
      return;
    }

    if (!LISTING.test(location.pathname)) return;

    const bases = new WeakMap<HTMLAnchorElement, string>();
    const pending = new WeakSet<HTMLAnchorElement>();
    const jobs = new Map<string, Promise<string>>();

    const resolve = (href: string): Promise<string> => {
      const hit = jobs.get(href);
      if (hit) return hit;
      const job = (async () => {
        const r = await fetch(href, { credentials: 'include', cache: 'no-store' });
        if (!r.ok) throw new Error(`mediator ${r.status}`);
        return fileFromHtml(await r.text());
      })().catch((err: unknown) => {
        jobs.delete(href);
        throw err;
      });
      jobs.set(href, job);
      return job;
    };

    const bind = (a: HTMLAnchorElement, base: string): void => {
      bases.set(a, base);
      a.href = tokenized(base);
      a.removeAttribute('target');
      brand(a);
    };

    const wire = (a: HTMLAnchorElement): void => {
      if (bases.has(a) || pending.has(a)) {
        brand(a);
        return;
      }
      const href = mediatorUrl(a);
      if (!href) return;
      pending.add(a);
      brand(a);
      void resolve(href).then((base) => {
        pending.delete(a);
        if (a.isConnected) bind(a, base);
      });
    };

    const apply = (): void => {
      for (const a of document.querySelectorAll<HTMLAnchorElement>('a.dl-item[href]')) wire(a);
    };

    document.addEventListener(
      'click',
      (e) => {
        const a = (e.target as Element | null)?.closest('a.dl-item');
        if (!(a instanceof HTMLAnchorElement)) return;
        const ready = bases.get(a);
        if (ready) {
          e.preventDefault();
          e.stopImmediatePropagation();
          location.assign(tokenized(ready));
          return;
        }
        const href = mediatorUrl(a);
        if (!href) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        void resolve(href).then((base) => {
          bind(a, base);
          location.assign(tokenized(base));
        });
      },
      true,
    );

    whenDomParsed(() => {
      apply();
      new MutationObserver(apply).observe(document.documentElement, { childList: true, subtree: true });
    });
  });
}
