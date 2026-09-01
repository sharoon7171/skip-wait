import { EAS_STORE_URL, LICENSE, PRICE } from '@/data/constants';
import { homeHash } from '@/lib/routes';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shell } from '@/components/ui/Shell';
import { TrackedAnchor } from '@/components/ui/TrackedAnchor';

const steps = [
  'Get a trial or monthly license on EAS Store',
  'Install from the Chrome Web Store',
  'Paste the key in the popup and tap Activate',
] as const;

export function PricingSection(): React.ReactElement {
  return (
    <section id={homeHash.pricing} className="scroll-mt-20 bg-surface-muted py-12 lg:py-16">
      <Shell>
        <SectionHeader
          title="Pricing"
          description={`${LICENSE.trialLabel} or ${PRICE.summary}. ${LICENSE.deviceLimit} Pay on EAS Store — license key delivered after checkout.`}
        />

        <article className="mx-auto mt-8 flex max-w-lg flex-col rounded-panel bg-surface-canvas p-8 shadow-sm ring-2 ring-primary-500/20">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-card bg-surface-muted px-3 py-2.5 ring-1 ring-neutral-200">
              <p className="text-overline uppercase text-primary-600">{LICENSE.trialLabel}</p>
              <p className="mt-1 font-display text-body font-bold text-ink">{LICENSE.trialDetail}</p>
            </div>
            <div className="rounded-card bg-surface-muted px-3 py-2.5 ring-1 ring-neutral-200">
              <p className="text-overline uppercase text-primary-600">Monthly</p>
              <p className="mt-1 font-display text-body font-bold text-ink">{LICENSE.monthlyDetail}</p>
            </div>
          </div>

          <p className="mt-4 text-body-sm text-ink-body">
            Copy your key from EAS Store after checkout, paste it in the extension popup, then tap
            Activate.
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
            Get license on EAS Store
          </TrackedAnchor>
        </article>
      </Shell>
    </section>
  );
}
