export const VEXFILE_HOSTS = ['vexfile.com'] as const;
export const VEXFILE_VERIFIED_ATTR = 'data-sw-vex-verified';
export const MSG_VEXFILE_VERIFY_HOOK = 'skip-wait-vexfile-verify-hook';
export const VEXFILE_CODE_RE = /^\/download\/([A-Za-z0-9]+)(?:\/|$)/i;

export function isVexfileDownloadUrl(url: string): boolean {
  try {
    const u = new URL(url);
    const h = u.hostname.toLowerCase();
    if (!VEXFILE_HOSTS.some((d) => h === d || h.endsWith('.' + d))) return false;
    return VEXFILE_CODE_RE.test(u.pathname);
  } catch {
    return false;
  }
}
