import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { whenDomParsed } from '../../utils/domain-check';
import { filehippoRouteId } from './hosts';
import { resolveLaunchUrl } from './resolve';

const BRAND_ID = 'skipwait-filehippo-brand';
const LAUNCH_ATTR = 'data-skipwait-launch';

const HANDLED = new Set([
  'program',
  'programVersion',
  'programDownload',
  'programPostDownload',
]);

const DOWNLOAD_BTN = 'a.js-download-btn, a.js-download-btn-file, a.js-button-lag';

function downloadButtons(): HTMLAnchorElement[] {
  return [...document.querySelectorAll<HTMLAnchorElement>(DOWNLOAD_BTN)].filter(
    (el) => !el.hasAttribute(LAUNCH_ATTR),
  );
}

function visualClassName(from: HTMLAnchorElement): string {
  return [...from.classList].filter((name) => !name.startsWith('js-')).join(' ');
}

function replaceWithLaunchButton(old: HTMLAnchorElement, url: string): void {
  const next = document.createElement('a');
  next.className = visualClassName(old);
  next.href = url;
  next.target = '_blank';
  next.rel = 'noopener noreferrer';
  next.setAttribute(LAUNCH_ATTR, '1');
  next.setAttribute('aria-disabled', 'false');
  next.innerHTML = old.innerHTML;
  next.querySelector('.js-button-spinner')?.remove();
  next.querySelector('.js-button-lag-icon')?.classList.remove('is-hidden');
  next.querySelector('.js-button-lag-text')?.classList.remove('not-visible');
  old.replaceWith(next);
}

function applyLaunchButtons(url: string): void {
  for (const btn of downloadButtons()) {
    replaceWithLaunchButton(btn, url);
  }
}

function disarmAutoIframe(): void {
  const iframe = document.getElementById('iframe-download');
  if (!(iframe instanceof HTMLIFrameElement)) return;
  iframe.removeAttribute('src');
  iframe.removeAttribute('data-dw-url');
  iframe.remove();
}

function brandAnchor(): Element | null {
  return (
    document.querySelector('.U3SftL') ??
    document.querySelector('.js-relaunch-action-wrapper') ??
    document.querySelector(`a[${LAUNCH_ATTR}]`)?.parentElement ??
    null
  );
}

function mountBrand(): void {
  if (document.getElementById(BRAND_ID)) return;
  const anchor = brandAnchor();
  if (!anchor) return;

  const brand = document.createElement('div');
  brand.id = BRAND_ID;
  brand.className = '_6lscF LNn8Rh QT5VME';
  brand.setAttribute('role', 'status');

  const iconWrap = document.createElement('div');
  iconWrap.className = 'BXBtHj kC4eqY';
  iconWrap.innerHTML =
    '<svg class="JWiJTm _tkCZE BXBtHj" viewBox="0 0 1024 1024" aria-label="circle-info icon" role="img">' +
    '<use class="BKi9Ew" href="/statics/beren/icons.svg#i-circle-info"></use></svg>';

  const body = document.createElement('div');
  body.className = 'qOdQu8';
  const text = document.createElement('div');
  text.className = 'UgR1WJ';
  text.textContent =
    'Skip Wait — timers bypassed. Click download to open the file in a new tab.';
  body.append(text);

  brand.append(iconWrap, body);
  anchor.before(brand);
}

function run(): void {
  const routeId = filehippoRouteId();
  if (!routeId || !HANDLED.has(routeId)) return;
  if (!document.querySelector(DOWNLOAD_BTN) && !document.getElementById('iframe-download')) {
    return;
  }

  void resolveLaunchUrl().then((url) => {
    if (routeId === 'programPostDownload') disarmAutoIframe();
    applyLaunchButtons(url);
    mountBrand();
    recordBypassSuccess();
  });
}

export function initFilehippoBypass(): void {
  void canBypass('filehippo').then((ok) => {
    if (!ok) return;
    whenDomParsed(run);
  });
}
