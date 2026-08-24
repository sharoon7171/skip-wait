export const SITE = 'sfl' as const;
export const BLOG_SITE = 'sfl-blog' as const;

export const MSG_RESOLVE = 'SFL_RESOLVE' as const;
export const MSG_PROGRESS = 'SFL_PROGRESS' as const;

export const ALIAS_DNR = '([A-Za-z0-9]*[A-Za-z][A-Za-z0-9]*)';

const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;

export type SflProgress = { lead: string; detail: string; status: string };

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
