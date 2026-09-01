const REPO_ISSUES_NEW = 'https://github.com/sharoon7171/skip-wait-bypass-timers-countdowns/issues/new';

export const CHROME_WEB_STORE_LISTING_URL =
  'https://chromewebstore.google.com/detail/hdoecnlghjglmnjpnhaaeofcgocdgkhd';

const WEBSITE_URL = 'https://skip-wait-website.vercel.app';

export const SUPPORTED_SITES_URL = `${WEBSITE_URL}/sites`;

export const EAS_STORE_URL =
  'https://eas-x.com/products/skip-wait-bypass-timers-countdowns-chrome-extension-license';

export const PRICE_LABEL = '$1.50 / month';

export const LICENSE_COPY = {
  buyHeading: 'Unlock bypass',
  buyAfterPurchase: 'Paste your EAS key',
  buyWhy: 'Pick a plan, grab your key, activate below.',
  buyDevice: 'One key per device',
  storeTrial: 'Free trial',
  storeTrialPrice: '$0',
  storeTrialHint: '30 minutes',
  storeMonthly: 'Monthly',
  storeMonthlyPrice: '$1.50',
  storeMonthlyHint: 'per month',
  activeHeading: 'Bypass active',
  expires: (when: string): string => `Expires ${when}`,
  lifetime: 'Lifetime',
  statusActive: 'Active',
  keyLabel: 'Key',
  idLabel: 'Activation',
  remove: 'Remove license',
  activate: 'Activate bypass',
  activating: 'Activating…',
  missing: 'Needs license',
  expiredStatus: 'Expired',
} as const;

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