export const DLSURF_API = 'https://backendapi.dlsurf.com';
export const DLSURF_SITEKEY = '0x4AAAAAABbfHaaMuK4MmNeI';
export const DLSURF_FILE_RE = /^\/f\/([A-Za-z0-9]+)\/?$/i;
export const DLSURF_PANEL_ID = 'skip-wait-dlsurf-panel';
export const DLSURF_TURNSTILE_MOUNT_ID = 'skip-wait-dlsurf-turnstile';
export const DLSURF_MSG_SOURCE = 'skip-wait-dlsurf';
export const MSG_DLSURF_PREFETCH = 'skip-wait-dlsurf-prefetch';
export const MSG_DLSURF_TURNSTILE = 'skip-wait-dlsurf-turnstile';
export const MSG_DLSURF_UNLOCK = 'skip-wait-dlsurf-unlock';

export type DlsurfUnlockResult = { ok: true; url: string } | { ok: false; err: string };
