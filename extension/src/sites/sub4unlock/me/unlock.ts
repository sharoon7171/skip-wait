import { linksGoFormFromHtml, type LinksGoForm } from '../../adlinkfly/unlock';
import { createFullPageOverlay, type FullPageOverlay } from '../../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../../injected-ui/overlay-styles';
import { isAllowedHost, whenDomParsed } from '../../../utils/domain-check';
import { SUB4UNLOCK_ME_HOSTS } from './hosts';

const OVERLAY_ID = 'skip-wait-sub4unlock-me-overlay';
const BOOT_STYLE_ID = 'skip-wait-sub4unlock-me-boot';
const LOCKER = '#link-view';
const GO_DATA = '#go-link input[name="ad_form_data"]';

const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;
let started = false;

const isUnlockPage = (): boolean =>
  Boolean(document.querySelector(`${LOCKER}, ${GO_DATA}`));

const bootOverlayLock = (): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BOOT_STYLE_ID;
  style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head || document.documentElement).appendChild(style);
};

const mountUi = (status = 'Getting things ready…'): FullPageOverlay => {
  bootOverlayLock();
  if (ui) {
    ui.setNote(NOTE);
    ui.setStatus(status);
    ui.setError(null);
    return ui;
  }
  ui = createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note: NOTE,
    status,
  });
  return ui;
};

const formFromEl = (form: HTMLFormElement): LinksGoForm => {
  const actionAttr = form.getAttribute('action') || location.pathname;
  const action = /^https?:\/\//i.test(actionAttr)
    ? actionAttr
    : new URL(actionAttr, location.href).href;
  const fields: Record<string, string> = {};
  form.querySelectorAll<HTMLInputElement>('input[name]').forEach((inp) => {
    if (inp.name) fields[inp.name] = inp.value ?? '';
  });
  return { action, fields };
};

const destFromGoUrl = (url: string): string | null => {
  const lnk1 = new URLSearchParams(url.replace(/^\?/, '')).get('lnk1');
  if (!lnk1) return null;
  try {
    const dest = decodeURIComponent(atob(lnk1)).trim();
    return /^https?:\/\//i.test(dest) ? dest : null;
  } catch {
    return null;
  }
};

const postForm = async (form: LinksGoForm, referer: string, ajax: boolean): Promise<Response> =>
  fetch(form.action, {
    method: 'POST',
    body: new URLSearchParams(form.fields),
    credentials: 'include',
    headers: {
      Accept: ajax ? 'application/json, text/javascript, */*; q=0.01' : 'text/html',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Referer: referer,
      ...(ajax ? { 'X-Requested-With': 'XMLHttpRequest' } : {}),
    },
  });

const destinationFromGo = async (form: LinksGoForm, referer: string): Promise<string | null> => {
  const r = await postForm(form, referer, true);
  const data = JSON.parse(await r.text()) as { status?: string; url?: string };
  if (data.status !== 'success' || typeof data.url !== 'string') return null;
  return destFromGoUrl(data.url.trim());
};

const unlock = async (): Promise<void> => {
  if (started) return;
  started = true;
  const overlay = mountUi('Unlocking your link…');

  let go = linksGoFormFromHtml(document.documentElement.innerHTML, location.href);
  if (!go?.fields['ad_form_data']) {
    const view = document.querySelector<HTMLFormElement>(LOCKER);
    if (!view) {
      overlay.setError('Unlock form not found on this page.');
      started = false;
      return;
    }
    const html = await (await postForm(formFromEl(view), location.href, false)).text();
    go = linksGoFormFromHtml(html, location.href);
  }

  if (!go?.fields['ad_form_data']) {
    overlay.setError('Couldn’t unlock this link. Reload and try again.');
    started = false;
    return;
  }

  const dest = await destinationFromGo(go, location.href);
  if (!dest) {
    overlay.setError('Couldn’t unlock this link. Reload and try again.');
    started = false;
    return;
  }

  overlay.setStatus('Opening your link…');
  location.replace(dest);
};

export function initSub4unlockMeUnlock(): void {
  if (window !== window.top) return;
  if (!isAllowedHost(SUB4UNLOCK_ME_HOSTS)) return;
  whenDomParsed(() => {
    if (!isUnlockPage()) return;
    bootOverlayLock();
    mountUi('Getting things ready…');
    void unlock().catch(() => {
      started = false;
      mountUi().setError('Couldn’t unlock this link. Reload and try again.');
    });
  });
}
