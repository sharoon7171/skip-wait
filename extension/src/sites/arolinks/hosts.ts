import { hostnameMatches } from '../../utils/domain-check';

export const AROLINKS_HOSTS = ['arolinks.com', 'vplink.in'] as const;

export const AROLINKS_MEDIATOR_HOSTS = [
  'darkguruji.com',
  'howdyrecipes.com',
  'srtak.com',
  'techcornernews.com',
  'theimmigrationworld.com',
] as const;

export const AROLINKS_WAIT_MS = 60_000;
export const AROLINKS_WAIT_HOSTS = ['studyspark.study'] as const;

export const AROLINKS_GATE_COOKIE = 'insurance,online_colleges,study_abroad,finance,loan';

export const AROLINKS_GATE_COOKIE_NAMES = ['adcadg', 'eonstudb', 'eonudb'] as const;

export function isTimedDestUrl(href: string): boolean {
  try {
    return hostnameMatches(new URL(href).hostname, AROLINKS_WAIT_HOSTS);
  } catch {
    return false;
  }
}
