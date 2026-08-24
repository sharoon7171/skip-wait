import { isHttpUrl } from './hosts';

export type ResolveProgress = { lead: string; detail: string; status: string };

type Session = {
  hasSession: true;
  sessionToken: string;
  stageId: number;
  stageNumber: number;
  totalStage: number;
};

const isSession = (j: unknown): j is Session => {
  if (!j || typeof j !== 'object') return false;
  const o = j as Record<string, unknown>;
  return (
    o['hasSession'] === true &&
    typeof o['sessionToken'] === 'string' &&
    !!o['sessionToken'] &&
    typeof o['stageId'] === 'number' &&
    typeof o['stageNumber'] === 'number' &&
    typeof o['totalStage'] === 'number' &&
    (o['totalStage'] as number) >= 1
  );
};

export const resolveDestination = async (
  unlockUrl: string,
  onProgress?: (p: ResolveProgress) => void,
): Promise<string> => {
  const say = (lead: string, detail: string, status: string): void => {
    onProgress?.({ lead, detail, status });
  };

  say('Hang tight — unlocking your link.', "Skip Wait is working. You don't need to tap anything.", 'Opening your short link');
  const gate = await fetch(unlockUrl, {
    credentials: 'include',
    cache: 'no-store',
    redirect: 'follow',
    headers: { Accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8' },
  });
  const stage = new URL(gate.url);
  if (stage.hostname === new URL(unlockUrl).hostname) throw new Error('gate');
  const origin = stage.origin;

  say('Skipping the wait pages.', 'Those ad steps stay in the background — nothing to click.', 'Starting your session');
  const sessRes = await fetch(`${origin}/api/session-info`, {
    credentials: 'include',
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });
  if (!sessRes.ok) throw new Error('session');
  const sessJson: unknown = await sessRes.json();
  if (!isSession(sessJson)) throw new Error('session');

  const { sessionToken, stageId, stageNumber, totalStage } = sessJson;
  for (let progress = stageNumber + 1; progress <= totalStage + 1; progress++) {
    const step = Math.min(progress, totalStage);
    say(
      `Unlocking step ${step} of ${totalStage}.`,
      "Skip Wait is advancing each step for you. You don't need to tap anything.",
      progress <= totalStage ? `Skipping step ${step} of ${totalStage}` : 'Fetching your destination',
    );
    const input = encodeURIComponent(
      JSON.stringify({ '0': { json: { token: sessionToken, progress, stageId } } }),
    );
    const body = (await (
      await fetch(`${origin}/api/trpc/linkSession.nextStage?batch=1&input=${input}`, {
        credentials: 'include',
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      })
    ).json()) as [{ result?: { data?: { json?: { destinationLink?: string | null } } } }];
    const link = body[0]?.result?.data?.json?.destinationLink;
    if (typeof link === 'string' && isHttpUrl(link)) {
      say('Almost there.', 'Opening your destination now.', 'Opening your link');
      return link;
    }
  }
  throw new Error('dest');
};
