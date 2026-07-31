export const ouoLandingForm = (): HTMLFormElement | null => {
  const form = document.querySelector<HTMLFormElement>('#form-captcha');
  if (!form) return null;
  const action = form.getAttribute('action') || form.action || '';
  if (!/\/go\//i.test(action)) return null;
  return form;
};

export const ouoGoForm = (): HTMLFormElement | null => {
  const form = document.querySelector<HTMLFormElement>('#form-go');
  if (!form) return null;
  const action = form.getAttribute('action') || form.action || '';
  if (!/xreallcygo/i.test(action)) return null;
  return form;
};

export const isOuoLandingGate = (): boolean => Boolean(ouoLandingForm());

export const isOuoGoGate = (): boolean => Boolean(ouoGoForm());
