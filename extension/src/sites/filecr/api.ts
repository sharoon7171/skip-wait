import { requestExtractLink } from './extract-link';

export type FilecrLink = {
  id: number;
  type: string;
  title?: string | null;
  size?: { value: string; unit: string } | null;
};

export type FilecrDownload = {
  id: number;
  filename?: string;
  version?: string;
  links: FilecrLink[];
};

export type FilecrPost = {
  id?: number;
  slug?: string;
  downloads?: FilecrDownload[];
};

export type FilecrDownloadInfo = {
  link_id?: number | string;
  link_type?: string;
  instant_links?: FilecrLink[];
  worker_links?: FilecrLink[];
};

type NextData = {
  buildId?: string;
  page?: string;
  props?: { pageProps?: { post?: FilecrPost } };
};

type DataJson = { pageProps?: { post?: FilecrPost } };
type DownloadLinkApi = { success?: boolean; url?: string | null };
type WorkerApi = { success?: boolean; url?: string | null };

const downloadlinkCache = new Map<number, Promise<string | null>>();
const workerCache = new Map<number, Promise<string | null>>();
const extractCache = new Map<string, Promise<string | null>>();
const instantCache = new Map<string, Promise<string | null>>();
const workerGroupCache = new Map<string, Promise<string | null>>();
const postByPath = new Map<string, Promise<FilecrPost | null>>();

function readNextData(): NextData | null {
  const raw = document.getElementById('__NEXT_DATA__')?.textContent;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as NextData;
  } catch {
    return null;
  }
}

function postMatchesLocation(post: FilecrPost | null | undefined): post is FilecrPost {
  if (!post?.slug) return false;
  const path = location.pathname.toLowerCase();
  return path.includes(`/${post.slug.toLowerCase()}`) || path.endsWith(`/${post.slug.toLowerCase()}/`);
}

function dataUrlForLocation(buildId: string): string {
  const path = location.pathname.replace(/\/$/, '') || '/';
  return `/_next/data/${buildId}${path}.json${location.search}`;
}

async function fetchPostJson(buildId: string): Promise<FilecrPost | null> {
  const res = await fetch(dataUrlForLocation(buildId), {
    credentials: 'include',
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as DataJson;
  return data.pageProps?.post ?? null;
}

export function loadFilecrPost(): Promise<FilecrPost | null> {
  const path = location.pathname.endsWith('/') ? location.pathname : `${location.pathname}/`;
  let pending = postByPath.get(path);
  if (!pending) {
    pending = (async () => {
      const next = readNextData();
      const fromDom = next?.props?.pageProps?.post;
      if (postMatchesLocation(fromDom)) return fromDom;

      const buildId = next?.buildId;
      if (!buildId) return null;

      try {
        const post = await fetchPostJson(buildId);
        if (postMatchesLocation(post)) return post;
      } catch {
        return null;
      }
      return null;
    })();
    postByPath.set(path, pending);
  }
  return pending;
}

export function clearFilecrPostCache(): void {
  postByPath.clear();
}

export function latestDownload(post: FilecrPost): FilecrDownload | null {
  return (post.downloads ?? []).find((d) => d.links?.length) ?? null;
}

export function linksOfType(download: FilecrDownload, type: string): FilecrLink[] {
  return download.links.filter((l) => l.type === type);
}

function cacheSuccess<K>(
  map: Map<K, Promise<string | null>>,
  key: K,
  run: () => Promise<string | null>,
): Promise<string | null> {
  let pending = map.get(key);
  if (!pending) {
    pending = run().then((url) => {
      if (!url) map.delete(key);
      return url;
    });
    map.set(key, pending);
  }
  return pending;
}

export function fetchDownloadLink(linkId: number): Promise<string | null> {
  return cacheSuccess(downloadlinkCache, linkId, () =>
    fetch(`/api/actions/downloadlink/?id=${linkId}`, { credentials: 'include' })
      .then((r) => r.json() as Promise<DownloadLinkApi>)
      .then((j) => (j.success && typeof j.url === 'string' && j.url ? j.url : null))
      .catch(() => null),
  );
}

function fetchWorkerLink(linkId: number): Promise<string | null> {
  return cacheSuccess(workerCache, linkId, () =>
    fetch(`/api/actions/worker/?link_id=${linkId}`, { credentials: 'include' })
      .then((r) => r.json() as Promise<WorkerApi>)
      .then((j) => (j.success && typeof j.url === 'string' && j.url ? j.url : null))
      .catch(() => null),
  );
}

function extractCached(pageUrl: string): Promise<string | null> {
  return cacheSuccess(extractCache, pageUrl, () => requestExtractLink(pageUrl));
}

function linkKey(links: FilecrLink[]): string {
  return links.map((l) => l.id).join(',');
}

export function resolveInstantLinks(links: FilecrLink[]): Promise<string | null> {
  const key = linkKey(links);
  return cacheSuccess(instantCache, key, () =>
    Promise.all(
      links.map(async (link) => {
        const pageUrl = await fetchDownloadLink(link.id);
        if (!pageUrl) return null;
        return extractCached(pageUrl);
      }),
    ).then((urls) => urls.find((url): url is string => !!url) ?? null),
  );
}

export function resolveWorkerLinks(links: FilecrLink[]): Promise<string | null> {
  const key = linkKey(links);
  return cacheSuccess(workerGroupCache, key, () =>
    Promise.all(links.map((link) => fetchWorkerLink(link.id))).then(
      (urls) => urls.find((url): url is string => !!url) ?? null,
    ),
  );
}

export async function resolveDownloadInfo(info: FilecrDownloadInfo): Promise<string | null> {
  if (info.instant_links?.length) return resolveInstantLinks(info.instant_links);
  if (info.worker_links?.length) return resolveWorkerLinks(info.worker_links);

  const id = Number(info.link_id);
  if (!Number.isFinite(id) || id <= 0) return null;

  const type = info.link_type;
  if (type === 'Instant' || type === 'Worker') return null;

  const url = await fetchDownloadLink(id);
  if (!url) return null;
  if (type === 'Torrent') return url.startsWith('magnet:') ? url : null;
  return url;
}

export function prefetchDownload(download: FilecrDownload): void {
  for (const link of download.links) {
    if (link.type === 'Torrent' || link.type === 'Internal' || link.type === 'External') {
      void fetchDownloadLink(link.id);
    }
  }
  const instant = linksOfType(download, 'Instant');
  if (instant.length) void resolveInstantLinks(instant);
  const worker = linksOfType(download, 'Worker');
  if (worker.length) void resolveWorkerLinks(worker);
}

export function prefetchDownloads(downloads: FilecrDownload[]): void {
  for (const download of downloads) {
    prefetchDownload(download);
  }
}

export function go(url: string): void {
  if (url.startsWith('magnet:')) {
    const a = document.createElement('a');
    a.href = url;
    a.rel = 'noreferrer';
    document.body.append(a);
    a.click();
    a.remove();
    return;
  }
  location.replace(url);
}
