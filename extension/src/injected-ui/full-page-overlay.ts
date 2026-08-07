import {
  buildFullPageOverlayCss,
  overlayActiveClass,
  overlayClasses,
} from './overlay-styles';

const BLOCKED_EVENTS = [
  'click',
  'mousedown',
  'mouseup',
  'touchstart',
  'touchend',
  'wheel',
  'keydown',
] as const;

export type FullPageOverlayNote = {
  lead: string;
  detail?: string;
};

export type FullPageOverlayOptions = {
  id: string;
  brand?: string;
  note: FullPageOverlayNote;
  status?: string;
  countdownLabel?: string;
  countdownHint?: string;
};

export type FullPageOverlay = {
  turnstileMount: HTMLElement;
  setStatus: (text: string) => void;
  setNote: (note: FullPageOverlayNote) => void;
  setError: (text: string | null) => void;
  setAction: (href: string | null, label?: string) => void;
  startCountdown: (endTs: number) => void;
  stopCountdown: () => void;
  hideCountdown: () => void;
  remove: () => void;
};

function fillNote(el: HTMLElement, note: FullPageOverlayNote): void {
  el.replaceChildren();
  const lead = document.createElement('div');
  lead.className = overlayClasses.noteLead;
  lead.textContent = note.lead;
  el.appendChild(lead);
  if (note.detail) {
    const detail = document.createElement('div');
    detail.className = overlayClasses.noteDetail;
    detail.textContent = note.detail;
    el.appendChild(detail);
  }
}

function mountOverlayRoot(id: string, css: string): HTMLElement {
  const root = document.createElement('div');
  root.id = id;
  const style = document.createElement('style');
  style.textContent = css;
  root.appendChild(style);
  return root;
}

function isInteractiveTarget(_root: HTMLElement, event: Event): boolean {
  return event.composedPath().some(
    (n) =>
      n instanceof Element &&
      (n.closest(`.${overlayClasses.turnstile}`) != null ||
        n.closest(`.${overlayClasses.action}`) != null),
  );
}

function blockOverlayEvents(root: HTMLElement): void {
  for (const type of BLOCKED_EVENTS) {
    root.addEventListener(
      type,
      (event) => {
        if (isInteractiveTarget(root, event)) return;
        event.preventDefault();
        event.stopPropagation();
      },
      true,
    );
  }
}

export function createFullPageOverlay(options: FullPageOverlayOptions): FullPageOverlay {
  const { id, brand = '', note, status = '', countdownLabel = '', countdownHint } = options;
  const cl = overlayClasses;

  const activeClass = overlayActiveClass(id);
  const root = mountOverlayRoot(id, buildFullPageOverlayCss(id, activeClass));

  document.documentElement.classList.add(activeClass);
  blockOverlayEvents(root);

  const card = document.createElement('div');
  card.className = cl.card;

  const brandEl = document.createElement('div');
  brandEl.className = cl.brand;
  brandEl.textContent = brand;

  const noteEl = document.createElement('div');
  noteEl.className = cl.note;
  fillNote(noteEl, note);

  const statusEl = document.createElement('div');
  statusEl.className = cl.status;
  statusEl.textContent = status;

  const count = document.createElement('div');
  count.className = `${cl.count} ${cl.hidden}`;

  const countLabel = document.createElement('div');
  countLabel.className = `${cl.countLabel} ${cl.hidden}`;
  countLabel.textContent = countdownLabel;

  const turnstileMount = document.createElement('div');
  turnstileMount.className = cl.turnstile;
  turnstileMount.id = `${id}-turnstile`;

  const actionEl = document.createElement('a');
  actionEl.className = `${cl.action} ${cl.hidden}`;
  actionEl.rel = 'noopener';

  card.append(brandEl, noteEl, statusEl, count, countLabel);

  let countHint: HTMLElement | null = null;
  if (countdownHint) {
    countHint = document.createElement('div');
    countHint.className = `${cl.countHint} ${cl.hidden}`;
    countHint.textContent = countdownHint;
    card.appendChild(countHint);
  }

  const err = document.createElement('div');
  err.className = cl.err;
  card.append(err, actionEl, turnstileMount);
  root.appendChild(card);
  document.documentElement.appendChild(root);

  const keepOnTop = new MutationObserver(() => {
    if (root.parentElement !== document.documentElement) {
      document.documentElement.appendChild(root);
      return;
    }
    if (document.documentElement.lastElementChild !== root) {
      document.documentElement.appendChild(root);
    }
  });
  keepOnTop.observe(document.documentElement, { childList: true });

  let rafId = 0;

  const setCountdownVisible = (visible: boolean): void => {
    count.classList.toggle(cl.hidden, !visible);
    countLabel.classList.toggle(cl.hidden, !visible);
    countHint?.classList.toggle(cl.hidden, !visible);
  };

  const stopCountdown = (hide: boolean): void => {
    cancelAnimationFrame(rafId);
    rafId = 0;
    if (hide) setCountdownVisible(false);
  };

  return {
    turnstileMount,
    setStatus(text) {
      stopCountdown(true);
      statusEl.textContent = text;
    },
    setNote(nextNote) {
      fillNote(noteEl, nextNote);
    },
    setError(text) {
      err.textContent = text ?? '';
    },
    setAction(href, label = 'Direct Download · Skip Wait') {
      if (!href) {
        actionEl.removeAttribute('href');
        actionEl.classList.add(cl.hidden);
        actionEl.textContent = '';
        return;
      }
      actionEl.href = href;
      actionEl.textContent = label;
      actionEl.classList.remove(cl.hidden);
    },
    startCountdown(endTs) {
      setCountdownVisible(true);
      const tick = (): void => {
        const left = endTs - Date.now();
        count.textContent = `${(Math.max(0, left) / 1000).toFixed(2)} s`;
        if (left <= 0) {
          rafId = 0;
          return;
        }
        rafId = requestAnimationFrame(tick);
      };
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    },
    stopCountdown: () => stopCountdown(false),
    hideCountdown: () => stopCountdown(true),
    remove() {
      stopCountdown(true);
      keepOnTop.disconnect();
      root.remove();
      document.documentElement.classList.remove(activeClass);
    },
  };
}
