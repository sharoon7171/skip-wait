import { CHROME_WEB_STORE_URL, EAS_STORE_URL, LICENSE, PRICE } from '@/data/constants';
import { homeHash } from '@/lib/routes';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shell } from '@/components/ui/Shell';
import { TrackedAnchor } from '@/components/ui/TrackedAnchor';

const plans = [
  {
    label: LICENSE.trialLabel,
    price: '$0',
    detail: 'Full bypass access',
    body: 'See if Skip Wait helps on the sites you use before you pay.',
    cta: 'Start free trial',
    variant: 'ghost' as const,
    featured: false,
  },
  {
    label: 'Monthly',
    price: PRICE.display,
    detail: 'Per month on EAS Store',
    body: 'License key delivered automatically after purchase.',
    cta: 'Buy on EAS Store',
    variant: 'dark' as const,
    featured: true,
  },
] as const;

const steps = [
  {
    number: '01',
    title: 'Get a license',
    body: 'Pick the free trial or monthly plan on EAS Store. Your key is delivered after checkout.',
    tone: 'bg-primary-100 text-primary-700',
  },
  {
    number: '02',
    title: 'Install Skip Wait',
    body: 'Add the extension from the Chrome Web Store on the browser you will use.',
    tone: 'bg-warning-100 text-warning-700',
  },
  {
    number: '03',
    title: 'Activate',
    body: 'Paste the key in the popup and tap Activate. Bypass runs on supported pages.',
    tone: 'bg-success-100 text-success-700',
  },
] as const;

export function PricingSection(): React.ReactElement {
  return (
    <section id={homeHash.pricing} className="scroll-mt-20 bg-surface-muted py-12 lg:py-16">
      <Shell>
        <SectionHeader
          title="Pricing"
          description={`${LICENSE.trialLabel} or ${PRICE.summary}. ${LICENSE.deviceLimit}`}
        />

        <ul className="mt-8 m-0 grid list-none gap-5 p-0 lg:grid-cols-2">
          {plans.map((plan) => (
            <li
              key={plan.label}
              className="flex flex-col rounded-panel bg-surface-canvas p-8 shadow-sm ring-1 ring-neutral-200"
            >
              <p className={`text-overline uppercase ${plan.featured ? 'text-primary-600' : 'text-ink-soft'}`}>
                {plan.label}
              </p>
              <p className="mt-3 font-display text-metric text-ink">{plan.price}</p>
              <p className="mt-1 text-body-sm font-medium text-ink-soft">{plan.detail}</p>
              <p className="mt-4 flex-1 text-body-sm text-ink-body">{plan.body}</p>
              <TrackedAnchor
                href={EAS_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                button
                variant={plan.variant}
                className="mt-6 w-full"
              >
                {plan.cta}
              </TrackedAnchor>
            </li>
          ))}
        </ul>

        <ol className="mt-8 grid list-none gap-5 p-0 lg:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.number}
              className="rounded-panel bg-surface-canvas p-8 shadow-sm ring-1 ring-neutral-200"
            >
              <span
                className={`inline-flex size-11 items-center justify-center rounded-full text-caption font-bold ${step.tone}`}
              >
                {step.number}
              </span>
              <h3 className="mt-5 font-display text-title-lg text-ink">{step.title}</h3>
              <p className="mt-3 text-body-sm text-ink-body">{step.body}</p>
              {step.number === '02' ? (
                <a
                  href={CHROME_WEB_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-body-sm font-semibold text-primary-700 underline decoration-primary-200 underline-offset-2 hover:decoration-primary-500"
                >
                  Chrome Web Store
                </a>
              ) : null}
            </li>
          ))}
        </ol>
      </Shell>
    </section>
  );
}
