'use client';

import { useEffect, useId, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CHROME_WEB_STORE_URL, CONTACT, SITE } from '@/data/constants';
import { homeSections, routes } from '@/lib/routes';
import { AppLink } from '@/components/nav/AppLink';
import { BrandIcon, ChromeIcon, IconClose, IconMenu } from '@/components/ui/icons';
import { Shell } from '@/components/ui/Shell';
import { TrackedAnchor } from '@/components/ui/TrackedAnchor';

const navLink =
  'text-caption font-semibold text-ink-soft no-underline transition-colors hover:text-ink';

const mobileNavLink =
  'block rounded-card px-3 py-3 text-ui font-semibold text-ink no-underline transition-colors hover:bg-surface-muted';

export function SiteHeader(): React.ReactElement {
  const pathname = usePathname();
  const sitesActive = pathname === routes.sites;
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const closeMenu = (): void => {
    setOpen(false);
  };

  const sitesClass = sitesActive ? 'text-ink' : '';

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-surface-canvas/85 backdrop-blur-md">
      <Shell className="flex h-14 items-center justify-between gap-3 sm:h-16 sm:gap-6">
        <AppLink
          href={routes.home}
          className="inline-flex min-w-0 items-center gap-2 no-underline sm:gap-2.5"
          onClick={closeMenu}
        >
          <BrandIcon size={28} priority className="size-7 shrink-0" />
          <span className="truncate font-display text-title font-extrabold tracking-tight text-ink">
            {SITE.name}
          </span>
        </AppLink>

        <div className="flex shrink-0 items-center gap-3 lg:gap-6">
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            <AppLink href={routes.sites} className={`${navLink} ${sitesClass}`}>
              Supported Sites
            </AppLink>
            <AppLink href={homeSections.howItWorks} className={navLink}>
              How It Works
            </AppLink>
            <AppLink href={homeSections.pricing} className={navLink}>
              Pricing
            </AppLink>
            <AppLink href={homeSections.faq} className={navLink}>
              FAQ
            </AppLink>
            <TrackedAnchor
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className={navLink}
              cta="github"
            >
              GitHub
            </TrackedAnchor>
            <TrackedAnchor
              href={CHROME_WEB_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              button
              className="h-10 px-5"
              addToChrome="header"
            >
              <ChromeIcon size={16} className="size-4" />
              Add to Chrome
            </TrackedAnchor>
          </nav>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-ink ring-1 ring-neutral-300 transition-colors hover:bg-surface-muted hover:ring-neutral-400 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <IconClose className="size-5" /> : <IconMenu className="size-5" />}
          </button>
        </div>
      </Shell>

      {open ? (
        <div id={menuId} className="border-t border-neutral-200 bg-surface-canvas lg:hidden">
          <Shell>
            <nav className="flex flex-col gap-1 py-3" aria-label="Primary">
              <AppLink
                href={routes.sites}
                className={`${mobileNavLink} ${sitesActive ? 'bg-primary-50 text-primary-700' : ''}`}
                onClick={closeMenu}
              >
                Supported Sites
              </AppLink>
              <AppLink
                href={homeSections.howItWorks}
                className={mobileNavLink}
                onClick={closeMenu}
              >
                How It Works
              </AppLink>
              <AppLink
                href={homeSections.pricing}
                className={mobileNavLink}
                onClick={closeMenu}
              >
                Pricing
              </AppLink>
              <AppLink
                href={homeSections.faq}
                className={mobileNavLink}
                onClick={closeMenu}
              >
                FAQ
              </AppLink>
              <TrackedAnchor
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className={mobileNavLink}
                cta="github"
                onClick={closeMenu}
              >
                GitHub
              </TrackedAnchor>
              <TrackedAnchor
                href={CHROME_WEB_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                button
                className="mt-2 h-11 w-full"
                addToChrome="header"
                onClick={closeMenu}
              >
                <ChromeIcon size={16} className="size-4" />
                Add to Chrome
              </TrackedAnchor>
            </nav>
          </Shell>
        </div>
      ) : null}
    </header>
  );
}
