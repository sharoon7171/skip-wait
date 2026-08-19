import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { HostsUpdateSection } from '../components/HostsUpdateSection';
import { ReviewPromptSection } from '../components/ReviewPromptSection';
import { CONTACT, SUPPORTED_SITES_URL, getRequestSupportUrl } from '../constants';
import '../global.css';

const REQUEST_SUPPORT_URL = getRequestSupportUrl();

function getExtensionIconUrl(): string {
  if (typeof chrome !== 'undefined' && chrome.runtime?.getURL) {
    return chrome.runtime.getURL('icon.png');
  }
  return '/icon.png';
}

function PopupPage(): React.ReactElement {
  return (
    <div className="box-border flex w-[420px] flex-col bg-neutral-50 font-poppins">
      <Header title="Skip Wait" iconUrl={getExtensionIconUrl()} />
      <main className="flex flex-col px-3 py-2.5">
        <article className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-sm">
          <div className="divide-y divide-neutral-100">
            <section aria-labelledby="popup-summary-heading" className="px-4 py-2.5 text-left">
              <h2
                id="popup-summary-heading"
                className="font-poppins text-sm font-extrabold tracking-tight text-primary-950"
              >
                How it works
              </h2>
              <p className="mt-1 font-poppins text-xs font-medium leading-snug text-neutral-800">
                On supported link shorteners and file hosts, Skip Wait skips the countdown and opens
                the destination.
              </p>
            </section>

            <section aria-labelledby="sites-heading" className="px-4 py-2.5 text-left">
              <h2
                id="sites-heading"
                className="font-poppins text-sm font-extrabold tracking-tight text-primary-950"
              >
                Supported sites
              </h2>
              <p className="mt-1 font-poppins text-xs font-medium leading-snug text-neutral-800">
                See every domain and flow covered by the extension.
              </p>
              <a
                href={SUPPORTED_SITES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-radius-button bg-primary-600 px-3 py-1.5 font-poppins text-xs font-bold text-white shadow-sm hover:bg-primary-700"
              >
                View supported sites
              </a>
            </section>

            <HostsUpdateSection />

            <section aria-labelledby="support-heading" className="px-4 py-2.5 text-left">
              <h2
                id="support-heading"
                className="font-poppins text-sm font-extrabold tracking-tight text-primary-950"
              >
                Request a website
              </h2>
              <p className="mt-1 font-poppins text-xs font-medium leading-snug text-neutral-800">
                If a wait page is missing, send the URL and we will add support.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5">
                <a
                  href={REQUEST_SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-radius-button bg-primary-600 px-3 py-1.5 font-poppins text-xs font-bold text-white shadow-sm hover:bg-primary-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5 shrink-0"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  Ask on GitHub
                </a>
                <span className="text-neutral-300" aria-hidden>
                  ·
                </span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-xs font-bold text-primary-700 hover:text-primary-800 hover:underline"
                >
                  Email
                </a>
                <a
                  href={CONTACT.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-primary-700 hover:text-primary-800 hover:underline"
                >
                  Telegram
                </a>
              </div>
            </section>

            <div className="p-2.5">
              <ReviewPromptSection />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <PopupPage />
    </StrictMode>,
  );
}
