import { isRemoteSite } from '../../hosts/check';
import { whenDomParsed } from '../../utils/domain-check';

const HIJACKED = 'data-skipwait-hijacked';
const NOTICE_ID = 'skipwait-pling-bypass';
const PROJECT_RE = /\/p\/(\d+)/;
const FILE_ID_RE = /-link-filename(\d+)$/;

function run(): void {
  const pid = location.pathname.match(PROJECT_RE)?.[1];
  if (!pid || !document.getElementById('product-view-container')) return;
  void fetch(`${location.origin}/p/${pid}/loadFiles`, { credentials: 'same-origin' })
    .then((r) => (r.ok ? r.json() : null))
    .then((data: { files?: { id: string; url: string }[] } | null) => {
      const files = new Map((data?.files ?? []).map((f) => [f.id, f.url]));
      if (!files.size) return;
      for (const a of document.querySelectorAll<HTMLAnchorElement>('a.opendownloadfile')) {
        if (a.hasAttribute(HIJACKED)) continue;
        const id = a.querySelector('[id*="-link-filename"]')?.id.match(FILE_ID_RE)?.[1];
        const url = id && files.get(id);
        if (!url) continue;
        a.setAttribute(HIJACKED, '1');
        a.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
          location.assign(decodeURIComponent(url));
        }, true);
      }
      const box = document.querySelector('#project_btn_download')?.closest('.prod-widget-box');
      if (box && !box.querySelector(`#${NOTICE_ID}`)) {
        const hint = Object.assign(document.createElement('p'), {
          id: NOTICE_ID,
          className: 'text-small mt2',
          textContent: 'Skip Wait bypassed the download wait screen. Pick a file above to start.',
        });
        box.append(hint);
      }
    });
}

export function initPlingDirectDownload(): void {
  if (!PROJECT_RE.test(location.pathname)) return;
  const allowed = isRemoteSite('pling');
  whenDomParsed(() => {
    void allowed.then((ok) => {
      if (!ok) return;
      run();
      new MutationObserver(run).observe(document.body, { childList: true, subtree: true });
    });
  });
}
