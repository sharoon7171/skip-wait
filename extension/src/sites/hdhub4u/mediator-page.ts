import { isRemoteSite } from '../../hosts/check';
import { whenDomParsed } from '../../utils/domain-check';
import { createOverlay } from './overlay';

const MEDIATOR_PATH = /^\/homelander\/?$/i;
const STORAGE_KEY = 'o';

type StoredEntry = { value?: unknown; expiry?: unknown };
type MediatorPayload = { o?: unknown };

const mount = createOverlay('skip-wait-hdhub4u-mediator', 'skip-wait-hdhub4u-mediator-boot', {
  lead: 'Hang tight — opening the next page.',
  detail: "You don't need to tap anything on the page.",
});

const rotateLetters = (s: string): string =>
  s.replace(/[a-zA-Z]/g, (c) => {
    const n = c.charCodeAt(0);
    return String.fromCharCode(n >= 97 ? ((n - 84) % 26) + 97 : ((n - 52) % 26) + 65);
  });

function resolveDestination(): string | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const { value, expiry } = JSON.parse(raw) as StoredEntry;
    if (typeof value !== 'string' || typeof expiry !== 'number') return null;
    if (Date.now() > expiry) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    const { o } = JSON.parse(atob(rotateLetters(atob(atob(value))))) as MediatorPayload;
    if (typeof o !== 'string') return null;
    const { protocol, href } = new URL(atob(o));
    return protocol === 'https:' || protocol === 'http:' ? href : null;
  } catch {
    return null;
  }
}

export function initHdhub4uMediatorPage(): void {
  if (window !== window.top) return;
  const isEntry = new URLSearchParams(location.search).has('id');
  if (!isEntry && !MEDIATOR_PATH.test(location.pathname)) return;

  void isRemoteSite('hdhub4u-mediator').then((ok) => {
    if (!ok) return;

    const overlay = mount('Opening the next page…');
    const open = (): boolean => {
      const destination = resolveDestination();
      if (destination) location.replace(destination);
      return destination !== null;
    };

    if (!isEntry && open()) return;
    whenDomParsed(() => {
      if (!open()) overlay.setError('Could not open the next page. Reload and try again.');
    });
  });
}
