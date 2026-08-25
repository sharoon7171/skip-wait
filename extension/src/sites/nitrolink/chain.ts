import { canBypassHost } from '../../gate';
import { siteHosts } from '../../hosts/check';

const CHAIN_KEY = 'sw-nitrolink-chain' as const;
const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;

export type NitrolinkChain = {
  alias: string;
  origin: string;
  startedAt: number;
};

const storageReady = (): boolean => {
  try {
    return Boolean(chrome?.runtime?.id && chrome.storage?.local);
  } catch {
    return false;
  }
};

export function nitrolinkAliasFromPath(pathname: string): string | null {
  const parts = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (parts.length !== 1) return null;
  const seg = parts[0]!;
  return ALIAS_RE.test(seg) ? seg : null;
}

export function nitrolinkAliasFromSearch(search: string): string | null {
  try {
    const alias = new URLSearchParams(search).get('alias');
    if (alias && ALIAS_RE.test(alias)) return alias;
  } catch {}
  return null;
}

export async function readNitrolinkChain(): Promise<NitrolinkChain | null> {
  if (!storageReady()) return null;
  try {
    const data = await chrome.storage.local.get(CHAIN_KEY);
    const raw = data[CHAIN_KEY] as Partial<NitrolinkChain> | undefined;
    if (!raw || typeof raw !== 'object') return null;
    if (typeof raw.alias !== 'string' || !ALIAS_RE.test(raw.alias)) return null;
    if (typeof raw.origin !== 'string' || !/^https?:\/\//i.test(raw.origin)) return null;
    if (typeof raw.startedAt !== 'number' || raw.startedAt <= 0) return null;
    return { alias: raw.alias, origin: raw.origin.replace(/\/$/, ''), startedAt: raw.startedAt };
  } catch {
    return null;
  }
}

export async function ensureNitrolinkChain(alias: string, origin: string): Promise<NitrolinkChain> {
  const normalized = origin.replace(/\/$/, '');
  const existing = await readNitrolinkChain();
  if (existing && existing.alias === alias && existing.origin === normalized) {
    return existing;
  }
  const chain: NitrolinkChain = { alias, origin: normalized, startedAt: Date.now() };
  if (!storageReady()) return chain;
  try {
    await chrome.storage.local.set({ [CHAIN_KEY]: chain });
  } catch {}
  return chain;
}

export async function clearNitrolinkChain(): Promise<void> {
  if (!storageReady()) return;
  try {
    await chrome.storage.local.remove(CHAIN_KEY);
  } catch {}
}

export async function nitrolinkOrigin(): Promise<string> {
  const hosts = await siteHosts('nitrolink');
  return hosts[0] ? `https://${hosts[0]}` : '';
}

export function shortenerUrl(chain: NitrolinkChain): string {
  return `${chain.origin}/${chain.alias}`;
}

export async function isNitrolinkShortenerHref(href: string): Promise<boolean> {
  try {
    const u = new URL(href);
    return (await canBypassHost(u.hostname, 'nitrolink')) && nitrolinkAliasFromPath(u.pathname) !== null;
  } catch {
    return false;
  }
}
