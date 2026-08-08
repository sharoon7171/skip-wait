export const DUPLOAD_HOSTS = ['dupload.net'] as const;
export const DUPLOAD_ID_RE = /^[a-z0-9]{8,16}$/i;

export const isDuploadFileUrl = (url: string): boolean => {
  try {
    const u = new URL(url);
    if (u.hostname.toLowerCase() !== 'dupload.net') return false;
    const id = u.pathname.replace(/^\/+|\/+$/g, '');
    return Boolean(id) && !id.includes('/') && DUPLOAD_ID_RE.test(id);
  } catch {
    return false;
  }
};
