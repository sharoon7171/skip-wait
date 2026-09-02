import { API_ORIGIN, apiOrigin, isHttpUrl } from './hosts';

export type ResolveProgress = { lead: string; detail: string; status: string };

type FetchPayload = {
  status?: unknown;
  data?: {
    data?: {
      info?: { userId?: unknown };
      lnk?: Record<string, { url?: unknown }>;
      aApi?: { userId?: unknown[]; lAPI?: unknown[] };
    };
  };
};

const decode = (s: string): string => {
  try {
    return decodeURIComponent(atob(s));
  } catch {
    return s;
  }
};

const pickDest = (payload: FetchPayload): string | null => {
  const data = payload.data?.data;
  const entries = data?.lnk ? Object.values(data.lnk) : [];
  const raw = typeof entries[0]?.url === 'string' ? entries[0].url.trim() : '';
  if (!raw) return null;

  const url = isHttpUrl(raw) ? raw : decode(raw);
  if (!isHttpUrl(url)) return null;

  const userId = Number(data?.info?.userId);
  const ids = Array.isArray(data?.aApi?.userId) ? data.aApi.userId : [];
  const apis = (data?.aApi?.lAPI ?? []).filter((v): v is string => typeof v === 'string' && v.length > 0);
  if (Number.isFinite(userId) && ids.includes(userId) && apis.length) {
    return `${apis[Math.floor(Math.random() * apis.length)]!}${url}`;
  }
  return url;
};

export const resolveDestination = async (
  alias: string,
  onProgress?: (p: ResolveProgress) => void,
): Promise<string> => {
  onProgress?.({
    lead: 'Hang tight — unlocking your link.',
    detail: 'Skip Wait is skipping Link4Sub waits for you.',
    status: 'Fetching link data',
  });

  const lang = (navigator.language || 'en').split('-')[0] || 'en';
  const origin = apiOrigin() || API_ORIGIN;
  const res = await fetch(
    `${origin}/api/${encodeURIComponent(alias)}/fetch-data?lang=${encodeURIComponent(lang)}`,
    { credentials: 'omit', cache: 'no-store', headers: { Accept: 'application/json' } },
  );
  if (!res.ok) throw new Error('http');

  const json = (await res.json()) as FetchPayload;
  if (json.status !== 'success') throw new Error('status');

  const dest = pickDest(json);
  if (!dest) throw new Error('dest');

  onProgress?.({
    lead: 'Almost there.',
    detail: 'Opening your destination now.',
    status: 'Opening your link',
  });
  return dest;
};
