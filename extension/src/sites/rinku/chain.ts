import { hostnameMatches } from '../../utils/domain-check';
import { RINKU_MAIN_HOSTS } from './hosts';

const CHAIN_KEY = 'sw-rinku-chain' as const;
const ALIAS_RE = /^[A-Za-z0-9_-]{3,}$/;

export type RinkuChain = {
  alias: string;
  origin: string;
};

function storageReady(): boolean {
  try {
    return Boolean(chrome.runtime?.id && chrome.storage?.local);
  } catch {
    return false;
  }
}

export function rinkuAliasFromPath(pathname: string): string | null {
  const [seg, ...rest] = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (!seg || rest.length > 0) return null;
  return ALIAS_RE.test(seg) ? seg : null;
}

export async function readRinkuChain(): Promise<RinkuChain | null> {
  if (!storageReady()) return null;
  try {
    const raw = (await chrome.storage.local.get(CHAIN_KEY))[CHAIN_KEY];
    if (!raw || typeof raw !== 'object') return null;
    const { alias, origin } = raw as Partial<RinkuChain>;
    if (typeof alias !== 'string' || !ALIAS_RE.test(alias)) return null;
    if (typeof origin !== 'string' || !/^https?:\/\//i.test(origin)) return null;
    return { alias, origin: origin.replace(/\/$/, '') };
  } catch {
    return null;
  }
}

export async function writeRinkuChain(alias: string, origin: string): Promise<RinkuChain> {
  const chain: RinkuChain = {
    alias,
    origin: origin.replace(/\/$/, ''),
  };
  if (storageReady()) {
    try {
      await chrome.storage.local.set({ [CHAIN_KEY]: chain });
    } catch {}
  }
  return chain;
}

export async function clearRinkuChain(): Promise<void> {
  if (!storageReady()) return;
  try {
    await chrome.storage.local.remove(CHAIN_KEY);
  } catch {}
}

export function isRinkuMainHost(hostname = location.hostname): boolean {
  return hostnameMatches(hostname, RINKU_MAIN_HOSTS);
}

export function isRinkuShortenerHref(href: string, alias: string): boolean {
  try {
    const { hostname, pathname } = new URL(href);
    if (!hostnameMatches(hostname, RINKU_MAIN_HOSTS)) return false;
    return rinkuAliasFromPath(pathname) === alias;
  } catch {
    return false;
  }
}
