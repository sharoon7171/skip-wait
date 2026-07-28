import { CONTACT, REQUEST_SUPPORT_URL } from '@/data/constants';
import { ButtonAnchor } from '@/components/ui/Button';
import { GitHubIcon } from '@/components/ui/GitHubIcon';
import { GmailIcon } from '@/components/ui/GmailIcon';
import { Shell } from '@/components/ui/Shell';
import { TelegramIcon } from '@/components/ui/TelegramIcon';

export function SupportCta(): React.ReactElement {
  return (
    <section className="bg-surface-muted py-12 lg:py-16">
      <Shell>
        <div className="relative overflow-hidden rounded-panel bg-primary-600 px-6 py-8 text-center shadow-xl shadow-primary-950/10 sm:px-10 lg:py-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_70%_at_50%_0%,oklch(1_0_0/0.16),transparent_60%)]"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-title-lg text-white">
              Need a Timer Bypass or Wait Automation?
            </h2>
            <p className="mt-2 text-body-sm text-primary-100">
              Share the page URL and how the countdown, waiting page, or unlock flow works. We’ll
              add a bypass or automation when it’s possible.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <ButtonAnchor
                href={REQUEST_SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
              >
                <GitHubIcon className="size-5" />
                Request on GitHub
              </ButtonAnchor>
              <ButtonAnchor
                href={CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
              >
                <TelegramIcon className="size-5" />
                Telegram
              </ButtonAnchor>
              <ButtonAnchor href={`mailto:${CONTACT.email}`} variant="light">
                <GmailIcon className="size-5" />
                Email
              </ButtonAnchor>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
