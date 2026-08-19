import { hostIsRemoteSite, remoteSiteHosts } from '../../hosts/check';
import { hostnameMatches } from '../../utils/domain-check';

export const SHORTX_AD_WAIT_MS = 25_000;

const ALIAS_RE = /^\/([A-Za-z0-9_-]+)\/?$/i;
const ADLINKFLY_RE = /[?&]adlinkfly=([^?&#]+)/i;
const HTTP_URL_RE = /https:\/\/[^\s"'<>]+/gi;

let shortxHosts: string[] = [];
let origin = '';
let onShortx = false;
let onMediator = false;

export async function bindShortxRemote(): Promise<boolean> {
  const [entry, mediator] = await Promise.all([
    remoteSiteHosts('shortxlinks'),
    remoteSiteHosts('shortxlinks-mediator'),
  ]);
  shortxHosts = entry;
  origin = entry[0] ? `https://${entry[0]}` : '';
  onShortx = hostnameMatches(location.hostname, entry);
  onMediator = hostnameMatches(location.hostname, mediator);
  return onShortx || onMediator;
}

export function shortxAliasFromPath(pathname: string): string | null {
  return ALIAS_RE.exec(pathname)?.[1] ?? null;
}

export function shortxAliasFromAdlinkfly(search: string): string | null {
  return ADLINKFLY_RE.exec(search)?.[1] ?? null;
}

export function shortxStartUrl(alias: string): string {
  return origin ? `${origin}/${alias}` : '';
}

export function shortxStartUrlFromText(text: string): string | null {
  if (!origin) return null;
  for (const raw of text.match(HTTP_URL_RE) ?? []) {
    try {
      const u = new URL(raw);
      if (!hostnameMatches(u.hostname, shortxHosts)) continue;
      const alias = shortxAliasFromPath(u.pathname);
      if (alias) return shortxStartUrl(alias);
    } catch {}
  }
  return null;
}

export function isShortxHost(): boolean {
  return onShortx;
}

export function isShortxMediatorHost(): boolean {
  return onMediator;
}

export async function isShortxTokenUrl(url: string): Promise<boolean> {
  try {
    const u = new URL(url);
    if (!(await hostIsRemoteSite(u.hostname, 'shortxlinks'))) return false;
    if (!shortxAliasFromPath(u.pathname)) return false;
    return u.search.length > 1;
  } catch {
    return false;
  }
}

export function isShortxTimerPage(): boolean {
  if (!isShortxHost() || !shortxAliasFromPath(location.pathname)) return false;
  if (document.title.includes('Too Early')) return true;
  if (location.search.length > 1) return true;
  return !!document.querySelector('#go-link, form[action*="/links/go"]');
}

export function isShortxMediatorPage(): boolean {
  if (shortxAliasFromAdlinkfly(location.search)) return true;
  if (!isShortxMediatorHost()) return false;
  return !!document.querySelector(
    'input[name="newwpsafelink"], input[name="go"], #wpsafelinkhuman, #wpsafelink-landing',
  );
}

export function isShortxPipelinePage(): boolean {
  return isShortxTimerPage() || isShortxMediatorPage();
}
