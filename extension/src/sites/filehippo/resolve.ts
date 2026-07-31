import { decodeObs } from './obs';

const PAID_DOWNLOAD_TYPES = new Set([
  'buyDownload',
  'affiliateDownload',
  'offerDownload',
  'paidDownload',
]);

const MAX_MEDIATOR_HOPS = 2;

function absoluteUrl(href: string | null | undefined, base: string): string | null {
  if (!href || href === '#') return null;
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
}

function isMediatorPath(url: string): boolean {
  const path = new URL(url).pathname;
  return /\/download\/?$/i.test(path) || /\/post_download\/?$/i.test(path);
}

function parseHtml(html: string): Document {
  return new DOMParser().parseFromString(html, 'text/html');
}

async function fetchDocument(url: string): Promise<Document> {
  const res = await fetch(url, { credentials: 'include' });
  if (!res.ok) throw new Error(`filehippo fetch ${res.status}`);
  return parseHtml(await res.text());
}

function destinationFromDocument(doc: Document, base: string): string | null {
  const iframe = doc.getElementById('iframe-download');
  if (iframe instanceof HTMLIFrameElement) {
    const raw = iframe.getAttribute('data-dw-url');
    if (!raw) return null;
    return absoluteUrl(decodeObs(raw), base);
  }

  const tab = doc.querySelector('a.js-download-btn');
  if (tab instanceof HTMLAnchorElement) {
    const dwType = tab.getAttribute('data-dw-type') ?? '';
    if (PAID_DOWNLOAD_TYPES.has(dwType)) {
      return absoluteUrl(tab.getAttribute('href'), base);
    }
    const dwUrl = tab.getAttribute('data-dw-url');
    if (!dwUrl) return null;
    return absoluteUrl(decodeObs(dwUrl), base);
  }

  return null;
}

function mediatorHref(doc: Document, base: string): string | null {
  const file = doc.querySelector('a.js-download-btn-file');
  if (!(file instanceof HTMLAnchorElement)) return null;
  const href = absoluteUrl(file.getAttribute('href'), base);
  if (!href || !isMediatorPath(href)) return null;
  return href;
}

export async function resolveLaunchUrl(
  doc: Document = document,
  base: string = location.href,
  hopsLeft: number = MAX_MEDIATOR_HOPS,
): Promise<string> {
  const direct = destinationFromDocument(doc, base);
  if (direct) return direct;

  if (hopsLeft <= 0) throw new Error('filehippo mediator hop exhausted');
  const next = mediatorHref(doc, base);
  if (!next) throw new Error('filehippo launch url missing');
  return resolveLaunchUrl(await fetchDocument(next), next, hopsLeft - 1);
}
