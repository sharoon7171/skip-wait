import { hostnameMatches } from '../../utils/domain-check';

export const JOBSHEEL_HOSTS = ['jobsheel.com'] as const;
export const JOBSHEEL_HOME = `https://${JOBSHEEL_HOSTS[0]}/`;

export function isJobsheelHost(hostname: string): boolean {
  return hostnameMatches(hostname, JOBSHEEL_HOSTS);
}
