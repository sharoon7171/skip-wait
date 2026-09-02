export const EAS_STORE_URL =
  'https://eas-x.com/products/skip-wait-bypass-timers-countdowns-chrome-extension-license';

export const EAS_API_URL = 'https://eas-x.com/api/v1/licenses';

export const PRICE = {
  amount: '1.50',
  currency: 'USD',
  period: 'month',
  display: '$1.50',
  summary: '$1.50 per month',
} as const;

export const FREE = {
  dailyLimit: 5,
} as const;

export const LICENSE = {
  trialLabel: 'Free trial',
  trialDetail: 'Free',
  trialHint: '30 minutes',
  monthlyDetail: '$1.50 / month',
  deviceLimit: 'One key per device.',
  keyExample: 'EAS-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
  pricingLine: `30-minute trial and ${PRICE.summary} on EAS Store. ${FREE.dailyLimit} free bypasses per day with no key after Chrome install`,
  faqAnswer: `No. After you install, you get ${FREE.dailyLimit} free bypasses each day with no key. For unlimited use, get a 30-minute trial or a monthly license on EAS Store and activate the key in the popup.`,
} as const;

export const SITE = {
  name: 'Skip Wait',
  url: 'https://skip-wait-website.vercel.app',
  tagline:
    'Skip wait, bypass timers, and countdown bypass for URL shorteners. If a site still asks you to wait or click Continue, Skip Wait does that for you.',
  title: 'Skip Wait — Bypass Timers, Countdowns & URL Shorteners (Chrome)',
  description: `Skip wait, bypass timers, and countdown bypass for URL shorteners in Chrome. ${FREE.dailyLimit} free bypasses a day. If a page still needs Continue, Skip Wait clicks it. FastForward and Universal Bypass alternative.`,
  keywords: [
    'skip wait',
    'skip wait extension',
    'skip wait chrome extension',
    'bypass timers',
    'countdown bypass',
    'bypass url shorteners',
    'bypass url shortners',
    'fastforward',
    'fastforward alternative',
    'fast forward extension',
    'universal bypass',
    'universal bypass alternative',
    'universal bypass chrome',
    'link shortener bypass',
    'link shortener bypass chrome',
    'bypass link shortener',
    'skip countdown timer',
    'bypass countdown timer',
    'countdown timer bypass',
    'countdown bypass chrome extension',
    'skip waiting page',
    'waiting page skip',
    'please wait skip',
    'skip please wait',
    'download timer skip',
    'skip download timer',
    'file host countdown bypass',
    'safelink bypass',
    'ad link bypass',
    'adfly bypass',
    'skip click to continue',
    'automate countdown',
    'automate waiting page',
    'timer skip extension',
    'bypass short link',
  ],
} as const;

export const CHROME_WEB_STORE_URL =
  'https://chromewebstore.google.com/detail/hdoecnlghjglmnjpnhaaeofcgocdgkhd';

export const QUETTA = {
  playStore: 'https://play.google.com/store/apps/details?id=net.quetta.browser',
  installGuide: 'https://www.quetta.net/blog/how-to-use-browser-extensions-on-android-phone',
} as const;

export const REQUEST_SUPPORT_URL =
  'https://github.com/sharoon7171/skip-wait-bypass-timers-countdowns/issues/new?template=request_support.yml&labels=request-support';

export const CONTACT = {
  email: 'sharoon7171@gmail.com',
  telegram: 'https://t.me/sharoon1998',
  github: 'https://github.com/sharoon7171/skip-wait-bypass-timers-countdowns',
} as const;

export const DEVELOPER = {
  name: 'Sharoon',
  url: 'https://github.com/sharoon7171',
} as const;
