import {
  parseLinkunlockerLockerConfig,
  type LinkunlockerLockerConfig,
  type LinkunlockerVerifyParams,
} from './detect';

export type UnlockProgress = {
  onStatus?: (text: string) => void;
};

type UnlockPost = {
  token?: string;
  snippet?: string;
  error?: string;
};

type VerifyPost = {
  success?: boolean;
  target?: string;
  error?: string;
  creatorError?: boolean;
};

export type LockerUnlockResult =
  | { kind: 'redirect'; url: string }
  | { kind: 'snippet'; text: string };

const asHttpUrl = (raw: unknown): string | null => {
  if (typeof raw !== 'string') return null;
  const href = raw.trim();
  if (!/^https?:\/\//i.test(href)) return null;
  return href;
};

const destinationFromDomain = (domain: string): string | null => {
  const host = domain.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');
  if (!host || /\s/.test(host)) return null;
  try {
    return new URL(`https://${host}/`).href;
  } catch {
    return null;
  }
};

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

async function waitForLockerConfig(
  progress: UnlockProgress,
): Promise<LinkunlockerLockerConfig> {
  for (let i = 0; i < 40; i++) {
    const config = parseLinkunlockerLockerConfig();
    if (config) return config;
    if (i === 0) progress.onStatus?.('Reading locker…');
    await sleep(100);
  }
  throw new Error('Locker destination not found on page.');
}

export async function unlockLinkunlockerLocker(
  progress: UnlockProgress = {},
): Promise<LockerUnlockResult> {
  const config = await waitForLockerConfig(progress);

  if (config.hasSnippet) {
    progress.onStatus?.('Unlocking your link…');
    const res = await fetch(`/api/unlock/${encodeURIComponent(config.slug)}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const body = (await res.json().catch(() => ({}))) as UnlockPost;
    if (!res.ok) throw new Error(body.error || `Unlock failed (${res.status}).`);
    const snippet = typeof body.snippet === 'string' ? body.snippet.trim() : '';
    if (snippet) return { kind: 'snippet', text: snippet };
  }

  const fromDomain = destinationFromDomain(config.destinationDomain);
  if (!fromDomain) throw new Error('Locker destination domain invalid.');
  progress.onStatus?.('Opening your link…');
  return { kind: 'redirect', url: fromDomain };
}

export async function unlockLinkunlockerVerify(
  params: LinkunlockerVerifyParams,
  progress: UnlockProgress = {},
): Promise<string> {
  progress.onStatus?.('Verifying destination…');
  const res = await fetch('/api/verify-linkvertise', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hash: params.hash,
      target: params.target,
      profileId: params.profileId,
    }),
  });
  const body = (await res.json().catch(() => ({}))) as VerifyPost;
  if (!res.ok || !body.success) {
    throw new Error(body.error || `Verify failed (${res.status}).`);
  }
  const dest = asHttpUrl(body.target);
  if (!dest) throw new Error('Verify target missing.');
  return dest;
}
