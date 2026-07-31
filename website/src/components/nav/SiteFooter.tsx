import Link from 'next/link';
import { CHROME_WEB_STORE_URL, CONTACT, REQUEST_SUPPORT_URL, SITE } from '@/data/constants';
import { routes } from '@/lib/routes';
import { Shell } from '@/components/ui/Shell';

const footerLink =
  'text-caption font-medium text-ink-inverse-body no-underline transition-colors hover:text-white';

export function SiteFooter(): React.ReactElement {
  return (
    <footer className="bg-primary-950">
      <Shell className="py-12 lg:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <div className="inline-flex items-center gap-2.5">
              <img src="/icon.png" alt="" width={28} height={28} className="size-7" />
              <span className="font-display text-title font-extrabold tracking-tight text-ink-inverse">
                {SITE.name}
              </span>
            </div>
            <p className="mt-4 text-body-sm text-ink-inverse-body">{SITE.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-14">
            <div>
              <p className="text-overline uppercase text-primary-300">Product</p>
              <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
                <li>
                  <Link href={routes.home} className={footerLink}>
                    Home
                  </Link>
                </li>
                <li>
                  <a
                    href={CHROME_WEB_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLink}
                  >
                    Chrome Web Store
                  </a>
                </li>
                <li>
                  <Link href={routes.sites} className={footerLink}>
                    Supported Sites
                  </Link>
                </li>
                <li>
                  <Link href={`${routes.home}#how-it-works`} className={footerLink}>
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href={`${routes.home}#faq`} className={footerLink}>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-overline uppercase text-primary-300">Support</p>
              <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
                <li>
                  <a
                    href={REQUEST_SUPPORT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLink}
                  >
                    Request a Site
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLink}
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLink}
                  >
                    Telegram
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-overline uppercase text-primary-300">Legal</p>
              <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
                <li>
                  <Link href={routes.privacy} className={footerLink}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href={routes.terms} className={footerLink}>
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <a href={`mailto:${CONTACT.email}`} className={footerLink}>
                    {CONTACT.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Shell>

      <div className="border-t border-white/10">
        <Shell className="py-5 text-caption text-ink-inverse-soft">
          <p>
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </Shell>
      </div>
    </footer>
  );
}
