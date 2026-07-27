import { hostnameMatches } from '../../utils/domain-check';

export const TIPSGURU_HOSTS = [
  'tipsguru.in',
  'vidyarays.com',
  'mineverse360.com',
] as const;

export const TIPSGURU_WAIT_MS = 252_000;

export const TIPSGURU_WAIT_HOSTS = [
  'stream.testuk.org',
  'rarestudy.in',
  's3-cdn.samfygros.com',
] as const;

export function decodeProlinkDest(id: string): string | null {
  try {
    const raw = id.replace(/-/g, '+').replace(/_/g, '/');
    const padded = raw + '='.repeat((4 - (raw.length % 4)) % 4);
    const dest = atob(padded).trim();
    return /^https?:\/\//i.test(dest) ? dest : null;
  } catch {
    return null;
  }
}

export function isTimedDestUrl(href: string): boolean {
  try {
    return hostnameMatches(new URL(href).hostname, TIPSGURU_WAIT_HOSTS);
  } catch {
    return false;
  }
}
