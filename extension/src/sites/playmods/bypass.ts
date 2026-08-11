import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';

const HOSTS = ['playmods.net'] as const;
const LABEL = 'Skip Wait';
const LABEL_APK = 'Download · Skip Wait';
const WAIT = '…';
const DONE = 'data-skipwait-playmods';
const PENDING = 'data-skipwait-playmods-wait';
const STYLE = 'skipwait-playmods';
const ALL = /\/all-download\/?$/i;
const MEDIATOR = /\/download\/?$/i;

const jobs = new Map<string, Promise<string>>();
const ready = new WeakMap<HTMLAnchorElement, string>();

function isMediator(path: string): boolean {
  return MEDIATOR.test(path) && !ALL.test(path);
}

function hop(versionId: string): string {
  return `${location.origin}/download/version/${versionId}?scheme=${location.protocol.slice(0, -1)}`;
}

function versionIdFrom(root: ParentNode): string {
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
  if (!a.classList.contains('btn-download1')) return;
  const size = a.querySelector('span');
  a.replaceChildren(text, ...(size ? [' ', size] : []));
}

function resolve(href: string): Promise<string> {
  const hit = jobs.get(href);
  if (hit) return hit;
  const job = fetch(href, { credentials: 'include', cache: 'no-store' }).then(async (res) => {
    if (!res.ok) throw new Error(`mediator ${res.status}`);
    return hop(versionIdFrom(new DOMParser().parseFromString(await res.text(), 'text/html')));
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
  brand(a, a.classList.contains('btn-download1') ? LABEL_APK : LABEL);
}

function wireMediator(a: HTMLAnchorElement): void {
  if (ready.has(a) || a.hasAttribute(PENDING) || !URL.canParse(a.href)) return;
  const u = new URL(a.href);
  if (u.hostname !== location.hostname || !isMediator(u.pathname)) return;
  const href = u.href;
  a.setAttribute(PENDING, '1');
  a.removeAttribute('href');
  brand(a, WAIT);
  void resolve(href).then((url) => {
    if (a.isConnected) bind(a, url);
  });
}

function boot(): void {
  if (document.getElementById(STYLE)) return;
  const s = document.createElement('style');
  s.id = STYLE;
  s.textContent =
    `a[${PENDING}],a[${PENDING}] .detail-downloadBtn{pointer-events:none!important;opacity:.55;cursor:wait!important}` +
    `a[${DONE}] .detail-downloadBtn,a[${PENDING}] .detail-downloadBtn{width:auto!important;min-width:99px;padding:0 14px!important;flex:0 0 auto!important;box-sizing:border-box!important}` +
    `a[${DONE}] .detail-downloadBtn>div,a[${PENDING}] .detail-downloadBtn>div{white-space:nowrap!important;overflow:visible!important}` +
    `.detail-version-card-content .detail-version-desp{width:auto!important;flex:1 1 auto!important;min-width:0!important}`;
  document.documentElement.append(s);
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as Element | null)?.closest('a');
      if (!(a instanceof HTMLAnchorElement)) return;
      const url = ready.get(a);
      if (!url) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      location.assign(url);
    },
    true,
  );
}

export function initPlaymodsBypass(): void {
  if (!isAllowedHost(HOSTS)) return;

  if (isMediator(location.pathname)) {
    whenDomParsed(() => location.replace(hop(versionIdFrom(document))));
    return;
  }

  boot();
  whenDomParsed(() => {
    if (ALL.test(location.pathname)) {
      for (const a of document.querySelectorAll<HTMLAnchorElement>('a[href]')) {
        if (a.querySelector('.detail-downloadBtn')) wireMediator(a);
      }
      return;
    }
    for (const a of document.querySelectorAll<HTMLAnchorElement>('a.btn-download1.ptn[href]')) {
      if (!URL.canParse(a.href)) continue;
      const u = new URL(a.href);
      if (u.hostname !== location.hostname) continue;
      if (isMediator(u.pathname)) wireMediator(a);
      else if (ALL.test(u.pathname)) {
        a.setAttribute(DONE, '1');
        brand(a, LABEL_APK);
      }
    }
  });
}
