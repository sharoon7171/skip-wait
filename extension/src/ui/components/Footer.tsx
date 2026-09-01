import { footerMeta, footerReview, footerShell } from '../../../ui-classes/popup';
import { CHROME_WEB_STORE_LISTING_URL, CONTACT } from '../constants';
import { IconStar } from './icons';

export function Footer(): React.ReactElement {
  return (
    <footer className={footerShell}>
      <a href={CHROME_WEB_STORE_LISTING_URL} target="_blank" rel="noopener noreferrer" className={footerReview}>
        <IconStar className="size-3.5 text-warning-500" />
        Rate on Chrome Store
      </a>
      <p className={footerMeta}>
        Developed by{' '}
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-ink no-underline hover:text-primary-700"
        >
          Sharoon
        </a>
      </p>
    </footer>
  );
}
