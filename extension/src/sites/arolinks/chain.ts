import { AROLINKS_HOSTS, AROLINKS_UNLOCK_READY_MS } from './hosts';

const CHAIN_KEY = 'sw-arolinks-chain' as const;
const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/;

export type ArolinksChain = {
  alias: string;
  origin: string;
  startedAt: number;
};

function storageReady(): boolean {
  try {
    return Boolean(chrome.runtime?.id && chrome.storage?.local);
  } catch {
    return false;
  }
}

export function arolinksAliasFromPath(pathname: string): string | null {
  const [seg, ...rest] = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (!seg || rest.length > 0) return null;
  return ALIAS_RE.test(seg) ? seg : null;
}

export async function readArolinksChain(): Promise<ArolinksChain | null> {
  if (!storageReady()) return null;
  try {
    const raw = (await chrome.storage.local.get(CHAIN_KEY))[CHAIN_KEY];
    if (!raw || typeof raw !== 'object') return null;
    const { alias, origin, startedAt } = raw as Partial<ArolinksChain>;
    if (typeof alias !== 'string' || !ALIAS_RE.test(alias)) return null;
    if (typeof origin !== 'string' || !/^https?:\/\//i.test(origin)) return null;
    if (typeof startedAt !== 'number' || startedAt <= 0) return null;
    return { alias, origin: origin.replace(/\/$/, ''), startedAt };
  } catch {
    return null;
  }
}

export async function writeArolinksChain(alias: string, origin: string): Promise<ArolinksChain> {
  const chain: ArolinksChain = {
    alias,
    origin: origin.replace(/\/$/, ''),
    startedAt: Date.now(),
  };
  if (storageReady()) {
    try {
      await chrome.storage.local.set({ [CHAIN_KEY]: chain });
    } catch {}
  }
  return chain;
}

export async function clearArolinksChain(): Promise<void> {
  if (!storageReady()) return;
  try {
    await chrome.storage.local.remove(CHAIN_KEY);
  } catch {}
}

export function msUntilUnlockReady(chain: ArolinksChain): number {
  return Math.max(0, chain.startedAt + AROLINKS_UNLOCK_READY_MS - Date.now());
}

export function shortenerUrl(chain: ArolinksChain): string {
  return `${chain.origin}/${chain.alias}`;
}

export function isArolinksShortenerHref(href: string, alias: string): boolean {
  try {
    const { hostname, pathname } = new URL(href);
    const host = hostname.toLowerCase();
    if (!AROLINKS_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))) return false;
    return arolinksAliasFromPath(pathname) === alias;
  } catch {
    return false;
  }
}
