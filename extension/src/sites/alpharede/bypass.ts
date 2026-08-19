import { isRemoteSite } from '../../hosts/check';
import { createFullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';

const ID = 'skip-wait-alpharede-overlay';
const BOOT = 'skip-wait-alpharede-boot';
const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

type Session = {
  hasSession: true;
  sessionToken: string;
  stageId: number;
  stageNumber: number;
  totalStage: number;
};

let started = false;

const mount = (status: string) => {
  const active = overlayActiveClass(ID);
  document.documentElement.classList.add(active);
  if (!document.getElementById(BOOT)) {
    const el = document.createElement('style');
    el.id = BOOT;
    el.textContent = buildFullPageOverlayCss(ID, active);
    document.documentElement.appendChild(el);
  }
  return createFullPageOverlay({ id: ID, brand: 'Skip Wait', note: NOTE, status });
};

const resolve = async (): Promise<string> => {
  const j = (await (await fetch('/api/session-info', { credentials: 'include', cache: 'no-store' })).json()) as Partial<Session>;
  if (
    j.hasSession !== true ||
    typeof j.sessionToken !== 'string' ||
    !j.sessionToken ||
    typeof j.stageId !== 'number' ||
    typeof j.stageNumber !== 'number' ||
    typeof j.totalStage !== 'number' ||
    j.totalStage < 1
  ) {
    throw new Error('session');
  }
  for (let progress = j.stageNumber + 1; progress <= j.totalStage + 1; progress++) {
    const input = encodeURIComponent(
      JSON.stringify({ '0': { json: { token: j.sessionToken, progress, stageId: j.stageId } } }),
    );
    const body = (await (
      await fetch(`/api/trpc/linkSession.nextStage?batch=1&input=${input}`, {
        credentials: 'include',
        cache: 'no-store',
      })
    ).json()) as [{ result?: { data?: { json?: { destinationLink?: string | null } } } }];
    const link = body[0]?.result?.data?.json?.destinationLink;
    if (typeof link === 'string' && /^https?:\/\//i.test(link)) return link;
  }
  throw new Error('dest');
};

export const initAlpharedeBypass = (): void => {
  if (window !== window.top || started) return;
  void isRemoteSite('alpharede').then((ok) => {
    if (!ok || started) return;
    started = true;
    const overlay = mount('Unlocking Alpharede…');
    void (async () => {
      try {
        const url = await resolve();
        overlay.setStatus('Redirecting now…');
        location.replace(url);
      } catch {
        started = false;
        overlay.setError('Could not unlock this link. Reload and try again.');
      }
    })();
  });
};
