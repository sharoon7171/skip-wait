import {
  overlayActiveClass,
  overlayCardCss,
  overlayClasses,
  overlayCountdownCss,
  overlayPageLockCss,
  overlayRootCss,
  overlayTurnstileMountCss,
} from '../../injected-ui/overlay-styles';
import { OVERLAY_ID } from './hosts';

type Note = { lead: string; detail: string };

const cl = overlayClasses;
const COUNTDOWN_LABEL = 'Your link opens in';
const uiCss =
  overlayRootCss(OVERLAY_ID) +
  overlayCardCss(OVERLAY_ID) +
  overlayCountdownCss(OVERLAY_ID) +
  overlayTurnstileMountCss(OVERLAY_ID);

let root: HTMLElement | null = null;
let turnstileMount: HTMLElement | null = null;
let statusEl: HTMLElement | null = null;
let noteEl: HTMLElement | null = null;
let countEl: HTMLElement | null = null;
let countLabelEl: HTMLElement | null = null;
let locked = false;
let countRaf = 0;

const ensureRoot = (): void => {
  if (root?.isConnected) return;
  document.documentElement.classList.add(overlayActiveClass(OVERLAY_ID));

  root = document.createElement('div');
  root.id = OVERLAY_ID;
  const style = document.createElement('style');
  style.textContent = uiCss;
  root.appendChild(style);

  const card = document.createElement('div');
  card.className = cl.card;

  const brand = document.createElement('div');
  brand.className = cl.brand;
  brand.textContent = 'Skip Wait';

  noteEl = document.createElement('div');
  noteEl.className = cl.note;

  statusEl = document.createElement('div');
  statusEl.className = cl.status;

  countEl = document.createElement('div');
  countEl.className = `${cl.count} ${cl.hidden}`;

  countLabelEl = document.createElement('div');
  countLabelEl.className = `${cl.countLabel} ${cl.hidden}`;
  countLabelEl.textContent = COUNTDOWN_LABEL;

  turnstileMount = document.createElement('div');
  turnstileMount.className = cl.turnstile;

  card.append(brand, noteEl, statusEl, countEl, countLabelEl, turnstileMount);
  root.appendChild(card);
  document.documentElement.appendChild(root);
};

const fillNote = (note: Note): void => {
  if (!noteEl) return;
  noteEl.replaceChildren();
  const lead = document.createElement('div');
  lead.className = cl.noteLead;
  lead.textContent = note.lead;
  noteEl.appendChild(lead);
  if (note.detail) {
    const detail = document.createElement('div');
    detail.className = cl.noteDetail;
    detail.textContent = note.detail;
    noteEl.appendChild(detail);
  }
};

const applyLock = (): void => {
  if (locked) return;
  locked = true;
  const boot = document.createElement('style');
  boot.id = `${OVERLAY_ID}-lock`;
  boot.textContent = overlayPageLockCss(OVERLAY_ID, overlayActiveClass(OVERLAY_ID));
  document.head.appendChild(boot);
};

const stopCountdownTick = (): void => {
  cancelAnimationFrame(countRaf);
  countRaf = 0;
};

export const overlay = {
  mount: (): HTMLElement => {
    ensureRoot();
    return turnstileMount!;
  },
  showCaptcha: (note: Note, status: string): void => {
    ensureRoot();
    fillNote(note);
    statusEl!.textContent = status;
  },
  showLocked: (note: Note, status: string): void => {
    ensureRoot();
    applyLock();
    fillNote(note);
    statusEl!.textContent = status;
  },
  startCountdown: (endTs: number): void => {
    ensureRoot();
    applyLock();
    countEl!.classList.remove(cl.hidden);
    countLabelEl!.classList.remove(cl.hidden);
    stopCountdownTick();
    const tick = (): void => {
      const left = endTs - Date.now();
      countEl!.textContent = `${(Math.max(0, left) / 1000).toFixed(2)} s`;
      if (left <= 0) {
        countRaf = 0;
        return;
      }
      countRaf = requestAnimationFrame(tick);
    };
    tick();
  },
  hideCountdown: (): void => {
    stopCountdownTick();
    countEl?.classList.add(cl.hidden);
    countLabelEl?.classList.add(cl.hidden);
  },
  error: (status: string): void => {
    ensureRoot();
    applyLock();
    stopCountdownTick();
    fillNote({ lead: 'Something went wrong.', detail: status });
    statusEl!.textContent = '';
  },
};
