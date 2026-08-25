import { canBypassHost } from '../../gate';

export const WORKINK_MSG_SOURCE = 'skip-wait-workink' as const;
export const MSG_WORKINK_HOOKS = 'WORKINK_HOOKS' as const;

const LINK_PATH_RE = /^\/[0-9][A-Za-z0-9]{2,11}(?:\/[^/]+)?\/?$/;

export async function isWorkinkGateUrl(url: string): Promise<boolean> {
  try {
    const u = new URL(url);
    if (!(await canBypassHost(u.hostname, 'workink'))) return false;
    return LINK_PATH_RE.test(u.pathname);
  } catch {
    return false;
  }
}
