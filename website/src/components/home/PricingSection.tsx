import { CONTACT, GUMROAD_URL, PRICE } from '@/data/constants';
import { homeHash } from '@/lib/routes';
import { GmailIcon, TelegramIcon } from '@/components/ui/icons';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shell } from '@/components/ui/Shell';
import { TrackedAnchor } from '@/components/ui/TrackedAnchor';

const plans = [
  {
    id: 'gumroad',
    label: 'Gumroad',
    amount: PRICE.card,
    note: 'Pay by card. The license guide downloads instantly and your key is emailed to your Gumroad receipt address.',
    steps: [
      'Buy on Gumroad',
      'Install from the Chrome Web Store',
      'Paste the emailed key in the popup',
    ],
    featured: true,
  },
  {
    id: 'crypto',
    label: 'Crypto',
    amount: PRICE.crypto,
    note: 'Pay with crypto directly. Message us on Telegram or by email for wallet details, then we send your key.',
    steps: [
      'Message us on Telegram or by email',
      'Pay and receive your license key',
      'Activate in the extension popup',
    ],
    featured: false,
  },
] as const;

export function PricingSection(): React.ReactElement {
  return (
    <section id={homeHash.pricing} className="scroll-mt-20 bg-surface-muted py-12 lg:py-16">
      <Shell>
        <SectionHeader
          title="Pricing"
          description="One monthly license. One device per key. Pay with card on Gumroad or crypto directly."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`flex flex-col rounded-panel bg-surface-canvas p-8 shadow-sm ${
                plan.featured
                  ? 'ring-2 ring-primary-500/20'
                  : 'ring-1 ring-neutral-200'
              }`}
            >
              <p
                className={`text-overline uppercase ${
                  plan.featured ? 'text-primary-600' : 'text-ink-soft'
                }`}
              >
                {plan.label}
              </p>
              <p className="mt-3 font-display text-metric text-ink">${plan.amount}</p>
              <p className="mt-1 text-body-sm font-medium text-ink-soft">Per month</p>
              <p className="mt-2 text-body-sm text-ink-body">{plan.note}</p>

              <ol className="mt-6 m-0 flex list-none flex-col gap-3 p-0">
                {plan.steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 text-body-sm text-ink-body">
                    <span
                      className={`inline-flex size-7 shrink-0 items-center justify-center rounded-full text-caption font-bold ${
                        plan.featured
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-surface-muted text-ink-soft ring-1 ring-neutral-200'
                      }`}
                    >
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>

              {plan.id === 'gumroad' ? (
                <TrackedAnchor
                  href={GUMROAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  button
                  className="mt-8 w-full"
                >
                  Buy on Gumroad
                </TrackedAnchor>
              ) : (
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <TrackedAnchor
                    href={CONTACT.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    button
                    variant="ghost"
                    className="w-full px-4"
                    cta="telegram"
                  >
                    <TelegramIcon className="size-5" />
                    Telegram
                  </TrackedAnchor>
                  <TrackedAnchor
                    href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Skip Wait crypto payment')}`}
                    button
                    variant="ghost"
                    className="w-full px-4"
                    cta="email"
                  >
                    <GmailIcon className="size-5" />
                    Email
                  </TrackedAnchor>
                </div>
              )}
            </article>
          ))}
        </div>
      </Shell>
    </section>
  );
}
