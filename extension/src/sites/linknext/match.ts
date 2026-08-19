import { hostIsRemoteSite } from '../../hosts/check';

export type LinknextPhase = 'alias' | 'mediator' | 'blog' | 'tk';

const SSID_RE = /[a-f0-9]{32}/;
const LINKNEXT_STATIC_PATH =
  /^\/(?:pages|auth|payout-rates|sitemap|api|links|blue_theme|js|img|cdn-cgi)(?:\/|$)/i;
const LINKNEXT_ALIAS_PATH = /^\/[A-Za-z0-9_-]{2,}\/?$/;
const BLOG_STATIC_PATH = /^\/(?:api|cdn-cgi)(?:\/|$)/i;

const parseUrl = (href: string): URL | null => {
  try {
    return new URL(href);
  } catch {
    return null;
  }
};

const isLinknextAliasPath = (pathname: string): boolean =>
  !LINKNEXT_STATIC_PATH.test(pathname) && LINKNEXT_ALIAS_PATH.test(pathname);

export async function isLinknextHost(href = location.href): Promise<boolean> {
  const u = parseUrl(href);
  return u ? hostIsRemoteSite(u.hostname, 'linknext') : false;
}

export async function isLinknextMediatorPage(href = location.href): Promise<boolean> {
  const u = parseUrl(href);
  if (!u || !(await hostIsRemoteSite(u.hostname, 'linknext-mediator'))) return false;
  const ssid = u.searchParams.get('ssid');
  return !!ssid && SSID_RE.test(ssid);
}

export async function isProfitsflyBlogPage(href = location.href): Promise<boolean> {
  const u = parseUrl(href);
  if (!u || !(await hostIsRemoteSite(u.hostname, 'linknext-blog'))) return false;
  const h = u.hostname.toLowerCase();
  if (h.startsWith('www.')) return false;
  if (!h.split('.').slice(0, -2).join('.')) return false;
  return !BLOG_STATIC_PATH.test(u.pathname);
}

export async function linknextPhase(href = location.href): Promise<LinknextPhase | null> {
  const u = parseUrl(href);
  if (!u) return null;
  if (await hostIsRemoteSite(u.hostname, 'linknext')) {
    if (u.searchParams.has('tk')) return 'tk';
    if (isLinknextAliasPath(u.pathname)) return 'alias';
    return null;
  }
  if (await isProfitsflyBlogPage(href)) return 'blog';
  if (await isLinknextMediatorPage(href)) return 'mediator';
  return null;
}

export async function isLinknextPipelinePage(): Promise<boolean> {
  return (await linknextPhase()) !== null;
}
