import { revealTimerLinks } from '../adlinkfly/unlock';
import { CAPTCHA_WIDGET_ID, CONTINUE_BTN_SEL } from './hosts';

const CAMPS = /advertisingcamps\.com/i;
const CAMPS_FORM_ID = 'skip-wait-shrinkearn-camps';
const TURNSTILE_RESPONSE = `[name="cf-turnstile-response"]`;
const START_BTN = '#btn-getlink, #btn-wait, #btn-unlock';
const MIN_TOKEN_LEN = 500;

const campsForm = (): HTMLFormElement | null => {
  for (const form of document.querySelectorAll('form')) {
    const action = form.getAttribute('action') ?? form.action;
    if (!action || !CAMPS.test(action)) continue;
    if (!form.querySelector('input[name="token"], input[name="alias"]')) continue;
    return form;
  }
  return null;
};

const captchaInput = (): HTMLInputElement | null =>
  document.querySelector<HTMLInputElement>(`#${CAPTCHA_WIDGET_ID} ${TURNSTILE_RESPONSE}`);

const continueBtn = (): HTMLButtonElement | null =>
  document.querySelector<HTMLButtonElement>(CONTINUE_BTN_SEL);

const linkCaptchaToForm = (): void => {
  const form = campsForm();
  const input = captchaInput();
  if (!form || !input) return;
  if (!form.id) form.id = CAMPS_FORM_ID;
  if (input.getAttribute('form') !== form.id) input.setAttribute('form', form.id);
};

const hoistedWidget = (): HTMLElement | null => {
  for (const el of document.querySelectorAll<HTMLElement>('.notranslate')) {
    const iframe = el.querySelector('iframe');
    if (iframe && iframe.offsetWidth * iframe.offsetHeight > 0) return el;
  }
  return null;
};

export const isUnlockShell = (): boolean => !!document.querySelector('input[name="ad_form_data"]');

export const isCaptchaGate = (): boolean =>
  !!document.getElementById(CAPTCHA_WIDGET_ID) && !isUnlockShell();

export const tickUnlockPage = (): void => {
  revealTimerLinks();
  const btn = document.querySelector<HTMLElement>(START_BTN);
  if (btn && !btn.dataset['swClicked']) {
    btn.dataset['swClicked'] = '1';
    btn.click();
  }
};

export const showCaptchaInOverlay = (mount: HTMLElement): boolean => {
  const cap = document.getElementById(CAPTCHA_WIDGET_ID);
  if (cap && !mount.contains(cap)) {
    mount.appendChild(cap);
    linkCaptchaToForm();
  }
  const widget = hoistedWidget();
  if (!widget) return false;
  if (!mount.contains(widget)) {
    mount.appendChild(widget);
    widget.style.width = '100%';
    widget.style.maxWidth = '300px';
    widget.style.height = '70px';
    widget.style.overflow = 'hidden';
    widget.style.margin = '0 auto';
    const iframe = widget.querySelector('iframe');
    if (iframe instanceof HTMLElement) {
      iframe.style.width = '300px';
      iframe.style.height = '70px';
    }
  }
  linkCaptchaToForm();
  return true;
};

export const turnstileReady = (): boolean => {
  if ((captchaInput()?.value?.trim() ?? '').length < MIN_TOKEN_LEN) return false;
  const btn = continueBtn();
  return !!btn && !btn.disabled && !btn.hasAttribute('disabled');
};

export const submitCamps = (): void => {
  linkCaptchaToForm();
  const btn = continueBtn();
  if (!turnstileReady() || !btn) return;
  btn.disabled = false;
  btn.removeAttribute('disabled');
  btn.click();
};
