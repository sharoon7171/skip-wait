import { hostnameMatches } from '../../utils/domain-check';
import { FILECR_HOSTS, MSG_FILECR_ROUTE } from './hosts';

type RouteListener = () => void;

let hooked = false;
const listeners = new Set<RouteListener>();
let lastKey = '';

function notify(): void {
  for (const fn of listeners) fn();
}

function currentKey(): string {
  return `${location.pathname}${location.search}${location.hash}`;
}

function notifyIfKeyChanged(): void {
  const key = currentKey();
  if (key === lastKey) return;
  lastKey = key;
  notify();
}

function hookHistory(): void {
  if (hooked) return;
  hooked = true;
  lastKey = currentKey();

  const wrap =
    (original: typeof history.pushState): typeof history.pushState =>
    function (this: History, ...args: Parameters<typeof history.pushState>) {
      const ret = original.apply(this, args);
      queueMicrotask(notifyIfKeyChanged);
      return ret;
    };
  history.pushState = wrap(history.pushState.bind(history));
  history.replaceState = wrap(history.replaceState.bind(history));
  window.addEventListener('popstate', notifyIfKeyChanged);

  window.setInterval(notifyIfKeyChanged, 250);

  try {
    chrome.runtime.onMessage.addListener((message) => {
      if (message?.type !== MSG_FILECR_ROUTE) return;
      notifyIfKeyChanged();
    });
  } catch {
    /* extension messaging unavailable */
  }
}

export function onFilecrRoute(listener: RouteListener): void {
  try {
    if (!hostnameMatches(location.hostname, FILECR_HOSTS)) return;
  } catch {
    return;
  }
  listeners.add(listener);
  hookHistory();
  listener();
}
