import { hostIsRemoteSite } from '../../hosts/check';

export async function isStorylineScormUrl(url: string): Promise<boolean> {
  try {
    const u = new URL(url);
    if (!(await hostIsRemoteSite(u.hostname, 'storyline-scorm'))) return false;
    return u.pathname.includes('index_lms.html') || u.pathname.includes('package_uploads');
  } catch {
    return false;
  }
}
