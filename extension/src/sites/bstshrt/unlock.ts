import { bstlarLinkActionId, type BstshrtLockerConfig } from './detect';
import { bstshrtLegacyPath } from './hosts';

export type UnlockProgress = {
  onStatus?: (text: string) => void;
};

type SessionPayload = {
  sessionToken?: string;
  skipRewardAdDueToCap?: boolean;
  requiredAdViews?: number;
};

type JsonRecord = Record<string, unknown>;

type LegacyTask = {
  link_task_id?: number;
  link_id?: number;
  task_id?: number;
  completed?: boolean;
};

type LegacyLinkPayload = {
  id?: number;
  completed?: boolean;
  redirect_url?: string;
  destination_url?: string;
  interactive_tasks?: LegacyTask[];
  message?: string;
};

const apiUrl = (slug: string, leaf: string): string =>
  `/api/u/${encodeURIComponent(slug)}/${leaf}`;

async function postJson(
  url: string,
  body?: JsonRecord,
): Promise<{ ok: boolean; status: number; data: JsonRecord }> {
  const init: RequestInit = {
    method: 'POST',
    credentials: 'include',
  };
  if (body) {
    init.headers = { 'Content-Type': 'application/json' };
    init.body = JSON.stringify(body);
  }
  const res = await fetch(url, init);
  const data = (await res.json().catch(() => ({}))) as JsonRecord;
  return { ok: res.ok, status: res.status, data };
}

async function pierceRewardApis(config: BstshrtLockerConfig): Promise<void> {
  const { slug } = config;
  void fetch(apiUrl(slug, 'view'), { method: 'POST', keepalive: true, credentials: 'include' }).catch(
    () => {},
  );

  if (!(config.rewardsEnabled && config.fromDb)) {
    await postJson(apiUrl(slug, 'unlock'), {});
    return;
  }

  const session = await postJson(apiUrl(slug, 'locker-session'));
  if (!session.ok) return;
  const payload = session.data as SessionPayload;
  const sessionToken = payload.sessionToken;
  if (typeof sessionToken !== 'string' || !sessionToken) return;

  if (!payload.skipRewardAdDueToCap) {
    const required =
      typeof payload.requiredAdViews === 'number' &&
      Number.isFinite(payload.requiredAdViews) &&
      payload.requiredAdViews >= 1
        ? Math.floor(payload.requiredAdViews)
        : 2;
    for (let i = 0; i < required; i++) {
      const view = await postJson(apiUrl(slug, 'reward-ad-view'), { sessionToken });
      if (!view.ok) return;
    }
    await postJson(apiUrl(slug, 'reward-complete'), { sessionToken });
  }

  await postJson(apiUrl(slug, 'unlock'), { sessionToken });
}

export async function unlockBstshrtDestination(
  config: BstshrtLockerConfig,
  progress: UnlockProgress = {},
): Promise<string> {
  progress.onStatus?.('Opening your link…');
  void pierceRewardApis(config).catch(() => {});
  return config.finalUrl;
}

const xsrfToken = (): string | null => {
  const row = document.cookie.split('; ').find((c) => c.startsWith('XSRF-TOKEN='));
  if (!row) return null;
  return decodeURIComponent(row.slice('XSRF-TOKEN='.length));
};

const legacyHeaders = (jsonBody: boolean): HeadersInit => {
  const headers: Record<string, string> = {
    Accept: 'application/json, text/plain, */*',
    'X-Requested-With': 'XMLHttpRequest',
  };
  if (jsonBody) headers['Content-Type'] = 'application/json';
  const xsrf = xsrfToken();
  if (xsrf) headers['X-XSRF-TOKEN'] = xsrf;
  return headers;
};

const asHttpUrl = (raw: unknown): string | null => {
  if (typeof raw !== 'string') return null;
  const href = raw.trim();
  if (!/^https?:\/\//i.test(href)) return null;
  return href;
};

export async function unlockBstlarLegacyDestination(
  progress: UnlockProgress = {},
): Promise<string> {
  const path = bstshrtLegacyPath();
  const actionId = bstlarLinkActionId();
  if (!path) throw new Error('Legacy shortlink path not found.');
  if (!actionId) throw new Error('link_action_id missing on page.');

  progress.onStatus?.('Reading shortlink…');
  const linkRes = await fetch(
    `/api/link?url=${encodeURIComponent(path)}&link_action_id=${encodeURIComponent(actionId)}`,
    { credentials: 'include', headers: legacyHeaders(false) },
  );
  const link = (await linkRes.json().catch(() => ({}))) as LegacyLinkPayload;
  if (linkRes.status === 412) {
    throw new Error(link.message || 'Please refresh page and try again.');
  }
  if (linkRes.status === 429) throw new Error('Too many requests. Wait a minute, then refresh.');
  if (!linkRes.ok) throw new Error(link.message || `Legacy link API failed (${linkRes.status}).`);

  const ready = asHttpUrl(link.redirect_url) || asHttpUrl(link.destination_url);
  if (link.completed && ready) return ready;

  const linkId = link.id;
  if (typeof linkId !== 'number') throw new Error('Legacy link id missing.');

  progress.onStatus?.('Completing tasks…');
  for (const task of link.interactive_tasks ?? []) {
    if (task.completed) continue;
    if (
      typeof task.link_task_id !== 'number' ||
      typeof task.link_id !== 'number' ||
      typeof task.task_id !== 'number'
    ) {
      continue;
    }
    const taskRes = await fetch('/api/link-task-completed', {
      method: 'POST',
      credentials: 'include',
      headers: legacyHeaders(true),
      body: JSON.stringify({
        link_task_id: task.link_task_id,
        link_id: task.link_id,
        task_id: task.task_id,
        link_action_id: Number(actionId),
      }),
    });
    if (taskRes.status === 429) throw new Error('Too many requests. Wait a minute, then refresh.');
    if (!taskRes.ok) {
      const body = (await taskRes.json().catch(() => ({}))) as LegacyLinkPayload;
      throw new Error(body.message || `Task complete failed (${taskRes.status}).`);
    }
  }

  progress.onStatus?.('Unlocking destination…');
  const doneRes = await fetch('/api/link-completed', {
    method: 'POST',
    credentials: 'include',
    headers: legacyHeaders(true),
    body: JSON.stringify({ link_id: linkId, link_action_id: Number(actionId) }),
  });
  const done = (await doneRes.json().catch(() => ({}))) as LegacyLinkPayload;
  if (doneRes.status === 429) throw new Error('Too many requests. Wait a minute, then refresh.');
  if (!doneRes.ok) throw new Error(done.message || `Link complete failed (${doneRes.status}).`);

  const dest = asHttpUrl(done.destination_url) || asHttpUrl(done.redirect_url) || ready;
  if (!dest) throw new Error('Legacy destination missing.');
  return dest;
}
