const CHAIN_KEY = 'sw-jobsheel-chain' as const;
const ALIAS_RE = /^(?=.*[A-Za-z])[A-Za-z0-9]{3,16}$/;

export type JobsheelChain = {
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

function isJobsheelChain(raw: unknown): raw is JobsheelChain {
  if (!raw || typeof raw !== 'object') return false;
  const { alias, origin } = raw as Record<string, unknown>;
  return (
    typeof alias === 'string' &&
    ALIAS_RE.test(alias) &&
    typeof origin === 'string' &&
    /^https?:\/\//i.test(origin)
  );
}

export function jobsheelBabyAlias(pathname: string, search: string): string | null {
  if (!/\/baby\.php$/i.test(pathname)) return null;
  const links = new URLSearchParams(search).get('links')?.trim();
  return links && ALIAS_RE.test(links) ? links : null;
}

export async function readJobsheelChain(): Promise<JobsheelChain | null> {
  if (!storageReady()) return null;
  try {
    const raw: unknown = (await chrome.storage.local.get(CHAIN_KEY))[CHAIN_KEY];
    if (!isJobsheelChain(raw)) return null;
    return { alias: raw.alias, origin: raw.origin.replace(/\/$/, '') };
  } catch {
    return null;
  }
}

export async function writeJobsheelChain(alias: string, origin: string): Promise<JobsheelChain> {
  const chain: JobsheelChain = { alias, origin: origin.replace(/\/$/, '') };
  if (storageReady()) {
    try {
      await chrome.storage.local.set({ [CHAIN_KEY]: chain });
    } catch {}
  }
  return chain;
}

export async function clearJobsheelChain(): Promise<void> {
  if (!storageReady()) return;
  try {
    await chrome.storage.local.remove(CHAIN_KEY);
  } catch {}
}
