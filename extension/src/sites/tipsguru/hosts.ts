import { canBypassHost } from '../../gate';

export const TIPSGURU_WAIT_MS = 252_000;

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

export async function isTimedDestUrl(href: string): Promise<boolean> {
  try {
    return canBypassHost(new URL(href).hostname, 'tipsguru-wait');
  } catch {
    return false;
  }
}
