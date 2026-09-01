import type { BypassStep } from '@/types/catalog';
import { LICENSE } from '@/data/constants';

export const bypassHowToSteps: readonly BypassStep[] = [
  {
    title: 'Install Skip Wait',
    body: `Add Skip Wait from the Chrome Web Store, get a ${LICENSE.trialLabel.toLowerCase()} or monthly license on EAS Store, paste the key in the popup, and tap Activate. Matching pages then unlock automatically.`,
  },
  {
    title: 'Leave it enabled',
    body: 'Keep Skip Wait on in Chrome. Tap Refresh in the popup when we add new sites—no reinstall.',
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
