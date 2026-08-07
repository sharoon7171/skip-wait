export const EARNLINKS_UNLOCK_HOSTS = ['earnlinks.in', 'linksgo.in'] as const;

export const EARNLINKS_INTERMEDIATE_HOSTS = ['itiexamshala.com', 'nameefy.com'] as const;

export const EARNLINKS_RETURN_HOST: Record<(typeof EARNLINKS_INTERMEDIATE_HOSTS)[number], string> = {
  'itiexamshala.com': 'earnlinks.in',
  'nameefy.com': 'linksgo.in',
};
