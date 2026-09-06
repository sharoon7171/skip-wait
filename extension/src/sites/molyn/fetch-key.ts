import { FETCH_KEY_PATH } from './hosts';

export const fetchKey = async (): Promise<string | null> => {
  const res = await fetch(`${location.origin}${FETCH_KEY_PATH}`, {
    credentials: 'include',
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { key?: unknown };
  const key = typeof data.key === 'string' ? data.key.trim() : '';
  return key || null;
};
