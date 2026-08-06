export const ENTRY_HOSTS = ['shrtslug.biz'] as const;

export const MEDIATOR_HOSTS = [
  'technons.com',
  'tournguide.com',
  'dailyjobposting.xyz',
  'financefernly.com',
] as const;

export const MEDIATOR_ACTIONS = new Set(['captcha', 'progressbar', 'countdown']);

export const FORM_SEL = 'form[action*="api-endpoint/verify"]' as const;
