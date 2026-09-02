import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { whenDomParsed } from '../../utils/domain-check';
import { destinationFromWaitDocument, resolveWaitDestination } from './resolve';

const HIJACKED = 'data-skipwait-softpedia';
const NOTICE_ID = 'skipwait-softpedia-bypass';
const WAIT_PATH_RE = /\/dyn-postdownload\.php(?:\/|$)/i;
const pending = new Map<string, Promise<string>>();
const resolved = new Map<string, string>();

function isWaitPath(pathname = location.pathname): boolean {
  return WAIT_PATH_RE.test(pathname);
}

function isWaitUrl(href: string): boolean {
  try {
    const u = new URL(href, location.href);
    return u.hostname.toLowerCase() === location.hostname.toLowerCase() && isWaitPath(u.pathname);
  } catch {
    return false;
  }
}

function absoluteWaitUrl(href: string): string {
  return new URL(href, location.href).href;
}

function waitUrlFromOnclick(onclick: string | null): string | null {
  if (!onclick) return null;
  const match = onclick.match(
    /(?:location(?:\.href)?\s*=\s*|window\.location(?:\.href)?\s*=\s*)['"]([^'"]*dyn-postdownload\.php[^'"]*)['"]/i,
  );
  return match?.[1] ? absoluteWaitUrl(match[1]) : null;
}

function resolveCached(waitUrl: string): Promise<string> {
  const hit = resolved.get(waitUrl);
  if (hit) return Promise.resolve(hit);
  let job = pending.get(waitUrl);
  if (!job) {
    job = resolveWaitDestination(waitUrl)
      .then((dest) => {
        resolved.set(waitUrl, dest);
        return dest;
      })
      .finally(() => {
        pending.delete(waitUrl);
      });
    pending.set(waitUrl, job);
  }
  return job;
}

function mountNotice(root: Element): void {
  if (document.getElementById(NOTICE_ID)) return;
  const notice = document.createElement('p');
  notice.id = NOTICE_ID;
  notice.className = 'dldiscl1';
  notice.style.margin = '12px 0 0 30px';
  notice.textContent =
    'Skip Wait — mirror clicks open the file directly, skipping the Softpedia wait page.';
  root.prepend(notice);
}

function applyLaunch(el: Element, dest: string): void {
  if (el instanceof HTMLAnchorElement) {
    el.href = dest;
    el.removeAttribute('onclick');
    el.setAttribute(HIJACKED, '1');
    return;
  }
  el.removeAttribute('onclick');
  el.setAttribute(HIJACKED, '1');
  el.addEventListener(
    'click',
    (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      recordBypassSuccess();
      location.assign(dest);
    },
    true,
  );
}

function wireMirror(el: Element, waitUrl: string): void {
  if (el.hasAttribute(HIJACKED)) return;
  el.setAttribute(HIJACKED, 'pending');
  void resolveCached(waitUrl).then(
    (dest) => applyLaunch(el, dest),
    () => el.setAttribute(HIJACKED, 'fail'),
  );
}

function scanMirrors(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('a[href*="dyn-postdownload.php"]');
  for (const a of links) {
    if (!isWaitUrl(a.href)) continue;
    wireMirror(a, absoluteWaitUrl(a.href));
  }

  for (const el of document.querySelectorAll<HTMLElement>('[onclick*="dyn-postdownload.php"]')) {
    if (el instanceof HTMLAnchorElement) continue;
    const waitUrl = waitUrlFromOnclick(el.getAttribute('onclick'));
    if (!waitUrl) continue;
    wireMirror(el, waitUrl);
  }

  const list = document.getElementById('dllinks');
  if (list && links.length) mountNotice(list);
}

function runWaitPage(): void {
  try {
    recordBypassSuccess();
    location.replace(destinationFromWaitDocument(document));
  } catch {
    return;
  }
}

function runProgramPage(): void {
  scanMirrors();
  new MutationObserver(scanMirrors).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

export function initSoftpediaBypass(): void {
  const allowed = canBypass('softpedia');
  whenDomParsed(() => {
    void allowed.then((ok) => {
      if (!ok) return;
      if (isWaitPath()) {
        runWaitPage();
        return;
      }
      runProgramPage();
    });
  });
}
