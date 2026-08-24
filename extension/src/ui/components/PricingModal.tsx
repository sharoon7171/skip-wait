import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  CONTACT,
  GUMROAD_URL,
  PRICE_CARD,
  PRICE_CRYPTO,
  assetUrl,
} from '../constants';
import { IconClose } from './icons';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function PricingModal({ open, onClose }: Props): React.ReactElement | null {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/45 p-4 font-sans antialiased">
      <button type="button" aria-label="Close" className="absolute inset-0 cursor-default" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pricing-title"
        className="relative w-full max-w-[26rem] overflow-hidden rounded-card bg-surface-canvas shadow-[0_24px_48px_-20px_oklch(0.2_0.015_264/0.55)] ring-1 ring-neutral-200"
      >
        <div className="flex items-start justify-between gap-3 border-b border-neutral-200/80 px-4 py-3">
          <div className="min-w-0">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-soft">Pricing</p>
            <h2 id="pricing-title" className="mt-0.5 text-[0.9375rem] font-bold tracking-tight text-ink">
              Buy a Skip Wait license
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-ink-soft ring-1 ring-neutral-300 transition-colors hover:bg-neutral-50 hover:text-ink"
          >
            <IconClose className="size-4" />
          </button>
        </div>

        <div className="space-y-3 px-4 py-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-card bg-primary-600 px-3 py-2.5 text-ink-inverse">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-primary-200">Card</p>
              <p className="mt-0.5 text-[1.125rem] font-extrabold tracking-tight">{PRICE_CARD}</p>
              <p className="text-[0.75rem] font-medium text-primary-100">per month · Gumroad</p>
            </div>
            <div className="rounded-card bg-surface-muted px-3 py-2.5 ring-1 ring-neutral-200">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-soft">Crypto</p>
              <p className="mt-0.5 text-[1.125rem] font-extrabold tracking-tight text-ink">{PRICE_CRYPTO}</p>
              <p className="text-[0.75rem] font-medium text-ink-soft">per month · direct pay</p>
            </div>
          </div>

          <div className="space-y-2 text-[0.8125rem] font-medium leading-snug text-ink-soft">
            <p>
              <span className="font-semibold text-ink">Card ({PRICE_CARD}/mo):</span> buy on Gumroad. The license guide
              downloads immediately; we email your key to the Gumroad purchase address.
            </p>
            <p>
              <span className="font-semibold text-ink">Crypto ({PRICE_CRYPTO}/mo):</span> direct crypto only — not on
              Gumroad. Message Telegram or email for payment details, then we send the key.
            </p>
            <p>
              <span className="font-semibold text-ink">Trial:</span> available on request — email or Telegram for a
              trial key.
            </p>
            <p>One device per key.</p>
          </div>

          <a
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-full items-center justify-center rounded-full bg-primary-600 text-[0.8125rem] font-semibold text-white no-underline transition-colors hover:bg-primary-700"
          >
            Buy with card on Gumroad
          </a>

          <div className="grid grid-cols-2 gap-1.5">
            <a
              href={CONTACT.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-surface-canvas text-[0.75rem] font-semibold text-ink no-underline ring-1 ring-neutral-300 transition-colors hover:bg-primary-50 hover:text-primary-700 hover:ring-primary-300"
            >
              <img src={assetUrl('icons/telegram.png')} alt="" className="size-4" width={16} height={16} />
              Telegram
            </a>
            <a
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Skip Wait license / trial')}`}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-surface-canvas text-[0.75rem] font-semibold text-ink no-underline ring-1 ring-neutral-300 transition-colors hover:bg-primary-50 hover:text-primary-700 hover:ring-primary-300"
            >
              <img src={assetUrl('icons/email.png')} alt="" className="size-4" width={16} height={16} />
              Email
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}