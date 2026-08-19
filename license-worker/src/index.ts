import {
  activateLicense,
  deleteLicense,
  isAdmin,
  issueLicense,
  revokeLicense,
  unbindLicense,
  validateLicense,
} from './license';
import { corsPreflight, json, parseLicenseKey, readJson } from './crypto';
import { allowAdminFail, allowClient } from './rate-limit';
import type { AdminIssueBody, AdminKeyBody } from './types';

type Env = {
  LICENSES: KVNamespace;
  ADMIN_SECRET: string;
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === '/health') {
      return json({ ok: true, v: 1 });
    }

    if (request.method === 'OPTIONS') return corsPreflight();

    if (request.method !== 'POST') return json({ ok: false, error: 'NOT_FOUND' }, 404);

    if (url.pathname === '/v1/activate' || url.pathname === '/v1/validate') {
      const limited = await allowClient(env, request);
      if (limited) return limited;
      return url.pathname === '/v1/activate'
        ? await activateLicense(env, await readJson(request))
        : await validateLicense(env, await readJson(request));
    }

    if (!isAdmin(env, request)) {
      const limited = await allowAdminFail(env, request);
      if (limited) return limited;
      return json({ ok: false, error: 'UNAUTHORIZED' }, 401);
    }

    if (url.pathname === '/admin/issue') {
      const body = await readJson<AdminIssueBody>(request);
      if (body?.plan !== 'trial10m' && body?.plan !== 'monthly30d') {
        return json({ ok: false, error: 'INVALID_PLAN' }, 400);
      }
      return issueLicense(env, body.plan);
    }

    if (
      url.pathname === '/admin/revoke' ||
      url.pathname === '/admin/delete' ||
      url.pathname === '/admin/unbind'
    ) {
      const body = await readJson<AdminKeyBody>(request);
      const key = body?.key ? parseLicenseKey(body.key) : null;
      if (!key) return json({ ok: false, error: 'INVALID_BODY' }, 400);
      if (url.pathname === '/admin/revoke') return revokeLicense(env, key);
      if (url.pathname === '/admin/unbind') return unbindLicense(env, key);
      return deleteLicense(env, key);
    }

    return json({ ok: false, error: 'NOT_FOUND' }, 404);
  },
};
