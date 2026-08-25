import { canBypass } from '../../gate';
import { whenDomParsed } from '../../utils/domain-check';
import { decodeYasir252Link, encodedAttr } from './decode';

const LINK_SEL = '#downloadForm [data-og-url], #downloadForm [data-elink]';
const BRAND_ID = 'skipwait-yasir252-brand';
let formBlocked = false;

function mountBrand(): void {
  if (document.getElementById(BRAND_ID)) return;
  const header = document.querySelector('#downloadBox .dl-header');
  if (!header) return;
  const note = document.createElement('p');
  note.id = BRAND_ID;
  note.className = 'dl-subtitle';
  note.setAttribute('role', 'status');
  note.textContent = 'Skip Wait unlocked direct download links';
  header.append(note);
}

function toDirectLink(el: Element, url: string): void {
  if (el instanceof HTMLAnchorElement) {
    el.href = url;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
    el.removeAttribute('data-og-url');
    el.removeAttribute('data-elink');
    return;
  }
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = el.className;
  link.textContent = el.textContent?.trim() ?? '';
  el.replaceWith(link);
}

function rewrite(): void {
  let any = false;
  for (const el of document.querySelectorAll(LINK_SEL)) {
    const url = decodeYasir252Link(encodedAttr(el));
    if (!url) continue;
    toDirectLink(el, url);
    any = true;
  }
  if (!any) return;
  mountBrand();
  if (!formBlocked) {
    formBlocked = true;
    document.getElementById('downloadForm')?.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
      },
      true
    );
  }
}

function run(): void {
  const apply = (): void => {
    rewrite();
  };
  const obs = new MutationObserver(apply);
  obs.observe(document.body ?? document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['data-og-url', 'data-elink'],
  });
  apply();
  setTimeout(apply, 1500);
  setTimeout(() => {
    apply();
    obs.disconnect();
  }, 4500);
}

export function initYasir252DirectLinks(): void {
  const allowed = canBypass('yasir252');
  whenDomParsed(() => {
    if (!document.querySelector(LINK_SEL)) return;
    void allowed.then((ok) => {
      if (ok) run();
    });
  });
}
