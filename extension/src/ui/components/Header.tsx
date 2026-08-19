import { assetUrl } from '../constants';

export function Header(): React.ReactElement {
  return (
    <header className="flex items-start gap-3.5 px-5 pb-4 pt-5">
      <img src={assetUrl('icon.png')} alt="" className="size-11 shrink-0" width={44} height={44} />
      <div className="min-w-0 pt-0.5">
        <h1 className="text-[1.25rem] font-extrabold tracking-tight text-ink">Skip Wait</h1>
        <p className="mt-1 text-[0.8125rem] font-medium leading-snug text-ink-soft">
          Skips wait timers, countdowns, and download gates on supported sites.
        </p>
      </div>
    </header>
  );
}
