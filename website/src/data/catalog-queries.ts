import type { SupportedBypass } from '@/types/catalog';
import { bypasses } from '@/data/catalog';

function byName(a: SupportedBypass, b: SupportedBypass): number {
  return a.name.localeCompare(b.name);
}

export function totalBypasses(): number {
  return bypasses.length;
}

export function allDomains(): string[] {
  return bypasses.flatMap((entry) => [...entry.domains]);
}

export function totalDomains(): number {
  return allDomains().length;
}

export function matchesSearch(entry: SupportedBypass, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return true;
  }

  if (entry.name.toLowerCase().includes(needle)) {
    return true;
  }
  if (entry.bypass.toLowerCase().includes(needle)) {
    return true;
  }
  if (entry.description.toLowerCase().includes(needle)) {
    return true;
  }

  return entry.domains.some((domain) => domain.toLowerCase().includes(needle));
}

export function searchCatalog(query: string): SupportedBypass[] {
  return bypasses.filter((entry) => matchesSearch(entry, query)).sort(byName);
}

const FEATURED_BYPASS_NAMES = [
  'Linkvertise',
  'LootLabs',
  'Ouo',
  'Droplink',
  'ShrinkMe',
  'AdFocus',
  'Mirrored.to',
  'MultiUp',
  'MP4Upload',
  'FilePress',
] as const;

export function featuredBypasses(count: number): SupportedBypass[] {
  const entriesByName = new Map(bypasses.map((entry) => [entry.name, entry]));
  const picked: SupportedBypass[] = [];

  for (const name of FEATURED_BYPASS_NAMES) {
    if (picked.length >= count) {
      break;
    }
    const entry = entriesByName.get(name);
    if (entry) {
      picked.push(entry);
    }
  }

  if (picked.length >= count) {
    return picked;
  }

  for (const entry of [...bypasses].sort(byName)) {
    if (picked.length >= count) {
      break;
    }
    if (!picked.some((item) => item.name === entry.name)) {
      picked.push(entry);
    }
  }

  return picked;
}
