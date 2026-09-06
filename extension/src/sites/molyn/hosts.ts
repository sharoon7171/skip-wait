export const SITE = 'molyn' as const;
export const HOST = 'molyn.top' as const;
export const OVERLAY_ID = 'skip-wait-molyn-overlay' as const;
export const FETCH_KEY_PATH = '/api/keys/fetch-key' as const;
export const PASTEBIN_FALLBACK = 'https://pastebin.com/raw/SfhHjBQ1' as const;

const PATH_RE = /^\/(keysystem|finishline|fl|cp\d+)$/;

export const isMolynKeyFlow = (): boolean => {
  if (location.hostname !== HOST) return false;
  const path = location.pathname.replace(/\/+$/, '') || '/';
  return PATH_RE.test(path);
};
