import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HostsUpdateSection } from '../components/HostsUpdateSection';
import { IconArrowRight } from '../components/icons';
import { CONTACT, SUPPORTED_SITES_URL, assetUrl, getRequestSupportUrl } from '../constants';
import '../global.css';

const W = 'w-[480px]';
const SHELL = `m-0 ${W} overflow-hidden bg-surface-canvas font-sans antialiased`;

const contacts = [
  { label: 'GitHub', icon: 'icons/github.png', href: getRequestSupportUrl() },
  { label: 'Telegram', icon: 'icons/telegram.png', href: CONTACT.telegram },
  { label: 'Email', icon: 'icons/email.png', href: `mailto:${CONTACT.email}` },
] as const;

function PopupPage(): React.ReactElement {
  return (
    <div className={`relative box-border ${W} bg-surface-canvas font-sans antialiased`}>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-56">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.96_0.025_250)_0%,oklch(1_0_0)_100%)]" />
        <div
          className="absolute inset-0 [mask-image:linear-gradient(180deg,black_0%,transparent_88%)]"
          style={{
            backgroundImage: 'radial-gradient(oklch(0.48 0.22 255 / 0.16) 1px, transparent 1.5px)',
            backgroundSize: '1.5rem 1.5rem',
          }}
        />
      </div>

      <div className="relative">
        <Header />

        <main className="space-y-3 px-5 pb-4">
          <a
            href={SUPPORTED_SITES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-card bg-primary-600 px-5 py-4 no-underline shadow-[0_12px_28px_-14px_oklch(0.48_0.22_255/0.75)] transition-colors hover:bg-primary-700"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-primary-200">
                Supported sites
              </span>
              <span className="mt-1 block text-[1rem] font-bold tracking-tight text-ink-inverse">
                See every site Skip Wait works on
              </span>
              <span className="mt-1 block text-[0.8125rem] font-medium leading-snug text-primary-200">
                Every link shortener, file host, and wait page we support right now.
              </span>
            </span>
            <IconArrowRight className="size-5 shrink-0 text-ink-inverse transition-transform group-hover:translate-x-0.5" />
          </a>

          <div className="divide-y divide-neutral-200/80 overflow-hidden rounded-card bg-surface-canvas shadow-[0_8px_24px_-16px_oklch(0.2_0.015_264/0.5)] ring-1 ring-neutral-200">
            <HostsUpdateSection />

            <section aria-labelledby="request-heading" className="bg-surface-muted/70 px-5 py-4">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-soft">Need help?</p>
              <h2 id="request-heading" className="mt-0.5 text-[0.9375rem] font-bold tracking-tight text-ink">
                Missing a website?
              </h2>
              <p className="mt-1.5 text-[0.8125rem] font-medium leading-snug text-ink-soft">
                Send us the link. A brand-new skip trick needs a Chrome Web Store update. A new website name on a type we
                already support can be added with Refresh after we publish it.
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {contacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-surface-canvas text-[0.8125rem] font-semibold text-ink no-underline ring-1 ring-neutral-300 transition-colors hover:bg-primary-50 hover:text-primary-700 hover:ring-primary-300"
                  >
                    <img src={assetUrl(contact.icon)} alt="" className="size-[1.125rem]" width={18} height={18} />
                    {contact.label}
                  </a>
                ))}
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  document.documentElement.className = SHELL;
  document.body.className = `m-0 ${W} overflow-hidden bg-surface-canvas font-sans antialiased`;
  createRoot(root).render(
    <StrictMode>
      <PopupPage />
    </StrictMode>,
  );
}
