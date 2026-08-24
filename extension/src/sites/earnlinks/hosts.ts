export const SITE = 'earnlinks' as const;

export const MSG_RESOLVE = 'EARNLINKS_RESOLVE' as const;
export const MSG_PROGRESS = 'EARNLINKS_PROGRESS' as const;

export type EarnlinksProgress = { lead: string; detail: string; status: string };

export const ALIAS_DNR = '([A-Za-z0-9]*[A-Za-z][A-Za-z0-9]*)';

const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;

export const isWorkingPage = (): boolean =>
  location.href.startsWith(chrome.runtime.getURL('working.html'));

export const isHttpUrl = (href: string): boolean => /^https?:\/\//i.test(href);

export const isShortUrl = (href: string): boolean => {
  try {
    const u = new URL(href);
    if (!isHttpUrl(u.href)) return false;
    const [seg, ...rest] = u.pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
    return !!seg && rest.length === 0 && ALIAS_RE.test(seg);
  } catch {
    return false;
  }
};
