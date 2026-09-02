import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { linksGoFormFromHtml, postLinksGo } from '../adlinkfly/unlock';
import { bblinkAliasFromPath } from './hosts';

const OVERLAY_ID = 'skip-wait-bblink-overlay';
const BOOT_STYLE_ID = 'skip-wait-bblink-boot';
const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;
let started = false;

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const spoof = (): void => {
  chrome.runtime.sendMessage({ type: 'INJECT_VISIBILITY_SPOOF' }).catch(() => {});
  try {
    document.cookie = 'ab=1; path=/';
  } catch {}
};

const mountUi = (status = 'Getting things ready…'): FullPageOverlay => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (!document.getElementById(BOOT_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = BOOT_STYLE_ID;
    style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
    (document.head || document.documentElement).appendChild(style);
  }
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
    countdownLabel: 'Your link opens in',
  });
  return ui;
};

const continueForm = (html: string): HTMLFormElement | null =>
  new DOMParser().parseFromString(html, 'text/html').querySelector('#form-continue');

const postContinue = async (form: HTMLFormElement): Promise<string | null> => {
  const body = new URLSearchParams();
  for (const el of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    'input[name], textarea[name]',
  )) {
    body.append(el.name, el.value);
  }
  try {
    const action = new URL(form.getAttribute('action')?.trim() || location.href, location.href).href;
    const res = await fetch(action, {
      method: 'POST',
      body,
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    });
    return res.ok ? await res.text() : null;
  } catch {
    return null;
  }
};

const counterSec = (html: string): number => {
  const m = html.match(/["']counter_value["']\s*:\s*["']?(\d+)/);
  return m?.[1] ? Math.max(0, parseInt(m[1], 10)) : 0;
};

const unlockUrl = async (html: string, overlay: FullPageOverlay): Promise<string | null> => {
  const form = linksGoFormFromHtml(html, location.href);
  if (!form) return null;

  const sec = counterSec(html);
  if (sec > 0) {
    overlay.setStatus('Waiting for the short timer…');
    overlay.startCountdown(Date.now() + sec * 1000);
    await sleep(sec * 1000 + 500);
    overlay.hideCountdown();
  }

  overlay.setStatus('Unlocking your link…');
  let url = await postLinksGo(form, location.href);
  const endAt = Date.now() + 3000;
  while (!url && Date.now() < endAt) {
    await sleep(200);
    url = await postLinksGo(form, location.href);
  }
  return url;
};

const run = async (): Promise<void> => {
  spoof();
  const overlay = mountUi('Getting things ready…');
  let html = document.documentElement.outerHTML;
  let cont = continueForm(html);

  while (cont) {
    const step = cont.querySelector<HTMLInputElement>('input[name="page"]')?.value?.trim();
    overlay.setStatus(step ? `Skipping step ${step}…` : 'Skipping continue page…');
    const next = await postContinue(cont);
    if (!next) {
      overlay.setError('Couldn’t skip this continue step. Reload and try again.');
      return;
    }
    html = next;
    cont = continueForm(html);
  }

  const url = await unlockUrl(html, overlay);
  if (!url) {
    overlay.setError('Couldn’t unlock this link. Reload and try again.');
    return;
  }
  overlay.setStatus('Opening your link…');
  recordBypassSuccess();
  location.replace(url);
};

const kick = (): void => {
  if (started || !bblinkAliasFromPath()) return;
  if (!document.querySelector('#form-continue, #go-link input[name="ad_form_data"]')) return;
  started = true;
  void run().catch(() => mountUi().setError('Unlock failed. Reload and try again.'));
};

export function initBblinkGate(): void {
  if (window !== window.top || !bblinkAliasFromPath()) return;
  void canBypass('bblink').then((ok) => {
    if (!ok) return;
    mountUi();
    kick();
    const mo = new MutationObserver(() => {
      kick();
      if (started) mo.disconnect();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  });
}
