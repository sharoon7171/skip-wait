import { MSG_ARM, MSG_MEDIATOR, MSG_OPEN } from './hosts';

type ArmMsg = { type: typeof MSG_ARM; url: string; referer: string };
type OpenMsg = { type: typeof MSG_OPEN; url: string };
type MediatorMsg = { type: typeof MSG_MEDIATOR; shortUrl: string; assigned: string };

export const armUnlockReferer = (url: string, referer: string): Promise<boolean> =>
  new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: MSG_ARM, url, referer } satisfies ArmMsg, (ok?: boolean) => {
      resolve(!chrome.runtime.lastError && ok === true);
    });
  });

export const openDestinationTab = (url: string): Promise<boolean> =>
  new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: MSG_OPEN, url } satisfies OpenMsg, (ok?: boolean) => {
      resolve(!chrome.runtime.lastError && ok === true);
    });
  });

export const resolveMediatorReferer = (shortUrl: string, assigned: string): Promise<string | null> =>
  new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { type: MSG_MEDIATOR, shortUrl, assigned } satisfies MediatorMsg,
      (referer?: string | null) => {
        resolve(!chrome.runtime.lastError && typeof referer === 'string' ? referer : null);
      },
    );
  });
