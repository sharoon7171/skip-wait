'use client';

import { useEffect, useId, useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CHROME_WEB_STORE_URL, CONTACT, SITE } from '@/data/constants';
import { routes } from '@/lib/routes';
import { ButtonAnchor } from '@/components/ui/Button';
import { ChromeIcon } from '@/components/ui/ChromeIcon';
import { Shell } from '@/components/ui/Shell';

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

  const sitesClass = sitesActive
    ? 'text-ink underline decoration-primary-500 decoration-2 underline-offset-8'
    : '';

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-surface-canvas/85 backdrop-blur-md">
      <Shell className="flex h-[4.5rem] items-center justify-between gap-3 sm:gap-6">
        <Link
          href={routes.home}
          className="inline-flex min-w-0 items-center gap-2 sm:gap-2.5 no-underline"
          onClick={closeMenu}
        >
          <img
            src="/icon.png"
            alt=""
            width={30}
            height={30}
            className="size-[1.875rem] shrink-0"
          />
          <span className="truncate font-display text-[1.05rem] font-extrabold tracking-tight text-ink sm:text-[1.15rem]">
            {SITE.name}
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-3 lg:gap-8">
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            <Link href={routes.sites} className={`${navLink} ${sitesClass}`}>
              Supported Sites
            </Link>
            <Link href={`${routes.home}#how-it-works`} className={navLink}>
              How It Works
            </Link>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className={navLink}
            >
              GitHub
            </a>
            <ButtonAnchor
              href={CHROME_WEB_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-5"
            >
              <ChromeIcon className="size-4" />
              Add to Chrome
            </ButtonAnchor>
          </nav>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-ink ring-1 ring-neutral-300 transition-colors hover:bg-surface-muted hover:ring-neutral-400 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <LuX className="size-5" aria-hidden /> : <LuMenu className="size-5" aria-hidden />}
          </button>
        </div>
      </Shell>

      {open ? (
        <div id={menuId} className="border-t border-neutral-200 bg-surface-canvas lg:hidden">
          <Shell>
            <nav className="flex flex-col gap-1 py-3" aria-label="Primary">
              <Link
                href={routes.sites}
                className={`${mobileNavLink} ${sitesActive ? 'bg-primary-50 text-primary-700' : ''}`}
                onClick={closeMenu}
              >
                Supported Sites
              </Link>
              <Link
                href={`${routes.home}#how-it-works`}
                className={mobileNavLink}
                onClick={closeMenu}
              >
                How It Works
              </Link>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className={mobileNavLink}
                onClick={closeMenu}
              >
                GitHub
              </a>
              <ButtonAnchor
                href={CHROME_WEB_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 h-11 w-full"
                onClick={closeMenu}
              >
                <ChromeIcon className="size-4" />
                Add to Chrome
              </ButtonAnchor>
            </nav>
          </Shell>
        </div>
      ) : null}
    </header>
  );
}
