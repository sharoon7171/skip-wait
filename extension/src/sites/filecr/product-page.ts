import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import {
  clearFilecrPostCache,
  fetchDownloadLink,
  go,
  latestDownload,
  linksOfType,
  loadFilecrPost,
  prefetchDownloads,
  resolveDownloadInfo,
  type FilecrDownload,
  type FilecrLink,
  type FilecrPost,
} from './api';
import { FILECR_HOSTS, FILECR_PRODUCT_PATH, filecrPageKey } from './hosts';
import { onFilecrRoute } from './route';

const BRAND_ID = 'skipwait-filecr-brand';

type Session = {
  key: string;
  downloads: FilecrDownload[];
  latest: FilecrDownload;
};

let session: Session | null = null;
let syncGen = 0;
let uiObserver: MutationObserver | null = null;
let clicksWired = false;
const magnetReady = new Map<number, string>();

function tearDown(): void {
  session = null;
  stopUiObserver();
  document.getElementById(BRAND_ID)?.remove();
}

function stopUiObserver(): void {
  uiObserver?.disconnect();
  uiObserver = null;
}

function magnetFor(linkId: number): Promise<string | null> {
  return fetchDownloadLink(linkId).then((url) => {
    if (url?.startsWith('magnet:')) {
      magnetReady.set(linkId, url);
      return url;
    }
    magnetReady.delete(linkId);
    return null;
  });
}

function selectedInternal(download: FilecrDownload): FilecrLink | null {
  const internals = linksOfType(download, 'Internal');
  const first = internals[0];
  if (!first) return linksOfType(download, 'External')[0] ?? null;

  const checked = document.querySelector<HTMLInputElement>(
    'input[name="download-option"]:checked',
  );
  if (!checked) return first;
  const label = document.querySelector(`label[for="${CSS.escape(checked.id)}"]`);
  const text = (label?.textContent ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
  return (
    internals.find((l) => (l.title ?? '').replace(/\s+/g, ' ').trim().toLowerCase() === text) ??
    first
  );
}

function buttonKind(btn: HTMLElement): 'direct' | 'fast' | null {
  const text = (btn.textContent ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
  if (text.includes('fast download')) return 'fast';
  if (text === 'direct download') return 'direct';
  return null;
}

function normText(value: string): string {
  return value.replace(/\s+/g, ' ').trim().toLowerCase();
}

function linkSizeText(link: FilecrLink): string {
  return link.size
    ? `${link.size.value} ${link.size.unit}`.replace(/\s+/g, ' ').trim().toLowerCase()
    : '';
}

function versionHistoryRow(btn: HTMLElement): HTMLElement | null {
  const row = btn.closest('#version-history [class*="version_wrap"]');
  if (!(row instanceof HTMLElement)) return null;
  if (/version_header/i.test(row.className)) return null;
  return row;
}

function downloadContainingLinkId(
  downloads: FilecrDownload[],
  linkId: number,
): FilecrDownload | null {
  for (const download of downloads) {
    if (download.links.some((link) => link.id === linkId)) return download;
  }
  return null;
}

function downloadForVersionRow(
  row: HTMLElement,
  downloads: FilecrDownload[],
): FilecrDownload | null {
  for (const el of row.querySelectorAll<HTMLElement>('button[data-tooltip-id]')) {
    const tipId = el.dataset['tooltipId'] ?? '';
    const idText = tipId.match(/^(?:Instant|Worker)-(\d+)$/i)?.[1];
    if (!idText) continue;
    const hit = downloadContainingLinkId(downloads, Number(idText));
    if (hit) return hit;
  }

  const texts = [...row.querySelectorAll('[class*="version_data"]')]
    .map((node) => (node.textContent ?? '').replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  for (const download of downloads) {
    if (download.filename && texts.includes(download.filename)) return download;
  }
  for (const download of downloads) {
    if (download.version && texts.includes(download.version)) return download;
  }
  return null;
}

function matchLinkInDownload(
  download: FilecrDownload,
  btn: HTMLElement,
  types: string[],
): FilecrLink | null {
  const tip = normText(btn.dataset['tooltipContent'] ?? '');
  const size = normText(btn.textContent ?? '');
  for (const link of download.links) {
    if (!types.includes(link.type)) continue;
    const linkSize = linkSizeText(link);
    if (size && linkSize && size !== linkSize) continue;
    if (link.title) {
      const title = normText(link.title);
      if (tip && tip !== title) continue;
    }
    return link;
  }
  return null;
}

function versionDownload(
  btn: HTMLElement,
  downloads: FilecrDownload[],
): FilecrDownload | null {
  const tipId = btn.dataset['tooltipId'] ?? '';
  const typedId = tipId.match(/^(?:Instant|Worker)-(\d+)$/i)?.[1];
  if (typedId) return downloadContainingLinkId(downloads, Number(typedId));

  const row = versionHistoryRow(btn);
  if (!row) return null;
  return downloadForVersionRow(row, downloads);
}

function versionLink(btn: HTMLElement, downloads: FilecrDownload[]): FilecrLink | null {
  const tipId = btn.dataset['tooltipId'] ?? '';
  const download = versionDownload(btn, downloads);
  if (!download) return null;

  const instantId = tipId.match(/^Instant-(\d+)$/i)?.[1];
  if (instantId) {
    const id = Number(instantId);
    return download.links.find((link) => link.id === id && link.type === 'Instant') ?? null;
  }

  const workerId = tipId.match(/^Worker-(\d+)$/i)?.[1];
  if (workerId) {
    const id = Number(workerId);
    return download.links.find((link) => link.id === id && link.type === 'Worker') ?? null;
  }

  if (/^Torrent-/i.test(tipId)) {
    return matchLinkInDownload(download, btn, ['Torrent']);
  }
  if (/^Internal-/i.test(tipId)) {
    return matchLinkInDownload(download, btn, ['Internal', 'External']);
  }
  return null;
}

function mountBrand(panel: Element): void {
  if (panel.querySelector(`#${BRAND_ID}`)) return;
  const brand = document.createElement('div');
  brand.id = BRAND_ID;
  brand.setAttribute('role', 'status');
  brand.style.cssText =
    'display:flex;align-items:flex-start;gap:12px;margin:0 0 16px;padding:12px 14px;' +
    'border:1px solid #ebebeb;border-radius:8px;background:#fff8ef;color:#2b373a;' +
    'font:600 13px/1.45 -apple-system,system-ui,Segoe UI,Roboto,sans-serif';
  brand.innerHTML =
    '<span style="flex:0 0 auto;width:22px;height:22px;border-radius:50%;background:#fca120;color:#fff;' +
    'display:inline-flex;align-items:center;justify-content:center;font-size:13px;line-height:1">✓</span>' +
    '<span><span style="display:block;font-size:14px;letter-spacing:-.01em">Skip Wait — timers bypassed</span>' +
    '<span style="display:block;margin-top:2px;font-weight:500;opacity:.78">' +
    'Direct, torrent, and Fast Download are ready without the wait page or Assistant extension.' +
    '</span></span>';
  const anchor = panel.querySelector('.filter-options') ?? panel.firstElementChild;
  if (anchor) anchor.before(brand);
  else panel.prepend(brand);
}

function applyUi(active: Session): void {
  for (const panel of document.querySelectorAll('.download-info')) {
    mountBrand(panel);
  }

  const mainTorrent = linksOfType(active.latest, 'Torrent')[0];
  if (mainTorrent) {
    void magnetFor(mainTorrent.id).then((magnet) => {
      if (!magnet || session !== active) return;
      for (const box of document.querySelectorAll('.torrent-btn .torrent-link')) {
        if (box instanceof HTMLAnchorElement) box.href = magnet;
      }
    });
  }

  for (const btn of document.querySelectorAll<HTMLElement>('#version-history [data-tooltip-id^="Torrent-"]')) {
    const link = versionLink(btn, active.downloads);
    if (!link) continue;
    void magnetFor(link.id);
  }
}

function currentSession(): Session | null {
  const key = filecrPageKey();
  return session?.key === key ? session : null;
}

async function ensureSession(): Promise<Session | null> {
  const key = filecrPageKey();
  if (session?.key === key) return session;
  await syncRoute();
  return session?.key === key ? session : null;
}

function resolveFromSession(
  active: Session,
  btn: HTMLElement,
  kind: 'direct' | 'fast' | null,
): Promise<string | null> | null {
  if (kind === 'direct') {
    const link = selectedInternal(active.latest);
    if (!link) return null;
    return resolveDownloadInfo({ link_id: link.id, link_type: link.type });
  }
  if (kind === 'fast') {
    const instant = linksOfType(active.latest, 'Instant');
    const worker = linksOfType(active.latest, 'Worker');
    if (instant.length) return resolveDownloadInfo({ instant_links: instant });
    if (worker.length) return resolveDownloadInfo({ worker_links: worker });
    return null;
  }

  const tipId = btn.dataset['tooltipId'] ?? '';
  if (!/^(Instant-\d+|Worker-\d+|Internal-|Torrent-)/i.test(tipId)) return null;

  const download = versionDownload(btn, active.downloads);
  if (!download) return null;

  if (/^Instant-\d+/i.test(tipId)) {
    const instant = linksOfType(download, 'Instant');
    return instant.length ? resolveDownloadInfo({ instant_links: instant }) : null;
  }
  if (/^Worker-\d+/i.test(tipId)) {
    const worker = linksOfType(download, 'Worker');
    return worker.length ? resolveDownloadInfo({ worker_links: worker }) : null;
  }

  const link = versionLink(btn, active.downloads);
  if (!link) return null;
  return resolveDownloadInfo({ link_id: link.id, link_type: link.type });
}

function ensureClickDelegate(): void {
  if (clicksWired) return;
  clicksWired = true;
  document.addEventListener(
    'click',
    (e) => {
      const btn = (e.target as Element | null)?.closest?.('button, a');
      if (!(btn instanceof HTMLElement)) return;

      const copyBtn = btn.classList.contains('copy-to-clipboard')
        ? btn
        : btn.closest('.copy-to-clipboard');
      const torrentBox = btn.closest('.torrent-btn');
      const torrentTip = /^Torrent-/i.test(btn.dataset['tooltipId'] ?? '');

      if (torrentBox || torrentTip) {
        const active = currentSession();
        if (!active) {
          void syncRoute();
          return;
        }

        let linkId: number | null = null;
        if (torrentTip) {
          linkId = versionLink(btn, active.downloads)?.id ?? null;
        } else {
          linkId = linksOfType(active.latest, 'Torrent')[0]?.id ?? null;
        }
        const magnet = linkId != null ? magnetReady.get(linkId) : undefined;
        if (!magnet) {
          if (linkId != null) void magnetFor(linkId);
          void syncRoute();
          return;
        }

        e.preventDefault();
        e.stopImmediatePropagation();
        if (copyBtn instanceof HTMLElement) {
          void navigator.clipboard.writeText(magnet).then(() => {
            copyBtn.setAttribute('data-tooltip-content', 'Copied');
            setTimeout(() => copyBtn.setAttribute('data-tooltip-content', 'Click to copy!'), 2000);
          });
          return;
        }
        go(magnet);
        return;
      }

      const kind = buttonKind(btn);
      const tipId = btn.dataset['tooltipId'] ?? '';
      if (!kind && !/^(Instant-\d+|Worker-\d+|Internal-)/i.test(tipId)) return;

      e.preventDefault();
      e.stopImmediatePropagation();
      const pageKey = filecrPageKey();
      void (async () => {
        const active = await ensureSession();
        if (!active || active.key !== pageKey || filecrPageKey() !== pageKey) return;
        const pending = resolveFromSession(active, btn, kind);
        if (!pending) return;
        const url = await pending;
        if (!url || filecrPageKey() !== pageKey) return;
        go(url);
      })();
    },
    true,
  );
}

function startSession(post: FilecrPost, key: string): void {
  const downloads = (post.downloads ?? []).filter((d) => d.links?.length);
  const latest = latestDownload(post);
  if (!latest) {
    tearDown();
    return;
  }

  const active: Session = { key, downloads, latest };
  session = active;
  prefetchDownloads(downloads);
  for (const download of downloads) {
    for (const link of linksOfType(download, 'Torrent')) {
      void magnetFor(link.id);
    }
  }
  ensureClickDelegate();

  const runUi = (): void => {
    if (session !== active) return;
    if (filecrPageKey() !== active.key) {
      void syncRoute();
      return;
    }
    applyUi(active);
  };
  runUi();
  stopUiObserver();
  const root = document.body ?? document.documentElement;
  uiObserver = new MutationObserver(runUi);
  uiObserver.observe(root, { childList: true, subtree: true });
}

async function syncRoute(): Promise<void> {
  const gen = ++syncGen;

  if (!FILECR_PRODUCT_PATH.test(location.pathname)) {
    if (gen === syncGen) tearDown();
    return;
  }

  const key = filecrPageKey();
  if (session?.key === key) {
    applyUi(session);
    return;
  }

  if (gen === syncGen) tearDown();
  clearFilecrPostCache();
  const post = await loadFilecrPost();
  if (gen !== syncGen) return;
  if (filecrPageKey() !== key) return;
  if (!post) return;
  startSession(post, key);
}

export function initFilecrProductPage(): void {
  if (!isAllowedHost(FILECR_HOSTS)) return;
  onFilecrRoute(() => {
    whenDomParsed(() => {
      void syncRoute();
    });
  });
}
