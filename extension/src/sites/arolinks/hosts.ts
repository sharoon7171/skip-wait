import { hostnameMatches } from '../../utils/domain-check';

export const AROLINKS_HOSTS = ['arolinks.com', 'vplink.in'] as const;
export const AROLINKS_UNLOCK_READY_MS = 25_000;
export const AROLINKS_DEST_WAIT_MS = 60_000;
export const AROLINKS_DEST_WAIT_HOSTS = ['studyspark.study'] as const;
export const AROLINKS_GATE_VALUE = 'insurance,online_colleges,study_abroad,finance,loan';

export function isTimedDestUrl(href: string): boolean {
  try {
    return hostnameMatches(new URL(href).hostname, AROLINKS_DEST_WAIT_HOSTS);
  } catch {
    return false;
  }
}
