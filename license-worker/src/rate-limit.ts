import { clientIp, json } from './crypto';

type Env = { LICENSES: KVNamespace };

const WINDOW_MS = 60_000;
const CLIENT_LIMIT = 30;
const ADMIN_FAIL_LIMIT = 10;

const bucket = (): number => Math.floor(Date.now() / WINDOW_MS);

const rateKey = (scope: string, ip: string): string => `rl:${scope}:${ip}:${bucket()}`;

const bump = async (env: Env, key: string, limit: number): Promise<boolean> => {
  const current = Number(await env.LICENSES.get(key));
  const next = Number.isFinite(current) ? current + 1 : 1;
  if (next > limit) return false;
  await env.LICENSES.put(key, String(next), { expirationTtl: 120 });
  return true;
};

export const allowClient = (env: Env, request: Request): Promise<Response | null> =>
  bump(env, rateKey('client', clientIp(request)), CLIENT_LIMIT).then((ok) =>
    ok ? null : json({ ok: false, error: 'RATE_LIMITED' }, 429),
  );

export const allowAdminFail = (env: Env, request: Request): Promise<Response | null> =>
  bump(env, rateKey('admin-fail', clientIp(request)), ADMIN_FAIL_LIMIT).then((ok) =>
    ok ? null : json({ ok: false, error: 'RATE_LIMITED' }, 429),
  );
