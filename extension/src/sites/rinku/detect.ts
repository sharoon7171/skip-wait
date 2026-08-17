const HEX32 = /^[a-f0-9]{32}$/i;

export const isCloudflareChallenge = (): boolean =>
  /just a moment/i.test(document.title) ||
  Boolean(document.querySelector('#challenge-error-text, #cf-challenge-running, .cf-challenge'));

const hasToken = (form: HTMLFormElement): boolean => {
  for (const input of form.elements) {
    if (
      input instanceof HTMLInputElement &&
      input.type === 'hidden' &&
      HEX32.test(input.name) &&
      HEX32.test(input.value)
    ) {
      return true;
    }
  }
  return false;
};

export const rinkuForm = (): HTMLFormElement | null => {
  const byId = document.getElementById('sf-frm2-t') ?? document.getElementById('sf-frm2');
  return byId instanceof HTMLFormElement && hasToken(byId) ? byId : null;
};

export const rinkuCaptchaWidget = (): HTMLElement | null =>
  document.getElementById('captcha-container') ??
  document.querySelector<HTMLElement>('.cf-turnstile, [name="cf-turnstile-response"]');
