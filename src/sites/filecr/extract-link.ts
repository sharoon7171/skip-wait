export const MSG_FILECR_EXTRACT = 'FILECR_EXTRACT_LINK' as const;

type ExtractRequest = { type: typeof MSG_FILECR_EXTRACT; url: string };
type ExtractResponse = { url: string | null };

function extractMediafire(html: string): string | null {
  const patterns = [
    /aria-label="Download file"\s+href="(https:\/\/download[^"]+)"/i,
    /href="(https:\/\/download[^"]+)"[^>]*\bid="downloadButton"/i,
    /id="downloadButton"[^>]*href="(https:\/\/download[^"]+)"/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return m[1];
  }
  return null;
}

function extractFromHtml(pageUrl: string, html: string): string | null {
  let host: string;
  try {
    host = new URL(pageUrl).hostname.toLowerCase();
  } catch {
    return null;
  }
  if (host.includes('mediafire.com')) return extractMediafire(html);
  return null;
}

export function initFilecrExtractLink(): void {
  chrome.runtime.onMessage.addListener((message: Partial<ExtractRequest>, _sender, sendResponse) => {
    if (message?.type !== MSG_FILECR_EXTRACT) return false;
    const pageUrl = typeof message.url === 'string' ? message.url : '';
    if (!/^https?:\/\//i.test(pageUrl)) {
      sendResponse({ url: null } satisfies ExtractResponse);
      return false;
    }
    void fetch(pageUrl, {
      credentials: 'omit',
      cache: 'no-store',
      headers: { Accept: 'text/html,*/*' },
    })
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((html) => sendResponse({ url: extractFromHtml(pageUrl, html) } satisfies ExtractResponse))
      .catch(() => sendResponse({ url: null } satisfies ExtractResponse));
    return true;
  });
}

function sendExtract(pageUrl: string): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      chrome.runtime.sendMessage(
        { type: MSG_FILECR_EXTRACT, url: pageUrl } satisfies ExtractRequest,
        (resp: ExtractResponse | undefined) => {
          if (chrome.runtime.lastError) {
            resolve(null);
            return;
          }
          resolve(typeof resp?.url === 'string' && resp.url ? resp.url : null);
        },
      );
    } catch {
      resolve(null);
    }
  });
}

export async function requestExtractLink(pageUrl: string): Promise<string | null> {
  const first = await sendExtract(pageUrl);
  if (first) return first;
  await new Promise((r) => setTimeout(r, 150));
  return sendExtract(pageUrl);
}
