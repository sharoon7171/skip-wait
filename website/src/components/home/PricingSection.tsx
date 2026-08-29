import { EAS_STORE_URL, PRICE } from '@/data/constants';
import { homeHash } from '@/lib/routes';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shell } from '@/components/ui/Shell';
import { TrackedAnchor } from '@/components/ui/TrackedAnchor';

const steps = [
  'Buy on EAS Store',
  'Install from the Chrome Web Store',
  'Paste the license key in the popup',
] as const;

export function PricingSection(): React.ReactElement {
  return (
    <section id={homeHash.pricing} className="scroll-mt-20 bg-surface-muted py-12 lg:py-16">
      <Shell>
        <SectionHeader
          title="Pricing"
          description="One monthly license. One device per key. Pay on EAS Store — license key delivered after checkout."
        />

        <article className="mx-auto mt-8 flex max-w-lg flex-col rounded-panel bg-surface-canvas p-8 shadow-sm ring-2 ring-primary-500/20">
          <p className="text-overline uppercase text-primary-600">Monthly license</p>
          <p className="mt-3 font-display text-metric text-ink">{PRICE.display}</p>
          <p className="mt-1 text-body-sm font-medium text-ink-soft">Per month</p>
          <p className="mt-2 text-body-sm text-ink-body">
            Pay on EAS Store. Your license key is delivered automatically after purchase.
          </p>

          <ol className="mt-6 m-0 flex list-none flex-col gap-3 p-0">
            {steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3 text-body-sm text-ink-body">
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-caption font-bold text-primary-700">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <TrackedAnchor
            href={EAS_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            button
            className="mt-8 w-full"
          >
            Buy on EAS Store
          </TrackedAnchor>
        </article>
      </Shell>
    </section>
  );
}
