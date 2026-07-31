export const FILEHIPPO_HOSTS = [
  'filehippo.com',
  'filehippo.de',
  'filehippo.jp',
  'filehippo.pl',
] as const;

export type FilehippoRouteId =
  | 'program'
  | 'programDownload'
  | 'programPostDownload'
  | 'programVersion';

export function filehippoRouteId(): FilehippoRouteId | null {
  for (const script of document.querySelectorAll('script:not([src])')) {
    const text = script.textContent?.trim();
    if (!text?.startsWith('{') || !text.includes('"routeId"')) continue;
    try {
      const routeId = (JSON.parse(text) as { routeId?: string }).routeId;
      if (
        routeId === 'program' ||
        routeId === 'programDownload' ||
        routeId === 'programPostDownload' ||
        routeId === 'programVersion'
      ) {
        return routeId;
      }
    } catch {
      continue;
    }
  }
  return null;
}
