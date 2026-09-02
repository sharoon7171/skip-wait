import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { hostnameMatches, whenDomParsed } from '../../utils/domain-check';
import { requestGapkmodFinal } from './resolve';

const GAPKMOD_HOSTS = ['gapkmod.net'] as const;

const WAIT = 'Unlocking · Skip Wait';
const STYLE = 'skipwait-gapkmod';
const DONE = 'data-skipwait-gapkmod';
const PENDING = 'data-skipwait-gapkmod-wait';
const TOKEN = 'data-sw-token';
const NAME = 'data-sw-name';

type Entry = { url: string; name: string };

const cache = new Map<string, Promise<string>>();
let pageEntries: Entry[] | null = null;
let counted = false;

function count(): void {
  if (counted) return;
  counted = true;
  recordBypassSuccess();
}

function own(href: string): URL | null {
  if (!URL.canParse(href, location.href)) return null;
  const u = new URL(href, location.href);
  return hostnameMatches(u.hostname, GAPKMOD_HOSTS) ? u : null;
}

function isLinks(href: string): boolean {
  return own(href)?.searchParams.get('download') === 'links';
}

function isToken(href: string): boolean {
  return Boolean(own(href)?.searchParams.get('download_link'));
}

function hopUrl(): string {
  const u = new URL(location.href);
  u.hash = '';
  u.search = 'download=links';
  return u.href;
}

function linkName(a: HTMLAnchorElement): string {
  return a.textContent.replace(/\s+/g, ' ').trim();
}

function boot(): void {
  if (document.getElementById(STYLE)) return;
  const s = document.createElement('style');
  s.id = STYLE;
  s.textContent =
    '.spinvt,.sdl-bar{display:none!important}.show_download_links{display:block!important}' +
    `a.downloadAPK[${PENDING}]{pointer-events:none!important;opacity:.55;cursor:wait!important}`;
  document.documentElement.append(s);
}

function reveal(): void {
  document.querySelectorAll('.spinvt, .sdl-bar').forEach((el) => el.remove());
  document.querySelectorAll<HTMLElement>('.show_download_links').forEach((el) => {
    el.style.display = '';
    el.removeAttribute('hidden');
  });
}

function mark(a: HTMLAnchorElement, text: string): void {
  const icon = a.querySelector('i');
  a.replaceChildren(...(icon ? [icon, document.createTextNode(` ${text}`)] : [text]));
}

function freeze(a: HTMLAnchorElement): void {
  if (a.hasAttribute(DONE) || a.hasAttribute(PENDING) || !a.classList.contains('downloadAPK')) return;
  if (isToken(a.href)) a.setAttribute(TOKEN, a.href);
  else if (!isLinks(a.href)) return;
  a.setAttribute(NAME, linkName(a));
  a.setAttribute(PENDING, '1');
  a.removeAttribute('href');
  a.removeAttribute('target');
  a.setAttribute('aria-disabled', 'true');
  a.tabIndex = -1;
  mark(a, WAIT);
}

function launch(from: HTMLAnchorElement, url: string, name = from.getAttribute(NAME) ?? linkName(from)): void {
  const next = document.createElement('a');
  next.className = from.className;
  next.href = url;
  next.target = '_blank';
  next.rel = 'noopener noreferrer nofollow';
  next.setAttribute(DONE, '1');
  const icon = from.querySelector('i') ?? Object.assign(document.createElement('i'), { className: 'fa fa-download' });
  next.replaceChildren(icon.cloneNode(true), document.createTextNode(` ${name}`));
  from.replaceWith(next);
  count();
}

function entriesFrom(html: string, base: string): { token: string; name: string }[] {
  const out: { token: string; name: string }[] = [];
  for (const a of new DOMParser().parseFromString(html, 'text/html').querySelectorAll('a[href]')) {
    if (!(a instanceof HTMLAnchorElement)) continue;
    const href = a.getAttribute('href');
    if (!href || !isToken(href)) continue;
    out.push({ token: new URL(href, base).href, name: linkName(a) });
  }
  return out;
}

function resolveToken(href: string): Promise<string> {
  const hit = cache.get(href);
  if (hit) return hit;
  const job = requestGapkmodFinal(href);
  cache.set(href, job);
  return job;
}

async function pageFinals(): Promise<Entry[]> {
  if (pageEntries) return pageEntries;
  const hop = hopUrl();
  const res = await fetch(hop, { credentials: 'include', cache: 'no-store' });
  if (!res.ok) throw new Error(`links hop ${res.status}`);
  const rows = entriesFrom(await res.text(), hop);
  if (!rows.length) throw new Error('no download_link');
  pageEntries = await Promise.all(rows.map(async ({ token, name }) => ({ url: await resolveToken(token), name })));
  return pageEntries;
}

function paintList(entries: Entry[]): void {
  const list = document.querySelector('#list-downloadlinks');
  if (!list) throw new Error('list-downloadlinks');
  list.replaceChildren(
    ...entries.map(({ url, name }) => {
      const li = document.createElement('li');
      const a = Object.assign(document.createElement('a'), {
        className: 'buttond downloadAPK dapk_b',
        href: url,
        target: '_blank',
        rel: 'noopener noreferrer nofollow',
      });
      a.setAttribute(DONE, '1');
      a.append(Object.assign(document.createElement('i'), { className: 'fa fa-download' }), ` ${name}`);
      li.append(a);
      return li;
    }),
  );
  count();
}

export function initGapkmodBypass(): void {
  void canBypass('gapkmod').then((ok) => {
    if (!ok) return;
    boot();
    whenDomParsed(() => {
      reveal();
      for (const a of document.querySelectorAll<HTMLAnchorElement>('a.downloadAPK')) freeze(a);
      const pending = [...document.querySelectorAll<HTMLAnchorElement>(`a.downloadAPK[${PENDING}]`)];
      if (!pending.length) return;
      for (const a of pending) {
        const token = a.getAttribute(TOKEN);
        if (token) void resolveToken(token).then((url) => launch(a, url));
      }
      if (pending.some((a) => !a.hasAttribute(TOKEN))) void pageFinals().then(paintList);
    });
  });
}
