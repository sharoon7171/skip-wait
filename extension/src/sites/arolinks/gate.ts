import { AROLINKS_GATE_COOKIE_NAMES, AROLINKS_GATE_VALUE } from './hosts';

const isBtn7 = (): boolean => document.getElementById('btn7') !== null;

export const isArticleGate = (): boolean =>
  isBtn7() ||
  (document.getElementById('tp-snp2') !== null &&
    document.querySelector('a[href*="learn_more.php"]') !== null);

export const continueEndpoint = (): string | null => {
  if (isBtn7()) return new URL('/readmore/', location.origin).href;
  return document.querySelector<HTMLAnchorElement>('a[href*="learn_more.php"]')?.href ?? null;
};

export const seedGateCookies = (): void => {
  for (const name of AROLINKS_GATE_COOKIE_NAMES) {
    document.cookie = `${name}=${AROLINKS_GATE_VALUE}; path=/; max-age=7200; SameSite=Lax`;
  }
};

export const jsRedirect = (html: string, base: string): string | null => {
  const target = html.match(/(?:document|window)\.location(?:\.href)?\s*=\s*['"]([^'"]+)['"]/)?.[1];
  if (!target) return null;
  try {
    return new URL(target, base).href;
  } catch {
    return null;
  }
};

export const isUnlockPage = (): boolean =>
  document.getElementById('countdown') !== null ||
  document.getElementById('get-link') !== null ||
  document.getElementById('gt-link') !== null ||
  document.getElementById('go-link') !== null;

export const gtLinkDestination = (): string | null => {
  const a = document.querySelector<HTMLAnchorElement>('#gt-link');
  const href = (a?.getAttribute('href') || '').trim();
  if (/^https?:\/\//i.test(href)) return href;
  const html = document.documentElement.innerHTML;
  return (
    html.match(/id=["']gt-link["'][^>]*href=["'](https?:[^"']+)/i)?.[1] ??
    html.match(/href=["'](https?:[^"']+)["'][^>]*id=["']gt-link["']/i)?.[1] ??
    null
  );
};
