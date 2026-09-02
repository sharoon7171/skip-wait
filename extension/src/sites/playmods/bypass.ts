import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { whenDomParsed } from '../../utils/domain-check';

const LABEL = 'Skip Wait';
const LABEL_APK = 'Download · Skip Wait';
const WAIT = '…';
const DONE = 'data-skipwait-playmods';
const PENDING = 'data-skipwait-playmods-wait';
const STYLE = 'skipwait-playmods';

const jobs = new Map<string, Promise<string>>();
const ready = new WeakMap<HTMLAnchorElement, string>();

function hop(versionId: string): string {
  return `${location.origin}/download/version/${versionId}?scheme=${location.protocol.slice(0, -1)}`;
}

function versionIdInPath(pathname: string): string | null {
  return pathname.match(/\/(\d+)-download\/?$/i)?.[1] ?? null;
}

function isAllDownload(pathname: string): boolean {
  return /\/all-download\/?$/i.test(pathname);
}

function isAllVersions(pathname: string): boolean {
  return /\/all-versions\/?$/i.test(pathname);
}

function isMediator(pathname: string): boolean {
  return /\/download\/?$/i.test(pathname) && !isAllDownload(pathname) && !versionIdInPath(pathname);
}

function versionIdFromDoc(root: ParentNode): string {
  const id = root.querySelector('#downloadStatejs_id')?.getAttribute('versionId')?.trim();
  if (!id) throw new Error('versionId');
  return id;
}

function brand(a: HTMLAnchorElement, text: string): void {
  const row = a.querySelector('.detail-downloadBtn > div');
  if (row) {
    row.textContent = text;
    return;
  }
  const hist = a.querySelector('.historyV-exhibition-detail-dn');
  if (hist) {
    hist.textContent = text;
    return;
  }
  if (!a.classList.contains('btn-download1')) return;
  const size = a.querySelector('span');
  a.replaceChildren(text, ...(size ? [' ', size] : []));
}

function labelFor(a: HTMLAnchorElement): string {
  return a.classList.contains('btn-download1') ? LABEL_APK : LABEL;
}

function resolveMediator(href: string): Promise<string> {
  const hit = jobs.get(href);
  if (hit) return hit;
  const job = fetch(href, { credentials: 'include', cache: 'no-store' }).then(async (res) => {
    if (!res.ok) throw new Error(`mediator ${res.status}`);
    return hop(versionIdFromDoc(new DOMParser().parseFromString(await res.text(), 'text/html')));
  });
  jobs.set(href, job);
  return job;
}

function bind(a: HTMLAnchorElement, url: string): void {
  ready.set(a, url);
  a.href = url;
  a.removeAttribute('target');
  a.removeAttribute(PENDING);
  a.setAttribute(DONE, '1');
  brand(a, labelFor(a));
}

function wire(a: HTMLAnchorElement): void {
  if (ready.has(a) || a.hasAttribute(PENDING) || a.hasAttribute(DONE) || !URL.canParse(a.href)) return;
  const u = new URL(a.href);
  if (u.hostname !== location.hostname) return;

  const vid = versionIdInPath(u.pathname);
  if (vid) {
    a.setAttribute(PENDING, '1');
    brand(a, WAIT);
    bind(a, hop(vid));
    return;
  }

  if (isAllDownload(u.pathname) || isAllVersions(u.pathname)) {
    if (a.classList.contains('btn-download1')) {
      a.setAttribute(DONE, '1');
      brand(a, LABEL_APK);
    }
    return;
  }

  if (!isMediator(u.pathname)) return;
  if (!a.classList.contains('btn-download1') && !a.querySelector('.detail-downloadBtn')) return;

  const href = u.href;
  a.setAttribute(PENDING, '1');
  a.removeAttribute('href');
  brand(a, WAIT);
  void resolveMediator(href).then((url) => {
    if (a.isConnected) bind(a, url);
  });
}

function apply(): void {
  for (const a of document.querySelectorAll<HTMLAnchorElement>('a[href]')) wire(a);
}

function boot(): void {
  if (document.getElementById(STYLE)) return;
  const s = document.createElement('style');
  s.id = STYLE;
  s.textContent =
    `a[${PENDING}],a[${PENDING}] .detail-downloadBtn{pointer-events:none!important;opacity:.55;cursor:wait!important}` +
    `a[${DONE}] .detail-downloadBtn,a[${PENDING}] .detail-downloadBtn{width:auto!important;min-width:99px;padding:0 14px!important;flex:0 0 auto!important;box-sizing:border-box!important}` +
    `a[${DONE}] .detail-downloadBtn>div,a[${PENDING}] .detail-downloadBtn>div{white-space:nowrap!important;overflow:visible!important}` +
    `.detail-version-card-content .detail-version-desp{width:auto!important;flex:1 1 auto!important;min-width:0!important}` +
    `a[${DONE}] .historyV-exhibition-detail-dn,a[${DONE}]:hover .historyV-exhibition-detail-dn,a[${PENDING}] .historyV-exhibition-detail-dn{color:#fff!important}`;
  document.documentElement.append(s);
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as Element | null)?.closest('a');
      if (!(a instanceof HTMLAnchorElement) || !URL.canParse(a.href)) return;
      const cached = ready.get(a);
      if (cached) {
        e.preventDefault();
        e.stopImmediatePropagation();
        recordBypassSuccess();
        location.assign(cached);
        return;
      }
      const u = new URL(a.href);
      if (u.hostname !== location.hostname) return;
      const vid = versionIdInPath(u.pathname);
      if (!vid) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      bind(a, hop(vid));
      location.assign(hop(vid));
    },
    true,
  );
}

export function initPlaymodsBypass(): void {
  void canBypass('playmods').then((ok) => {
    if (!ok) return;
    const pathVid = versionIdInPath(location.pathname);
    if (pathVid) {
      recordBypassSuccess();
      location.replace(hop(pathVid));
      return;
    }
    if (isMediator(location.pathname)) {
      whenDomParsed(() => {
        const url = hop(versionIdFromDoc(document));
        recordBypassSuccess();
        location.replace(url);
      });
      return;
    }
    boot();
    whenDomParsed(() => {
      apply();
      new MutationObserver(apply).observe(document.documentElement, { childList: true, subtree: true });
    });
  });
}
