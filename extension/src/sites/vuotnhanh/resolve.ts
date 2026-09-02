import { csrfToken, isHttpUrl, trafficDest } from './hosts';

export type ResolveProgress = { lead: string; detail: string; status: string };

type GoSf = { status?: unknown; url_redirect?: unknown };

export const resolveDestination = async (
  alias: string,
  onProgress?: (p: ResolveProgress) => void,
): Promise<string> => {
  const fallback = trafficDest(location.href);
  if (fallback) {
    onProgress?.({
      lead: 'Almost there.',
      detail: 'Opening your destination now.',
      status: 'Opening your link',
    });
    return fallback;
  }

  onProgress?.({
    lead: 'Hang tight — unlocking your link.',
    detail: 'Skip Wait is skipping VuotNhanh waits for you.',
    status: 'Requesting unlock',
  });

  const csrf = csrfToken();
  if (!csrf) throw new Error('csrf');

  const res = await fetch(`${location.origin}/go/sf`, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRF-TOKEN': csrf,
    },
    body: new URLSearchParams({ alias }),
  });
  if (!res.ok) throw new Error('http');

  const json = (await res.json()) as GoSf;
  const goTo = typeof json.url_redirect === 'string' ? json.url_redirect.trim() : '';
  if (json.status !== 'success' || !isHttpUrl(goTo)) throw new Error('sf');

  onProgress?.({
    lead: 'Almost there.',
    detail: 'Opening your destination now.',
    status: 'Opening your link',
  });
  return goTo;
};
