const HEX32 = /^[a-f0-9]{32}$/i;
const HEX64 = /^[a-f0-9]{64}$/i;

export const isCloudflareChallenge = (): boolean =>
  /just a moment/i.test(document.title) ||
  Boolean(document.querySelector('#challenge-error-text, #cf-challenge-running, .cf-challenge'));

export const isRinkuLandPath = (): boolean => /^\/rinku\/land\/?$/i.test(location.pathname);
export const isRinkuOutPath = (): boolean => /^\/rinku\/out\/?$/i.test(location.pathname);

export const isRinkuSflinkPage = (): boolean =>
  Boolean(
    document.querySelector(
      '.sflink-timer-box, .sflink-btn-next, .sflink-captcha-area, #sf-frm2, #sf-frm2-t, #sf-go-btn, #sf-go-btn-t',
    ),
  );

const hexInputs = (form: HTMLFormElement): HTMLInputElement | null =>
  [...form.querySelectorAll<HTMLInputElement>('input[type="hidden"]')].find(
    (el) => el.name && HEX32.test(el.name) && el.value && HEX32.test(el.value),
  ) ?? null;

export const rinkuHexForm = (): HTMLFormElement | null => {
  const byId = document.getElementById('sf-frm2-t') ?? document.getElementById('sf-frm2');
  if (byId instanceof HTMLFormElement && hexInputs(byId)) return byId;
  for (const form of document.querySelectorAll('form')) {
    if (!(form instanceof HTMLFormElement)) continue;
    if (!hexInputs(form)) continue;
    if (form.querySelector('button') || HEX64.test(form.id)) return form;
  }
  return null;
};

export const rinkuStepButton = (): HTMLButtonElement | null => {
  for (const id of ['sf-go-btn2-t', 'sf-go-btn2', 'sf-go-btn-t', 'sf-go-btn'] as const) {
    const el = document.getElementById(id);
    if (el instanceof HTMLButtonElement) return el;
  }
  for (const btn of document.querySelectorAll('button.sflink-btn-next, button')) {
    if (!(btn instanceof HTMLButtonElement)) continue;
    const t = btn.textContent ?? '';
    if (/step\s*\d+\s*\/\s*\d+/i.test(t) || /next\s*→/i.test(t) || /next\s*&rarr;/i.test(btn.innerHTML)) {
      return btn;
    }
  }
  return null;
};

export const rinkuCaptchaWidget = (): HTMLElement | null =>
  document.getElementById('captcha-container') ??
  document.querySelector<HTMLElement>('.cf-turnstile, [name="cf-turnstile-response"]');

export const rinkuCaptchaForm = (): HTMLFormElement | null => {
  const byId = document.getElementById('sf-frm2');
  if (byId instanceof HTMLFormElement && hexInputs(byId)) return byId;
  for (const form of document.querySelectorAll('form')) {
    if (!(form instanceof HTMLFormElement) || !hexInputs(form)) continue;
    if (form.querySelector('#captcha-container, .cf-turnstile, [name="cf-turnstile-response"]')) {
      return form;
    }
  }
  return null;
};

export const rinkuUnlockForm = (): HTMLFormElement | null => {
  const t = document.getElementById('sf-frm2-t');
  if (t instanceof HTMLFormElement && hexInputs(t)) return t;
  for (const form of document.querySelectorAll('form')) {
    if (!(form instanceof HTMLFormElement)) continue;
    if (HEX64.test(form.id) && hexInputs(form)) return form;
  }
  const step = rinkuStepButton()?.closest('form');
  if (step instanceof HTMLFormElement && hexInputs(step)) return step;
  return null;
};

export const isRinkuCaptchaGate = (): boolean =>
  !isCloudflareChallenge() &&
  !document.getElementById('redirect-link') &&
  Boolean(rinkuCaptchaForm() && rinkuCaptchaWidget());

export const isRinkuCountdownGate = (): boolean =>
  !isCloudflareChallenge() &&
  !isRinkuCaptchaGate() &&
  Boolean(rinkuUnlockForm() && document.getElementById('redirect-link') && document.getElementById('count'));
