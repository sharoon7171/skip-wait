import type { SupportedBypass } from '@/types/catalog';
import { bypasses } from '@/data/catalog';

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

export function allDomains(): string[] {
  return bypasses.flatMap((entry) => [...entry.domains]);
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

  return entry.domains.some((domain) => domain.toLowerCase().includes(needle));
}

export function searchCatalog(query: string): SupportedBypass[] {
  return bypasses.filter((entry) => matchesSearch(entry, query)).sort(byName);
}
