import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  actionGrid,
  actionTileBody,
  actionTileIconSites,
  actionTileIconWrap,
  actionTileMeta,
  actionTileSites,
  actionTileTitle,
  contactGrid,
  contactTile,
  heroGlow,
  popupMain,
  popupShell,
  supportBody,
  supportCard,
  supportTitle,
} from '../../../ui-classes/popup';
import { DomainsTile } from '../components/DomainsTile';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { LicenseSection } from '../components/LicenseSection';
import { IconGlobe } from '../components/icons';
import { CONTACT, SUPPORTED_SITES_URL, assetUrl, getRequestSupportUrl } from '../constants';
import '../global.css';

const contacts = [
  { label: 'GitHub', icon: 'icons/github.png', href: getRequestSupportUrl() },
  { label: 'Telegram', icon: 'icons/telegram.png', href: CONTACT.telegram },
  { label: 'Email', icon: 'icons/email.png', href: `mailto:${CONTACT.email}` },
] as const;

function PopupPage(): React.ReactElement {
  return (
    <div className={popupShell}>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-52">
        <div className={heroGlow} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.96_0.03_250)_0%,oklch(0.985_0_0)_72%)]" />
        <div
          className="absolute inset-0 [mask-image:linear-gradient(180deg,black_0%,transparent_90%)]"
          style={{
            backgroundImage: 'radial-gradient(oklch(0.48 0.22 255 / 0.2) 1px, transparent 1.5px)',
            backgroundSize: '1.25rem 1.25rem',
          }}
        />
      </div>

      <div className="relative flex flex-col">
        <Header />
        <main className={popupMain}>
          <LicenseSection />

          <div className={actionGrid}>
            <a
              href={SUPPORTED_SITES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={actionTileSites}
            >
              <span className={`${actionTileIconWrap} ${actionTileIconSites}`}>
                <IconGlobe className="size-4" />
              </span>
              <p className={actionTileTitle}>Supported sites</p>
              <p className={actionTileBody}>Browse every site and host Skip Wait currently bypasses.</p>
              <p className={actionTileMeta}>Opens the full list on our website</p>
            </a>
            <DomainsTile />
          </div>

          <section className={supportCard}>
            <p className={supportTitle}>Bypass broken?</p>
            <p className={supportBody}>Send the page URL — we add domains or new sites fast.</p>
            <div className={contactGrid}>
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactTile}
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
