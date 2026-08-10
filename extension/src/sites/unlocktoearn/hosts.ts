import { hostnameMatches } from '../../utils/domain-check';

export const UNLOCKTOEARN_HOSTS = ['unlocktoearn.com'] as const;

export function isUnlocktoearnHost(hostname: string): boolean {
  return hostnameMatches(hostname, UNLOCKTOEARN_HOSTS);
}
