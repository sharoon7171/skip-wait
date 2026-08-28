export const FREEDLINK_FILE_RE = /^\/([A-Za-z0-9]+)\/.+\.html$/i;

export const FREE_FORM = 'form[name="FREE1"]';
export const FREE_BUTTON = '#downloadbtnfree';
export const FREE_CAPTCHA = '#free-captcha';
export const MISSING_TITLE = 'h2.titlepage';
export const CAPTCHA_RESPONSE = '[name="h-captcha-response"], [name="g-recaptcha-response"]';

export const HCAPTCHA_IFRAMES = [
  'iframe[src*="hcaptcha.com"]',
  'iframe[src*="newassets.hcaptcha.com"]',
] as const;
