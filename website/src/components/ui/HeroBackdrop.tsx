export function HeroBackdrop(): React.ReactElement {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.98_0.015_250)_0%,oklch(1_0_0)_100%)]" />

      <div
        className="absolute inset-0 [mask-image:radial-gradient(115%_85%_at_50%_-8%,black_38%,transparent_80%)]"
        style={{
          backgroundImage:
            'radial-gradient(oklch(0.55 0.04 258 / 0.16) 1px, transparent 1.5px)',
          backgroundSize: '1.5rem 1.5rem',
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface-canvas to-transparent" />
    </div>
  );
}
