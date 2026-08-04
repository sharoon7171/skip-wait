export const WORKINK_MSG_SOURCE = 'skip-wait-workink' as const;
export const MSG_WORKINK_HOOKS = 'WORKINK_HOOKS' as const;

const LINK_PATH_RE = /^\/[0-9][A-Za-z0-9]{2,11}(?:\/[^/]+)?\/?$/;

export function isWorkinkGateUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname.toLowerCase() === 'work.ink' && LINK_PATH_RE.test(u.pathname);
  } catch {
    return false;
  }
}
