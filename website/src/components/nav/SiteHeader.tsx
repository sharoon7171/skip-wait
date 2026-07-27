'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CHROME_WEB_STORE_URL, CONTACT, SITE } from '@/data/constants';
import { routes } from '@/lib/routes';
import { ButtonAnchor } from '@/components/ui/Button';
import { ChromeIcon } from '@/components/ui/ChromeIcon';
import { Shell } from '@/components/ui/Shell';

const navLink =
  'text-caption font-semibold text-ink-soft no-underline transition-colors hover:text-ink';

export function SiteHeader(): React.ReactElement {
  const pathname = usePathname();
  const sitesActive = pathname === routes.sites;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-surface-canvas/85 backdrop-blur-md">
      <Shell className="flex h-[4.5rem] items-center justify-between gap-6">
        <Link href={routes.home} className="inline-flex items-center gap-2.5 no-underline">
          <img src="/icon.png" alt="" width={30} height={30} className="size-[1.875rem]" />
          <span className="font-display text-[1.15rem] font-extrabold tracking-tight text-ink">
            {SITE.name}
          </span>
        </Link>

        <nav className="flex items-center gap-8" aria-label="Primary">
          <Link
            href={routes.sites}
            className={`hidden sm:inline ${navLink} ${
              sitesActive
                ? 'text-ink underline decoration-primary-500 decoration-2 underline-offset-8'
                : ''
            }`}
          >
            Supported Sites
          </Link>
          <Link href={`${routes.home}#how-it-works`} className={`hidden md:inline ${navLink}`}>
            How It Works
          </Link>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden lg:inline ${navLink}`}
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
      </Shell>
    </header>
  );
}
