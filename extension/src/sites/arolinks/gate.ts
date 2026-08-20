export const pleaseWaitTarget = (html: string, base: string): string | null => {
  const target = html.match(/(?:document|window)\.location(?:\.href)?\s*=\s*['"]([^'"]+)['"]/)?.[1];
  const href = target ?? html.match(/<a\s[^>]*href=["'](https?:[^"']+)["']/i)?.[1];
  if (!href) return null;
  try {
    const next = new URL(href, base);
    return next.origin === new URL(base).origin ? null : next.href;
  } catch {
    return null;
  }
};

export const isVpnPage = (): boolean =>
  /vpn detected|disable vpn|using a vpn or proxy|turn off\/?\s*disable vpn/i.test(
    document.body?.innerText ?? document.documentElement.innerHTML,
  );

const offsiteHttp = (href: string | null | undefined): string | null => {
  const v = (href || '').trim();
  if (!/^https?:\/\//i.test(v)) return null;
  try {
    const next = new URL(v, location.href);
    return next.origin === location.origin ? null : next.href;
  } catch {
    return null;
  }
};

const DEST_IDS = ['gt-link', 'link1s', 'get-link'] as const;

export const unlockDestination = (): string | null => {
  for (const id of DEST_IDS) {
    const el = document.getElementById(id);
    if (el instanceof HTMLAnchorElement) {
      const href = offsiteHttp(el.getAttribute('href')) ?? offsiteHttp(el.href);
      if (href) return href;
    }
  }
  const html = document.documentElement.innerHTML;
  for (const id of DEST_IDS) {
    const href =
      offsiteHttp(html.match(new RegExp(`id=["']${id}["'][^>]*href=["'](https?:[^"']+)["']`, 'i'))?.[1]) ??
      offsiteHttp(html.match(new RegExp(`href=["'](https?:[^"']+)["'][^>]*id=["']${id}["']`, 'i'))?.[1]);
    if (href) return href;
  }
  return null;
};
