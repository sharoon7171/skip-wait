import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HostsUpdateSection } from '../components/HostsUpdateSection';
import { LicenseSection } from '../components/LicenseSection';
import { IconArrowRight } from '../components/icons';
import { CONTACT, PANEL_CARD, SUPPORTED_SITES_URL, assetUrl, getRequestSupportUrl } from '../constants';
import '../global.css';

const contacts = [
  { label: 'GitHub', icon: 'icons/github.png', href: getRequestSupportUrl() },
  { label: 'Telegram', icon: 'icons/telegram.png', href: CONTACT.telegram },
  { label: 'Email', icon: 'icons/email.png', href: `mailto:${CONTACT.email}` },
] as const;

function PopupPage(): React.ReactElement {
  return (
    <div className="relative box-border w-[480px] bg-surface-muted font-sans antialiased">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.96_0.025_250)_0%,oklch(0.985_0_0)_100%)]" />
        <div
          className="absolute inset-0 [mask-image:linear-gradient(180deg,black_0%,transparent_88%)]"
          style={{
            backgroundImage: 'radial-gradient(oklch(0.48 0.22 255 / 0.16) 1px, transparent 1.5px)',
            backgroundSize: '1.5rem 1.5rem',
          }}
        />
      </div>

      <div className="relative flex flex-col">
        <Header />

        <main className="flex flex-col gap-3 px-4 pb-3">
          <a
            href={SUPPORTED_SITES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-card bg-primary-600 px-4 py-3 no-underline shadow-[0_12px_28px_-14px_oklch(0.48_0.22_255/0.75)] transition-colors hover:bg-primary-700"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-primary-200">
                Supported sites
              </span>
              <span className="mt-0.5 block text-[0.9375rem] font-bold tracking-tight text-ink-inverse">
                See all sites Skip Wait works on
              </span>
            </span>
            <IconArrowRight className="size-5 shrink-0 text-ink-inverse transition-transform group-hover:translate-x-0.5" />
          </a>

          <LicenseSection />
          <HostsUpdateSection />

          <section aria-labelledby="request-heading" className={PANEL_CARD}>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-soft">Report a site</p>
            <h2 id="request-heading" className="mt-0.5 text-[0.875rem] font-bold tracking-tight text-ink">
              Bypass not working, or a new domain?
            </h2>
            <p className="mt-1 text-[0.8125rem] font-medium leading-snug text-ink-soft">
              Message us on GitHub, Telegram, or Email with the page URL. If we already support that bypass, we add the
              domain and you tap Refresh. If it is a new site, we add support as soon as we can.
            </p>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-surface-canvas text-[0.75rem] font-semibold text-ink no-underline ring-1 ring-neutral-300 transition-colors hover:bg-primary-50 hover:text-primary-700 hover:ring-primary-300"
                >
                  <img src={assetUrl(contact.icon)} alt="" className="size-4" width={16} height={16} />
                  {contact.label}
                </a>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  document.documentElement.className = 'm-0 w-[480px] bg-surface-muted font-sans antialiased';
  document.body.className = 'm-0 w-[480px] bg-surface-muted font-sans antialiased';
  root.className = 'm-0 w-[480px]';
  createRoot(root).render(
    <StrictMode>
      <PopupPage />
    </StrictMode>,
  );
}
