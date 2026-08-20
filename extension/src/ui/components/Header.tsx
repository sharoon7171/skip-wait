import { PRICE_LABEL, assetUrl } from '../constants';

export function Header(): React.ReactElement {
  return (
    <header className="flex items-start gap-3 px-4 pb-2 pt-3.5">
      <img src={assetUrl('icon.png')} alt="" className="size-10 shrink-0" width={40} height={40} />
      <div className="min-w-0 pt-0.5">
        <h1 className="text-[1.125rem] font-extrabold tracking-tight text-ink">Skip Wait</h1>
        <p className="mt-0.5 text-[0.8125rem] font-medium leading-snug text-ink-soft">
          {PRICE_LABEL}. Skips wait timers, countdowns, and download gates on supported sites.
        </p>
      </div>
    </header>
  );
}
