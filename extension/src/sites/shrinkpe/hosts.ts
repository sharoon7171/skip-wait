export const SITE = 'shrinkpe' as const;
export const MSG_RESOLVE = 'SHRINKPE_RESOLVE' as const;
export const MSG_PROGRESS = 'SHRINKPE_PROGRESS' as const;

const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{3,}$/;

export const ERROR_STATUS = 'Couldn’t finish this link. Reload and try again.';

export type ShrinkpeProgress = { lead: string; detail: string; status: string; countdownSec?: number };

export const isShortUrl = (href: string): boolean => {
  try {
    const u = new URL(href);
    if (!/^https?:\/\//i.test(u.href)) return false;
    const [seg, ...rest] = u.pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
    return !!seg && rest.length === 0 && ALIAS_RE.test(seg);
  } catch {
    return false;
  }
};

export const isAliasPage = (): boolean => isShortUrl(location.href);

export const isRejectHtml = (html: string): boolean =>
  /Session expired! Please verify captcha again/i.test(html) ||
  /CAPTCHA not detected or missing keys/i.test(html) ||
  /Captcha Verification Failed/i.test(html);
