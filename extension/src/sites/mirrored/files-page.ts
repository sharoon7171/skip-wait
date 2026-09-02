import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { whenDomParsed } from '../../utils/domain-check';

const BRAND_ID = 'skipwait-mirrored-brand';
const FILE_PATH_RE = /^\/files\/([A-Za-z0-9]+)\/?$/i;
const GETLINK_PATH_RE = /^\/getlink\/[A-Za-z0-9]+\/\d+\/?$/i;
const HASH_RE = /^[a-f0-9]{32}$/i;
const OUT_URL_RE = /\/out_url\/?$/i;
const HOST_FORM_SELECTOR = 'form[action*="/out_url"], form[action*="/getlink/"]';
const BRAND_STATUS = 'Short URLs skipped — Download opens the host directly.';

type HostTarget = { href: string; post?: FormData };

const pending = new WeakMap<HTMLFormElement, Promise<HostTarget | null>>();
let counted = false;

function count(): void {
  if (counted) return;
  counted = true;
  recordBypassSuccess();
}

function fileHash(): string | null {
  const hash = new URLSearchParams(location.search).get('hash');
  return hash && HASH_RE.test(hash) ? hash : null;
}

function unlockHref(): string | null {
  for (const a of document.querySelectorAll<HTMLAnchorElement>('a[href*="hash="]')) {
    try {
      const u = new URL(a.href, location.origin);
      if (!FILE_PATH_RE.test(u.pathname)) continue;
      const hash = u.searchParams.get('hash');
      if (!hash || !HASH_RE.test(hash) || !u.searchParams.has('dl')) continue;
      if (!a.querySelector('button.get_btn')) continue;
      return u.href;
    } catch {
      continue;
    }
  }
  return null;
}

function isInterstitialPage(): boolean {
  if (!FILE_PATH_RE.test(location.pathname) || fileHash()) return false;
  if (!document.querySelector('h3.hdark')) return false;
  if (!/You have requested the file/i.test(document.body?.innerText ?? '')) return false;
  return !!unlockHref();
}

function isMirrorsPage(): boolean {
  return FILE_PATH_RE.test(location.pathname) && !!fileHash();
}

function isGetlinkPage(): boolean {
  if (!GETLINK_PATH_RE.test(location.pathname)) return false;
  if (!/^Your .+ Link/i.test(document.title)) return false;
  return /Awesome!\s*You have chosen the hosting site/i.test(document.body?.innerText ?? '');
}

function isExternalHostUrl(href: string): boolean {
  try {
    const u = new URL(href, location.origin);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
    if (/mirrored\.to$/i.test(u.hostname) || u.hostname.endsWith('.mirrored.to')) return false;
    if (/cuty\.io$/i.test(u.hostname) || u.hostname.endsWith('.cuty.io')) return false;
    if (/^(www\.)?(x|twitter|facebook|google)\./i.test(u.hostname)) return false;
    return true;
  } catch {
    return false;
  }
}

function hostFromCutyWrap(html: string): string | null {
  const raw =
    html.match(/URL=(https:\/\/cuty\.io\/quick\?[^"'\s>]+)/i)?.[1] ??
    html.match(/href="(https:\/\/cuty\.io\/quick\?[^"]+)"/i)?.[1];
  if (!raw) return null;
  try {
    const dest = new URL(raw.replaceAll('&amp;', '&')).searchParams.get('url');
    return dest && isExternalHostUrl(dest) ? dest : null;
  } catch {
    return null;
  }
}

function hostUrlFromDocument(root: ParentNode): string | null {
  for (const a of root.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')) {
    if (!isExternalHostUrl(a.href)) continue;
    if (!a.querySelector('button.get_btn')) continue;
    if (!/Download from/i.test(a.textContent ?? '')) continue;
    return a.href;
  }
  const clip = root.querySelector('[data-clipboard-text^="http"]')?.getAttribute('data-clipboard-text');
  if (clip && isExternalHostUrl(clip)) return clip;
  const code = root.querySelector('code')?.textContent?.trim();
  return code && isExternalHostUrl(code) ? code : null;
}

function mountBrand(): void {
  if (document.getElementById(BRAND_ID)) return;
  const meta = document.querySelector('.col-sm.centered .bg.double-padded');
  if (!meta) return;

  const row = document.createElement('span');
  row.id = BRAND_ID;
  row.setAttribute('role', 'status');

  const icon = document.createElement('div');
  icon.className = 'icon baseline2';
  icon.innerHTML =
    '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"/></svg>';

  const value = document.createElement('span');
  value.className = 'id_Success';
  value.textContent = BRAND_STATUS;

  row.append(icon, '\u00a0\u00a0Skip Wait : ', value);
  meta.append(document.createElement('br'), row);
}

async function postForm(form: HTMLFormElement): Promise<string | null> {
  const action = form.getAttribute('action');
  if (!action) return null;
  const res = await fetch(new URL(action, location.origin).href, {
    method: 'POST',
    body: new FormData(form),
    credentials: 'include',
    cache: 'no-store',
  });
  return res.ok ? res.text() : null;
}

async function resolveDlOut(form: HTMLFormElement): Promise<HostTarget | null> {
  const html = await postForm(form);
  if (!html) return null;
  const next = new DOMParser()
    .parseFromString(html, 'text/html')
    .querySelector<HTMLFormElement>('form[action]');
  if (!next) return null;
  try {
    const u = new URL(next.getAttribute('action') ?? '', location.origin);
    return isExternalHostUrl(u.href) ? { href: u.href, post: new FormData(next) } : null;
  } catch {
    return null;
  }
}

async function resolveHostTarget(form: HTMLFormElement): Promise<HostTarget | null> {
  const action = new URL(form.getAttribute('action') ?? '', location.origin);
  const html = await postForm(form);
  if (!html) return null;
  if (OUT_URL_RE.test(action.pathname)) {
    const href = hostFromCutyWrap(html);
    return href ? { href } : null;
  }
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const direct = hostUrlFromDocument(doc) ?? hostFromCutyWrap(html);
  if (direct) return { href: direct };
  const dl = doc.querySelector<HTMLFormElement>('form[action*="dl_out.php"]');
  return dl ? resolveDlOut(dl) : null;
}

function hostTarget(form: HTMLFormElement): Promise<HostTarget | null> {
  const started = pending.get(form);
  if (started) return started;
  const task = resolveHostTarget(form).catch(() => null);
  pending.set(form, task);
  return task;
}

function retargetForm(form: HTMLFormElement, target: HostTarget, windowTarget: string): void {
  if (!target.post) return;
  form.setAttribute('action', target.href);
  form.method = 'POST';
  form.target = windowTarget;
  for (const input of form.querySelectorAll('input[type="hidden"]')) input.remove();
  for (const [name, value] of target.post.entries()) {
    if (typeof value !== 'string') continue;
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.append(input);
  }
}

function exposeHostLink(form: HTMLFormElement, target: HostTarget): void {
  if (target.post) {
    retargetForm(form, target, '_blank');
    return;
  }
  const btn = form.querySelector('button.get_btn');
  if (!btn) return;
  const a = document.createElement('a');
  a.href = target.href;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.append(btn);
  form.replaceWith(a);
}

function openHostTarget(form: HTMLFormElement, target: HostTarget): void {
  if (target.post) {
    retargetForm(form, target, '_self');
    form.submit();
    return;
  }
  location.assign(target.href);
}

function armHostForms(root: ParentNode): void {
  for (const form of root.querySelectorAll<HTMLFormElement>(HOST_FORM_SELECTOR)) {
    if (pending.has(form)) continue;
    void hostTarget(form).then((target) => {
      if (target && form.isConnected) {
        count();
        exposeHostLink(form, target);
      }
    });
  }
}

function wireHostClicks(root: Element): void {
  root.addEventListener(
    'click',
    (e) => {
      const el = e.target as Element | null;
      if (!el?.closest('button.get_btn')) return;
      const form = el.closest<HTMLFormElement>(HOST_FORM_SELECTOR);
      if (!form) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      void hostTarget(form).then((resolved) => {
        if (resolved) {
          count();
          openHostTarget(form, resolved);
        }
      });
    },
    true,
  );
}

function runMirrorsPage(): void {
  const result = document.getElementById('result');
  if (!result) return;
  mountBrand();
  wireHostClicks(result);
  armHostForms(result);
  new MutationObserver(() => armHostForms(result)).observe(result, { childList: true, subtree: true });
}

function runGetlinkPage(): void {
  const host = hostUrlFromDocument(document) ?? hostFromCutyWrap(document.documentElement.innerHTML);
  if (host) {
    count();
    location.replace(host);
    return;
  }
  const dl = document.querySelector<HTMLFormElement>('form[action*="dl_out.php"]');
  if (!dl) return;
  void resolveDlOut(dl).then((target) => {
    if (target) {
      count();
      openHostTarget(dl, target);
    }
  });
}

function run(): void {
  if (isInterstitialPage()) {
    const href = unlockHref();
    if (href) location.replace(href);
    return;
  }
  if (isMirrorsPage()) {
    runMirrorsPage();
    return;
  }
  if (isGetlinkPage()) runGetlinkPage();
}

export function initMirroredFilesPage(): void {
  if (!FILE_PATH_RE.test(location.pathname) && !GETLINK_PATH_RE.test(location.pathname)) return;
  const allowed = canBypass('mirrored');
  whenDomParsed(() => {
    void allowed.then((ok) => {
      if (!ok) return;
      run();
    });
  });
}
