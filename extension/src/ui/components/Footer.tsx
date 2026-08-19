import { CHROME_WEB_STORE_LISTING_URL } from '../constants';
import { IconStar } from './icons';

const SQ_TECH_URL = 'https://www.sqtech.dev/';

export function Footer(): React.ReactElement {
  return (
    <footer className="flex items-center justify-between gap-4 border-t border-neutral-200/80 px-5 py-3">
      <a
        href={CHROME_WEB_STORE_LISTING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-ink no-underline transition-colors hover:text-primary-700"
      >
        <span className="flex gap-0.5 text-warning-500" aria-hidden>
          <IconStar className="size-3.5" />
          <IconStar className="size-3.5" />
          <IconStar className="size-3.5" />
          <IconStar className="size-3.5" />
          <IconStar className="size-3.5" />
        </span>
        Leave a review
      </a>
      <p className="text-[0.75rem] font-medium text-ink-soft">
        Developed by{' '}
        <a
          href={SQ_TECH_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-ink no-underline transition-colors hover:text-primary-700"
        >
          SQ Tech
        </a>
      </p>
    </footer>
  );
}
