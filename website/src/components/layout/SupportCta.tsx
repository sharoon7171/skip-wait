import { CONTACT, REQUEST_SUPPORT_URL } from '@/data/constants';
import { GitHubIcon, GmailIcon, TelegramIcon } from '@/components/ui/icons';
import { Shell } from '@/components/ui/Shell';
import { TrackedAnchor } from '@/components/ui/TrackedAnchor';
import { ctaPanelPad, sectionY } from '@/ui-classes/layout';
import { panelGlow, panelGradient } from '@/ui-classes/surfaces';

export function SupportCta(): React.ReactElement {
  return (
    <section className={`bg-surface-muted ${sectionY}`}>
      <Shell>
        <div className={`${panelGradient} text-center ${ctaPanelPad}`}>
          <div aria-hidden className={panelGlow} />
          <div className="relative mx-auto max-w-measure">
            <h2 className="font-display text-title-lg text-white sm:text-headline">
              Need a Countdown Bypass or URL Shortener Skip?
            </h2>
            <p className="mt-3 text-body-sm text-primary-200">
              Send the page URL and what the wait looks like. We’ll add support when we can.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <TrackedAnchor
                href={REQUEST_SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                button
                variant="light"
                cta="github"
              >
                <GitHubIcon className="size-5" />
                Request on GitHub
              </TrackedAnchor>
              <TrackedAnchor
                href={CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                button
                variant="light"
                cta="telegram"
              >
                <TelegramIcon className="size-5" />
                Telegram
              </TrackedAnchor>
              <TrackedAnchor
                href={`mailto:${CONTACT.email}`}
                button
                variant="light"
                cta="email"
              >
                <GmailIcon className="size-5" />
                Email
              </TrackedAnchor>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
