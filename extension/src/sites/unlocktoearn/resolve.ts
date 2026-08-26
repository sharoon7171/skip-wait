import { aliasPageUrl, isHttpUrl } from './hosts';

const ACCEPT = 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8';

export const resolveDestination = async (alias: string): Promise<string> => {
  const pageUrl = await aliasPageUrl(alias);
  const origin = new URL(pageUrl).origin;
  const res = await fetch(pageUrl, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    redirect: 'follow',
    headers: {
      Accept: ACCEPT,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Origin: origin,
      Referer: pageUrl,
    },
    body: new URLSearchParams({ referdomain: 'Direct', submit: '' }),
  });
  const dest = res.url;
  if (!isHttpUrl(dest) || new URL(dest).origin === origin) throw new Error('dest');
  return dest;
};
