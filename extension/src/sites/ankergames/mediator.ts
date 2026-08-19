import { isRemoteSite } from '../../hosts/check';
import { whenDomParsed } from '../../utils/domain-check';
import { ANKERGAMES_MEDIATOR_PATH } from './hosts';

const BANNER_ID = 'skipwait-ankergames-banner';
const BANNER_HTML =
  '<div class="flex items-start">' +
  '<div class="shrink-0 mr-3">' +
  '<svg aria-hidden="true" class="w-5 h-5 text-sky-500" viewBox="0 0 20 20" fill="currentColor">' +
  '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-3.03-2.72a1 1 0 00-1.44-1.38l-4.1 4.28-1.96-1.96a1 1 0 10-1.42 1.42l2.69 2.68a1 1 0 001.43-.02l4.8-5.02z" clip-rule="evenodd"></path>' +
  '</svg></div><div><p class="text-sm text-sky-800 dark:text-sky-200">' +
  '<span class="font-medium">Skip Wait</span> removed the wait timer. Your download buttons unlock the moment the check is solved — no countdown.' +
  '</p></div></div>';

function mountBanner(): boolean {
  if (document.getElementById(BANNER_ID)) return true;
  const anchor = document.querySelector('[x-ref="animatedText"]')?.closest('div');
  if (!anchor?.parentElement) return false;
  const banner = Object.assign(document.createElement('div'), {
    id: BANNER_ID,
    className:
      'py-3 px-4 mb-6 rounded-lg bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-700/30',
    innerHTML: BANNER_HTML,
  });
  banner.setAttribute('role', 'status');
  anchor.parentElement.insertBefore(banner, anchor);
  return true;
}

export function initAnkergamesMediator(): void {
  if (!ANKERGAMES_MEDIATOR_PATH.test(location.pathname)) return;
  void isRemoteSite('ankergames').then((ok) => {
    if (!ok) return;
    if (mountBanner()) return;
    const observer = new MutationObserver(() => {
      if (mountBanner()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    whenDomParsed(() => {
      mountBanner();
      observer.disconnect();
    });
  });
}
