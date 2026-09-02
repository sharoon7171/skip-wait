const MAX = 10;
const HOP_RULE = 917299;

const jsRedirect = (html: string, base: string): string | null => {
  const target = html.match(/(?:document|window)\.location(?:\.href)?\s*=\s*['"]([^'"]+)['"]/)?.[1];
  if (!target) return null;
  try {
    return new URL(target, base).href;
  } catch {
    return null;
  }
};

const learnMore = (html: string, base: string): string | null => {
  const href = html.match(/href=["']([^"']*learn_more\.php[^"']*)["']/i)?.[1];
  if (!href) return null;
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
};

const fetchHop = async (url: string, referer: string): Promise<Response> => {
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [HOP_RULE],
    addRules: [
      {
        id: HOP_RULE,
        priority: 3,
        action: {
          type: 'modifyHeaders',
          requestHeaders: [{ header: 'Referer', operation: 'set', value: referer }],
        },
        condition: {
          urlFilter: `|${url}`,
          resourceTypes: ['xmlhttprequest'],
          tabIds: [chrome.tabs.TAB_ID_NONE],
        },
      },
    ],
  });
  try {
    return await fetch(url, {
      redirect: 'manual',
      credentials: 'include',
      cache: 'no-store',
      headers: { Accept: 'text/html' },
    });
  } finally {
    await chrome.declarativeNetRequest.updateSessionRules({ removeRuleIds: [HOP_RULE] }).catch(() => {});
  }
};

const fetchPage = async (url: string, referer: string): Promise<{ url: string; html: string }> => {
  let nextUrl = url;
  let nextReferer = referer;
  for (let i = 0; i < 5; i++) {
    const res = await fetchHop(nextUrl, nextReferer);
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get('location');
      if (!loc) break;
      nextReferer = nextUrl;
      nextUrl = new URL(loc, nextUrl).href;
      continue;
    }
    return { url: nextUrl, html: await res.text() };
  }
  return { url: nextUrl, html: '' };
};

export const fetchLastMediatorReferer = async (shortUrl: string, assigned: string): Promise<string> => {
  let url = assigned;
  let referer = shortUrl;
  let last = `${new URL(assigned).origin}/`;

  for (let i = 0; i < MAX; i++) {
    const page = await fetchPage(url, referer);
    last = `${new URL(page.url).origin}/`;
    const lm = learnMore(page.html, page.url);
    if (lm) {
      const hop = await fetchPage(lm, page.url);
      const next = jsRedirect(hop.html, lm);
      if (!next) break;
      referer = lm;
      url = next;
      last = `${new URL(lm).origin}/`;
      continue;
    }
    const next = jsRedirect(page.html, page.url);
    if (!next || next === page.url) break;
    referer = page.url;
    url = next;
  }

  return last;
};
