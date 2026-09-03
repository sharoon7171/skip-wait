import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { prepClientChecks, requestVisibilitySpoof } from './prep';

const OVERLAY_ID = 'skip-wait-shrinkearn-mediator';
const HOP_IDS = ['go_d2', 'getmylink', 'nextpage'] as const;
const HOP_KEYS = ['token', 'alias', 'c_d', 'c_t', 'url'] as const;
const NOTE = {
  lead: 'Skipping the wait pages.',
  detail: "You don't need to tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;
let started = false;

const mount = (status: string): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  const bootId = `${OVERLAY_ID}-boot`;
  if (!document.getElementById(bootId)) {
    const style = document.createElement('style');
    style.id = bootId;
    style.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
    (document.head || document.documentElement).appendChild(style);
  }
  if (ui) {
    ui.setStatus(status);
    return;
  }
  ui = createFullPageOverlay({ id: OVERLAY_ID, brand: 'Skip Wait', note: NOTE, status });
};

const hopForm = (): HTMLFormElement | null => {
  for (const id of HOP_IDS) {
    const form = document.querySelector<HTMLFormElement>(`form#${id}`);
    if (!form) continue;
    if (HOP_KEYS.every((key) => form.querySelector<HTMLInputElement>(`input[name="${key}"]`)?.value?.trim()))
      return form;
  }
  return null;
};

const submitHop = (form: HTMLFormElement): void => {
  prepClientChecks();
  requestVisibilitySpoof();
  form.style.setProperty('display', 'block', 'important');
  const btn = form.querySelector<HTMLElement>('#getnewlink, button[type="submit"], input[type="submit"]');
  if (btn) {
    btn.removeAttribute('disabled');
    btn.click();
    return;
  }
  form.submit();
};

const tick = (): void => {
  if (started || /taboola\.com/i.test(location.href)) return;
  const form = hopForm();
  if (!form) return;
  started = true;
  mount('Skipping wait pages…');
  submitHop(form);
};

export const initShrinkEarnMediator = (): void => {
  if (window !== window.top) return;
  void canBypass('shrinkearn-mediator').then((ok) => {
    if (!ok) return;
    tick();
    const mo = new MutationObserver(tick);
    mo.observe(document.documentElement, { childList: true, subtree: true });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tick, { once: true });
  });
};
