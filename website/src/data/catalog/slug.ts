import type { SupportedBypass } from '@/types/catalog';
import { PRICE } from '@/data/constants';

function slugFromBypassName(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/\s*\/\s*/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
  return `${base}-bypass`;
}

export function bypassSlug(entry: SupportedBypass): string {
  return slugFromBypassName(entry.name);
}

export function bypassPageTitle(entry: SupportedBypass): string {
  return `${entry.name} Bypass — ${PRICE.summary} Chrome Extension`;
}
