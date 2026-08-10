import { AROLINKS_GATE_VALUE } from './hosts';

function isBtn7Gate(): boolean {
  return document.getElementById('btn7') !== null;
}

export function isArticleGate(): boolean {
  return (
    isBtn7Gate() ||
    (document.getElementById('tp-snp2') !== null &&
      document.querySelector('a[href*="learn_more.php"]') !== null)
  );
}

export function continueEndpoint(): string | null {
  if (isBtn7Gate()) return new URL('/readmore/', location.origin).href;
  return document.querySelector<HTMLAnchorElement>('a[href*="learn_more.php"]')?.href ?? null;
}

export function seedGateCookies(): void {
  const html = document.documentElement.innerHTML;
  const names = new Set<string>();
  const marker = `=${AROLINKS_GATE_VALUE}`;
  for (const m of html.matchAll(/document\.cookie\s*=\s*["']([A-Za-z0-9_]+)=/g)) {
    const start = m.index ?? -1;
    if (start >= 0 && html.slice(start, start + m[0].length + marker.length).includes(marker)) {
      names.add(m[1]!);
    }
  }
  for (const m of html.matchAll(/cookie\.includes\(\s*["']([A-Za-z0-9_]+)=/g)) {
    names.add(m[1]!);
  }
  for (const name of names) {
    document.cookie = `${name}=${AROLINKS_GATE_VALUE}; path=/; max-age=7200; SameSite=Lax`;
  }
}

export function jsRedirect(html: string, base: string): string | null {
  const match = html.match(/(?:document|window)\.location(?:\.href)?\s*=\s*['"]([^'"]+)['"]/);
  const target = match?.[1];
  if (!target) return null;
  try {
    return new URL(target, base).href;
  } catch {
    return null;
  }
}

export function isUnlockShell(): boolean {
  return (
    document.querySelector('#gt-link') !== null &&
    document.querySelector('#go-link') !== null &&
    document.documentElement.innerHTML.includes('ad_form_data')
  );
}

export function gtLinkDestination(): string | null {
  const anchor = document.querySelector<HTMLAnchorElement>('#gt-link');
  if (!anchor) return null;
  const href = (anchor.getAttribute('href') || anchor.href).trim();
  return /^https?:\/\//i.test(href) ? href : null;
}
