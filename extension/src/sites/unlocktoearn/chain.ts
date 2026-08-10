import { UNLOCKTOEARN_HOSTS } from './hosts';

const CHAIN_KEY = 'sw-unlocktoearn-chain' as const;
const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{4,12}$/;

export type UnlocktoearnChain = {
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

function isUnlocktoearnChain(raw: unknown): raw is UnlocktoearnChain {
  if (!raw || typeof raw !== 'object') return false;
  const { alias, origin } = raw as Record<string, unknown>;
  return (
    typeof alias === 'string' &&
    ALIAS_RE.test(alias) &&
    typeof origin === 'string' &&
    /^https?:\/\//i.test(origin)
  );
}

export function unlocktoearnAliasValid(alias: string): boolean {
  return ALIAS_RE.test(alias);
}

export function unlocktoearnAliasFromPath(pathname: string): string | null {
  const [seg, ...rest] = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (!seg || rest.length > 0) return null;
  return ALIAS_RE.test(seg) ? seg : null;
}

export function unlocktoearnDefaultOrigin(): string {
  return `https://${UNLOCKTOEARN_HOSTS[0]}`;
}

export async function readUnlocktoearnChain(): Promise<UnlocktoearnChain | null> {
  if (!storageReady()) return null;
  try {
    const raw: unknown = (await chrome.storage.local.get(CHAIN_KEY))[CHAIN_KEY];
    if (!isUnlocktoearnChain(raw)) return null;
    return { alias: raw.alias, origin: raw.origin.replace(/\/$/, '') };
  } catch {
    return null;
  }
}

export async function writeUnlocktoearnChain(
  alias: string,
  origin: string,
): Promise<UnlocktoearnChain> {
  const chain: UnlocktoearnChain = {
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

export async function clearUnlocktoearnChain(): Promise<void> {
  if (!storageReady()) return;
  try {
    await chrome.storage.local.remove(CHAIN_KEY);
  } catch {}
}
