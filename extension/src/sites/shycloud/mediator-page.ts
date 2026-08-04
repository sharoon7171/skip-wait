import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { SHYCLOUD_HOSTS } from './hosts';

const ID = 'skip-wait-shycloud-overlay';
const DATA_RE = /var\s+data\s*=\s*(\{[\s\S]*?\});/;
const LINK_RE = /var\s+link\s*=\s*'([^']+)'/;
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

const linkIn = (html: string): string | null => {
  const url = LINK_RE.exec(html)?.[1]?.trim();
  return url && /^https?:\/\//i.test(url) ? url : null;
};

const isDownloadPhase = (): boolean => new URLSearchParams(location.search).has('secure_dl');

const isGatePage = (): boolean => !isDownloadPhase() && GATE_RE.test(document.documentElement.innerHTML);

const isReadyPage = (): boolean => !!document.getElementById('finalDlBtn') && !!linkIn(document.documentElement.innerHTML);

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

const unlockBody = (d: Data): URLSearchParams => {
  const body = new URLSearchParams({
    cf_cache_buster: String(Date.now()),
    system_route: 'ii',
    basename: d.basename ?? '',
  });
  if (d.post_title) body.set('post_title', d.post_title);
  if (d.post_link) body.set('post_link', d.post_link);
  return body;
};

const submitUnlock = (d: Data): void => {
  const f = document.createElement('form');
  f.method = 'POST';
  f.action = d.actionUrl ?? `${location.origin}/`;
  for (const [name, value] of unlockBody(d)) {
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

const unlock = async (d: Data): Promise<void> => {
  mount('Decoding your link…');
  const res = await fetch(d.actionUrl ?? `${location.origin}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: unlockBody(d),
    credentials: 'include',
    redirect: 'manual',
  });
  if (res.type === 'opaqueredirect' || (res.status >= 300 && res.status < 400)) {
    submitUnlock(d);
    return;
  }
  const url = res.ok ? linkIn(await res.text()) : null;
  if (!url) throw new Error('shycloud unlock');
  navigate(url);
};

const run = (): void => {
  if (isDownloadPhase()) return;
  if (isGatePage()) {
    stopPageTimers();
    const o = mount('Starting download…');
    triggerDownload(`${location.pathname}?secure_dl=1`);
    o.remove();
    ui = null;
    return;
  }
  if (isReadyPage()) {
    const url = linkIn(document.documentElement.innerHTML);
    if (url) navigate(url);
    return;
  }
  if (!isWaitPage()) return;
  const data = parseData();
  if (data?.canPost && data.basename) void unlock(data);
};

export function initShycloudMediatorPage(): void {
  if (window !== window.top || !isAllowedHost(SHYCLOUD_HOSTS)) return;
  whenDomParsed(run);
}
