import type { SupportedBypass } from '@/types/catalog';
import { bypasses } from './registry';
import { bypassSlug } from './slug';

function byName(a: SupportedBypass, b: SupportedBypass): number {
  return a.name.localeCompare(b.name);
}

function shuffled<T>(items: readonly T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const current = next[i]!;
    next[i] = next[j]!;
    next[j] = current;
  }
  return next;
}

export function totalBypasses(): number {
  return bypasses.length;
}

function allDomains(): string[] {
  return [...new Set(bypasses.flatMap((entry) => [...entry.domains]))];
}

export function totalDomains(): number {
  return allDomains().length;
}

export function shuffledDomains(): string[] {
  return shuffled(allDomains());
}

export function sampleBypasses(count: number): SupportedBypass[] {
  return shuffled(bypasses).slice(0, count);
}

function matchesSearch(entry: SupportedBypass, query: string): boolean {
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
  if (entry.keywords.some((keyword) => keyword.toLowerCase().includes(needle))) {
    return true;
  }

  return entry.domains.some((domain) => domain.toLowerCase().includes(needle));
}

export function searchCatalog(query: string): SupportedBypass[] {
  return bypasses.filter((entry) => matchesSearch(entry, query)).sort(byName);
}

export function bypassBySlug(slug: string): SupportedBypass | undefined {
  return bypasses.find((entry) => bypassSlug(entry) === slug);
}

export function allBypassSlugs(): readonly string[] {
  return bypasses.map((entry) => bypassSlug(entry));
}
