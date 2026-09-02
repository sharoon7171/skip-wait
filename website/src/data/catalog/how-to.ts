import type { BypassStep } from '@/types/catalog';
import { FREE, LICENSE } from '@/data/constants';

export const bypassHowToSteps: readonly BypassStep[] = [
  {
    title: 'Install Skip Wait',
    body: `Add Skip Wait from the Chrome Web Store. You get ${FREE.dailyLimit} free bypasses each day with no key. Skip Wait then runs on matching pages. For unlimited use, get a ${LICENSE.trialLabel.toLowerCase()} or monthly license on EAS Store, paste the key in the popup, and tap Activate.`,
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
    body: 'Keep the tab open. Skip Wait skips the timer or clicks Continue for you, then opens the destination.',
  },
] as const;
