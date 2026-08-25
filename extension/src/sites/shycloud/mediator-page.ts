import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { whenDomParsed } from '../../utils/domain-check';

const ID = 'skip-wait-shycloud-overlay';
const DATA_RE = /var\s+data\s*=\s*(\{[\s\S]*?\});/;
const LINK_RE = /var\s+link\s*=\s*'([^']+)'/;
const SECURE_LINK_RE = /const\s+secureLink\s*=\s*"([^"]+)"/;
const GATE_RE = /location\.pathname\s*\+\s*['"]\?secure_dl=1['"]/;
const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

type Data = {
  canPost?: boolean;
  actionUrl?: string;
  basename?: string;
  post_title?: string;
  post_link?: string;
};

let ui: FullPageOverlay | null = null;
let started = false;

const mount = (status: string): FullPageOverlay => {
  if (ui) {
    ui.setStatus(status);
    return ui;
  }
  ui = createFullPageOverlay({
    id: ID,
    brand: 'Skip Wait',
    note: NOTE,
    status,
    countdownLabel: 'Your link opens in',
  });
  return ui;
};

const parseData = (): Data | null => {
  for (const s of document.scripts) {
    const raw = DATA_RE.exec(s.textContent ?? '')?.[1];
    if (!raw) continue;
    try {
      return JSON.parse(raw) as Data;
    } catch {}
  }
  return null;
};

const httpUrl = (raw: string | undefined): string | null => {
  const url = raw?.trim();
  return url && /^https?:\/\//i.test(url) ? url : null;
};

const pageLink = (): string | null => httpUrl(LINK_RE.exec(document.documentElement.innerHTML)?.[1]);

const pageSecureLink = (): string | null => httpUrl(SECURE_LINK_RE.exec(document.documentElement.innerHTML)?.[1]);

const isDownloadPhase = (): boolean => new URLSearchParams(location.search).has('secure_dl');

const isGatePage = (): boolean => !isDownloadPhase() && GATE_RE.test(document.documentElement.innerHTML);

const isReadyPage = (): boolean => !!document.getElementById('finalDlBtn') && !!pageLink();

const isSavePage = (): boolean => !!document.getElementById('dlBtn') && !!pageSecureLink();

const isWaitPage = (): boolean => {
  const btn = document.getElementById('continueBtn');
  if (!(btn instanceof HTMLButtonElement) || /expired/i.test(btn.textContent ?? '')) return false;
  const d = parseData();
  return !!d?.canPost && !!d.basename;
};

const stopPageTimers = (): void => {
  const n = window.setTimeout(() => {}, 0);
  for (let i = 0; i <= n; i++) {
    window.clearTimeout(i);
    window.clearInterval(i);
  }
};

const submitUnlock = (d: Data): void => {
  const f = document.createElement('form');
  f.method = 'POST';
  f.action = d.actionUrl ?? `${location.origin}/`;
  const fields: Record<string, string> = {
    cf_cache_buster: String(Date.now()),
    system_route: 'ii',
    basename: d.basename ?? '',
  };
  if (d.post_title) fields['post_title'] = d.post_title;
  if (d.post_link) fields['post_link'] = d.post_link;
  for (const [name, value] of Object.entries(fields)) {
    f.appendChild(Object.assign(document.createElement('input'), { type: 'hidden', name, value }));
  }
  document.body.append(f);
  f.submit();
};

const navigate = (url: string): void => {
  mount('Opening your link…');
  location.replace(url);
};

const triggerDownload = (url: string): void => {
  const a = Object.assign(document.createElement('a'), { href: url, rel: 'noopener' });
  a.style.display = 'none';
  document.body.append(a);
  a.click();
  a.remove();
};

const finishDownload = async (url: string, flush = false): Promise<void> => {
  const o = mount('Starting download…');
  if (flush) await fetch(new URL('iii/index.php?action=flush_session', location.href).href, { credentials: 'include' });
  triggerDownload(url);
  o.remove();
  ui = null;
};

const run = (): void => {
  if (started || isDownloadPhase()) return;

  if (isGatePage()) {
    started = true;
    stopPageTimers();
    void finishDownload(`${location.pathname}?secure_dl=1`);
    return;
  }

  if (isSavePage()) {
    const url = pageSecureLink();
    if (!url) return;
    started = true;
    void finishDownload(url, true);
    return;
  }

  if (isReadyPage()) {
    const url = pageLink();
    if (!url) return;
    started = true;
    navigate(url);
    return;
  }

  if (!isWaitPage()) return;
  const data = parseData();
  if (!data?.canPost || !data.basename) return;
  started = true;
  mount('Decoding your link…');
  submitUnlock(data);
};

export function initShycloudMediatorPage(): void {
  if (window !== window.top) return;
  void canBypass('shycloud').then((ok) => {
    if (ok) whenDomParsed(run);
  });
}
