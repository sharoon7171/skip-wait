const REPO_ISSUES_NEW = 'https://github.com/sharoon7171/skip-wait-bypass-timers-countdowns/issues/new';

export const CHROME_WEB_STORE_LISTING_URL =
  'https://chromewebstore.google.com/detail/hdoecnlghjglmnjpnhaaeofcgocdgkhd';

const WEBSITE_URL = 'https://skip-wait-website.vercel.app';

export const SUPPORTED_SITES_URL = `${WEBSITE_URL}/sites`;

export const EAS_STORE_URL =
  'https://eas-x.com/products/skip-wait-bypass-timers-countdowns-chrome-extension-license';

export const PRICE_LABEL = '$1.50 / month';

export const LICENSE_COPY = {
  buyHeading: 'Get a license',
  buyTrialTitle: 'Free trial',
  buyTrialDetail: '30 minutes · $0',
  buyMonthlyTitle: 'Monthly',
  buyMonthlyDetail: '$1.50 / month',
  buyAfterPurchase: 'Copy your key from EAS Store, paste it here, then tap Activate.',
  buyWhy:
    'The trial is free so you can see if Skip Wait helps. If you keep it, $1.50/month helps me fix bypasses when sites change and add new ones.',
  buyDevice: 'One key per device.',
  buyButton: 'Buy now',
  activeHeading: 'Your license',
  activeLead: "You're all set — bypass is working on this device.",
  expiredLead: 'Your license ended. Grab a new trial or monthly plan on EAS Store.',
  renewButton: 'Buy now',
  planTrial: 'Free trial',
  planMonthly: 'Monthly',
  validUntil: (when: string): string => `Valid until ${when}`,
  noEndDate: 'No end date',
  statusActive: 'Active',
  keyLabel: 'License key',
  idLabel: 'Activation ID',
  remove: 'Remove license',
  activate: 'Activate',
  activating: 'Activating…',
  missing: 'You need a license to use bypass.',
  expiredStatus: 'License ended.',
} as const;

export const PANEL_CARD =
  'overflow-hidden rounded-card bg-surface-canvas px-4 py-3 shadow-[0_10px_28px_-12px_oklch(0.2_0.015_264/0.45)] ring-1 ring-neutral-200';

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