import { sendGAEvent } from '@next/third-parties/google';

export const GA_MEASUREMENT_ID = (process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID'] ?? '').trim();

const GA_ID_RE = /^G-[A-Z0-9]+$/i;

export type ChromeWebStorePlacement = 'hero' | 'header' | 'footer' | 'bypass_detail';

export type OutboundDestination = 'telegram' | 'email' | 'github' | 'request_support';

export function isAnalyticsEnabled(): boolean {
  return GA_ID_RE.test(GA_MEASUREMENT_ID);
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (!isAnalyticsEnabled()) return;
  if (params) {
    sendGAEvent('event', name, params);
    return;
  }
  sendGAEvent('event', name);
}

export function trackChromeWebStoreClick(placement: ChromeWebStorePlacement): void {
  trackEvent('chrome_web_store_click', { placement });
}

export function trackOutboundClick(destination: OutboundDestination): void {
  trackEvent('outbound_click', { destination });
}
