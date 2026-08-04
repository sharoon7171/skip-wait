export const GA_MEASUREMENT_ID = (process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID'] ?? '').trim();

const GA_ID_RE = /^G-[A-Z0-9]+$/i;

export type AddToChromePlacement = 'header' | 'hero' | 'bypass_detail';

export type CtaDestination = 'github' | 'telegram' | 'email';

const ADD_TO_CHROME_EVENT: Record<AddToChromePlacement, string> = {
  header: 'add_to_chrome_header',
  hero: 'add_to_chrome_hero',
  bypass_detail: 'add_to_chrome_bypass',
};

const CTA_EVENT: Record<CtaDestination, string> = {
  github: 'cta_github',
  telegram: 'cta_telegram',
  email: 'cta_email',
};

type GtagWindow = Window & {
  dataLayer?: object[];
  gtag?: (...args: unknown[]) => void;
};

export function isAnalyticsEnabled(): boolean {
  return GA_ID_RE.test(GA_MEASUREMENT_ID);
}

function ensureGtag(): (...args: unknown[]) => void {
  const win = window as GtagWindow;
  win.dataLayer = win.dataLayer ?? [];
  if (typeof win.gtag !== 'function') {
    win.gtag = function gtag() {
      win.dataLayer!.push(arguments as unknown as object);
    };
  }
  return win.gtag;
}

function trackEvent(name: string, params?: Record<string, string>): void {
  if (!isAnalyticsEnabled() || typeof window === 'undefined') return;
  const gtag = ensureGtag();
  if (params) gtag('event', name, params);
  else gtag('event', name);
}

export function trackAddToChrome(placement: AddToChromePlacement): void {
  trackEvent(ADD_TO_CHROME_EVENT[placement]);
}

export function trackChromeWebStoreFooter(): void {
  trackEvent('chrome_web_store_footer');
}

export function trackCtaClick(destination: CtaDestination): void {
  trackEvent(CTA_EVENT[destination]);
}

export function trackSearch(searchTerm: string): void {
  const term = searchTerm.trim();
  if (!term) return;
  trackEvent('search', { search_term: term });
}
