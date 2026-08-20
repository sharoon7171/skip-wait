const REPO_ISSUES_NEW = 'https://github.com/sharoon7171/skip-wait-bypass-timers-countdowns/issues/new';

export const CHROME_WEB_STORE_LISTING_URL =
  'https://chromewebstore.google.com/detail/hdoecnlghjglmnjpnhaaeofcgocdgkhd';

const WEBSITE_URL = 'https://skip-wait-website.vercel.app';

export const SUPPORTED_SITES_URL = `${WEBSITE_URL}/sites`;

export const GUMROAD_URL = 'https://gumroad.com/l/vhjfx';

export const PRICE_CARD = '$2';
export const PRICE_CRYPTO = '$1';
export const PRICE_LABEL = `${PRICE_CARD} / month`;

export const CONTACT = {
  email: 'sharoon7171@gmail.com',
  telegram: 'https://t.me/sharoon1998',
  github: 'https://github.com/sharoon7171',
} as const;

export function assetUrl(file: string): string {
  if (typeof chrome !== 'undefined' && chrome.runtime?.getURL) {
    return chrome.runtime.getURL(file);
  }
  return `/${file}`;
}

export function getRequestSupportUrl(): string {
  const u = new URL(REPO_ISSUES_NEW);
  u.searchParams.set('template', 'request_support.yml');
  u.searchParams.set('labels', 'request-support');
  return u.toString();
}