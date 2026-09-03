export type ClaimProvider = 'lootlabs' | 'linkvertise' | 'platoboost' | string;

export type ClaimCurrent = {
  ok?: boolean;
  provider?: ClaimProvider;
  status?: 'pending' | 'completed' | 'expired' | string;
  key?: string;
  tier?: string;
  licenseExpiresAt?: number;
  verificationUrl?: string;
  expiresAt?: number;
  keyAlreadyDelivered?: boolean;
  error?: string;
};

export type ClaimCreate = ClaimCurrent & {
  product?: string;
  statusUrl?: string;
};

const json = async <T>(resp: Response): Promise<T> => (await resp.json()) as T;

export const fetchCurrentClaim = async (): Promise<ClaimCurrent | null> => {
  const resp = await fetch('/api/claims/current', { cache: 'no-store' });
  if (resp.status === 404) return null;
  if (!resp.ok) throw new Error('claim status');
  return json<ClaimCurrent>(resp);
};

export const createClaim = async (): Promise<ClaimCreate> => {
  const resp = await fetch('/api/claims', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider: 'lootlabs' }),
  });
  const body = await json<ClaimCreate & { error?: string }>(resp);
  if (!resp.ok) throw new Error(body.error ?? 'claim create');
  return body;
};

export const resetClaim = async (): Promise<void> => {
  const resp = await fetch('/api/claims/current', {
    method: 'DELETE',
    headers: { 'x-cloverhub-claim-action': '1' },
  });
  if (!resp.ok) throw new Error('claim reset');
};
