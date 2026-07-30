import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { decodeYasir252Link, encodedAttr } from './decode';
import { YASIR252_HOSTS } from './hosts';

function markReady(): void {
  for (const el of document.querySelectorAll('.download div, .download p')) {
    const text = el.textContent?.trim() ?? '';
    if (text === 'Resource Is Being Prepared!') el.textContent = 'Download Ready';
    if (text.startsWith('Your download is almost ready')) {
      el.textContent = 'Skip Wait unlocked the direct download link.';
    }
  }
}

function unlock(): void {
  document.getElementById('noticeModalOverlay')?.remove();
  let any = false;
  for (const el of document.querySelectorAll('[data-elink], [data-og-url]')) {
    if (!(el instanceof HTMLAnchorElement)) continue;
    const url = decodeYasir252Link(encodedAttr(el));
    if (!url) continue;
    el.href = url;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
    el.textContent = 'DOWNLOAD';
    el.style.pointerEvents = 'auto';
    el.removeAttribute('data-og-url');
    el.removeAttribute('data-elink');
    el.replaceWith(el.cloneNode(true));
    any = true;
  }
  if (any) markReady();
}

export function initYasir252MediatorPage(): void {
  if (!isAllowedHost(YASIR252_HOSTS)) return;
  if (!location.pathname.startsWith('/go')) return;
  whenDomParsed(() => {
    unlock();
    setTimeout(unlock, 1000);
  });
}
