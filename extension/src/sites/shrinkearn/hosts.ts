export const SITE = 'shrinkearn' as const;
export const OVERLAY_ID = 'skip-wait-shrinkearn';
export const CAPTCHA_WIDGET_ID = 'captchaShortlink';
export const CONTINUE_BTN_SEL = '#link-view .btn-captcha';
export const GET_LINK_SEL = 'a.get-link, #gt-link';
export const ERROR_STATUS = 'Couldn’t finish this link. Reload and try again.';
export const UNLOCK_WAIT_MS = 15_000;

const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{3,}$/;

export const isAliasPage = (): boolean => {
  try {
    const u = new URL(location.href);
    const [seg, ...rest] = u.pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
    return !!seg && rest.length === 0 && ALIAS_RE.test(seg);
  } catch {
    return false;
  }
};
