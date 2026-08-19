import { assetUrl } from '../constants';

export function Header(): React.ReactElement {
  return (
    <header className="flex items-center gap-3.5 px-5 pb-5 pt-6">
      <img src={assetUrl('icon.png')} alt="" className="size-11 shrink-0" width={44} height={44} />
      <h1 className="truncate text-[1.375rem] font-extrabold tracking-tight text-ink">
        Skip Wait
      </h1>
    </header>
  );
}
