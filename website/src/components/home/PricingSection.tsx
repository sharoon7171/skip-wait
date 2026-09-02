import { CHROME_WEB_STORE_URL, EAS_STORE_URL, FREE, LICENSE, PRICE } from '@/data/constants';
import { homeHash } from '@/lib/routes';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shell } from '@/components/ui/Shell';
import { TrackedAnchor } from '@/components/ui/TrackedAnchor';
import { cardGrid2, cardGrid3, cardPad, sectionY } from '@/ui-classes/layout';
import {
  cardBlueHover,
  cardNeutralHover,
  panelGlow,
  panelGradientHover,
  stepBadgeSolid,
} from '@/ui-classes/surfaces';

const plans = [
  {
    label: LICENSE.trialLabel,
    price: '$0',
    detail: `${LICENSE.trialHint}, no daily limit`,
    body: 'Get a key on EAS Store after checkout.',
    cta: 'Start free trial',
    variant: 'ghost' as const,
    featured: false,
  },
  {
    label: 'Monthly',
    price: PRICE.display,
    detail: 'No daily limit while the key is active',
    body: 'One device. Key sent after purchase.',
    cta: 'Buy on EAS Store',
    variant: 'light' as const,
    featured: true,
  },
] as const;

const steps = [
  {
    number: '01',
    title: 'Install Skip Wait',
    body: `Add the extension from the Chrome Web Store. ${FREE.dailyLimit} free bypasses each day start with no key.`,
    tone: 'bg-primary-600',
    store: true,
  },
  {
    number: '02',
    title: 'Optional: get a key',
    body: `Pick the 30-minute ${LICENSE.trialLabel.toLowerCase()} or monthly plan on EAS Store. Your key is delivered after checkout.`,
    tone: 'bg-warning-600',
    store: false,
  },
  {
    number: '03',
    title: 'Activate for unlimited',
    body: 'Paste the key in the popup and tap Activate. A live license does not use the daily free count.',
    tone: 'bg-success-600',
    store: false,
  },
] as const;

export function PricingSection(): React.ReactElement {
  return (
    <section id={homeHash.pricing} className={`scroll-mt-20 bg-surface-muted ${sectionY}`}>
      <Shell>
        <SectionHeader
          title="Pricing"
          description={`Add Skip Wait from the Chrome Web Store and use it with no key: ${FREE.dailyLimit} free bypasses each day, reset at midnight on your device. A live trial or monthly license does not use that count. Paid plans: 30-minute trial or ${PRICE.summary}. ${LICENSE.deviceLimit}`}
        />

        <ul className={cardGrid2}>
          {plans.map((plan) => (
            <li
              key={plan.label}
              className={`flex flex-col ${cardPad} ${
                plan.featured ? panelGradientHover : cardBlueHover
              }`}
            >
              {plan.featured ? <div aria-hidden className={panelGlow} /> : null}
              <div className="relative flex flex-1 flex-col">
                <p
                  className={`text-overline uppercase ${
                    plan.featured ? 'text-primary-200' : 'text-primary-600'
                  }`}
                >
                  {plan.label}
                </p>
                <p
                  className={`mt-2 font-display text-metric tabular-nums ${
                    plan.featured ? 'text-white' : 'text-ink'
                  }`}
                >
                  {plan.price}
                </p>
                <p
                  className={`mt-1 text-body-sm font-medium ${
                    plan.featured ? 'text-primary-200' : 'text-ink-soft'
                  }`}
                >
                  {plan.detail}
                </p>
                <p
                  className={`mt-3 flex-1 text-body-sm ${
                    plan.featured ? 'text-white/85' : 'text-ink-body'
                  }`}
                >
                  {plan.body}
                </p>
                <TrackedAnchor
                  href={EAS_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  button
                  variant={plan.variant}
                  className="mt-5 w-full"
                >
                  {plan.cta}
                </TrackedAnchor>
              </div>
            </li>
          ))}
        </ul>

        <ol className={cardGrid3}>
          {steps.map((step) => (
            <li key={step.number} className={`${cardNeutralHover} ${cardPad}`}>
              <span className={`${stepBadgeSolid} ${step.tone}`}>{step.number}</span>
              <h3 className="mt-4 font-display text-title text-ink sm:text-title-lg">{step.title}</h3>
              <p className="mt-2 text-body-sm text-ink-body">{step.body}</p>
              {step.store ? (
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
