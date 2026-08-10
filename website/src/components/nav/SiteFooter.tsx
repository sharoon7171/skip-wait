import { CHROME_WEB_STORE_URL, CONTACT, REQUEST_SUPPORT_URL, SITE } from '@/data/constants';
import { homeSections, routes } from '@/lib/routes';
import { AppLink } from '@/components/nav/AppLink';
import { BrandIcon } from '@/components/ui/icons';
import { Shell } from '@/components/ui/Shell';
import { TrackedAnchor } from '@/components/ui/TrackedAnchor';

const footerLink =
  'text-caption font-medium text-ink-inverse-body no-underline transition-colors hover:text-white';

export function SiteFooter(): React.ReactElement {
  return (
    <footer className="bg-primary-950">
      <Shell className="py-12 lg:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <div className="inline-flex items-center gap-2.5">
              <BrandIcon size={28} className="size-7" />
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
                  <AppLink href={routes.home} className={footerLink}>
                    Home
                  </AppLink>
                </li>
                <li>
                  <TrackedAnchor
                    href={CHROME_WEB_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLink}
                    chromeWebStoreFooter
                  >
                    Chrome Web Store
                  </TrackedAnchor>
                </li>
                <li>
                  <AppLink href={routes.sites} className={footerLink}>
                    Supported Sites
                  </AppLink>
                </li>
                <li>
                  <AppLink href={routes.guidesAndroid} className={footerLink}>
                    Install on Android
                  </AppLink>
                </li>
                <li>
                  <AppLink href={homeSections.howItWorks} className={footerLink}>
                    How It Works
                  </AppLink>
                </li>
                <li>
                  <AppLink href={homeSections.faq} className={footerLink}>
                    FAQ
                  </AppLink>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-overline uppercase text-primary-300">Support</p>
              <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
                <li>
                  <TrackedAnchor
                    href={REQUEST_SUPPORT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLink}
                    cta="github"
                  >
                    Request a Site
                  </TrackedAnchor>
                </li>
                <li>
                  <TrackedAnchor
                    href={CONTACT.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLink}
                    cta="github"
                  >
                    GitHub
                  </TrackedAnchor>
                </li>
                <li>
                  <TrackedAnchor
                    href={CONTACT.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLink}
                    cta="telegram"
                  >
                    Telegram
                  </TrackedAnchor>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-overline uppercase text-primary-300">Legal</p>
              <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
                <li>
                  <AppLink href={routes.privacy} className={footerLink}>
                    Privacy Policy
                  </AppLink>
                </li>
                <li>
                  <AppLink href={routes.terms} className={footerLink}>
                    Terms of Use
                  </AppLink>
                </li>
                <li>
                  <TrackedAnchor
                    href={`mailto:${CONTACT.email}`}
                    className={footerLink}
                    cta="email"
                  >
                    {CONTACT.email}
                  </TrackedAnchor>
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
