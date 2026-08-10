import type { BypassStep } from '@/types/catalog';

export const bypassHowToSteps: readonly BypassStep[] = [
  {
    title: 'Install Skip Wait',
    body: 'Add the free extension from the Chrome Web Store. Matching pages unlock automatically—no account.',
  },
  {
    title: 'Leave it enabled',
    body: 'Keep Skip Wait on in Chrome. There is nothing to configure per link.',
  },
  {
    title: 'Open the link as usual',
    body: 'Use the same shared URL from chat, a download page, or a site. No paste tool.',
  },
  {
    title: 'Stay on the tab',
    body: 'Skip Wait handles the wait or unlock path. When it is ready, you continue to the destination.',
  },
] as const;
