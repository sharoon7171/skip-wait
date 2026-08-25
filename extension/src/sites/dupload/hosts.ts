import { canBypassHost } from '../../gate';

export const DUPLOAD_ID_RE = /^[a-z0-9]{8,16}$/i;

export const isDuploadFileUrl = async (url: string): Promise<boolean> => {
  try {
    const u = new URL(url);
    if (!(await canBypassHost(u.hostname, 'dupload'))) return false;
    const id = u.pathname.replace(/^\/+|\/+$/g, '');
    return Boolean(id) && !id.includes('/') && DUPLOAD_ID_RE.test(id);
  } catch {
    return false;
  }
};
