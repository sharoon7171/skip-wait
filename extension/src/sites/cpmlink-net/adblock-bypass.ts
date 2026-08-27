type BlockAdBlock = {
  onDetected: (fn?: () => void) => BlockAdBlock;
  onNotDetected: (fn?: () => void) => BlockAdBlock;
};

type PageWindow = Window & {
  __swCpmlinkNetAdblock?: boolean;
  Det?: () => void;
  NotDet?: () => void;
  blockAdBlock?: BlockAdBlock;
};

export function runCpmlinkNetAdblockBypass(): void {
  const w = window as PageWindow;
  if (w.__swCpmlinkNetAdblock) return;
  w.__swCpmlinkNetAdblock = true;

  const noop = (): void => {};
  const blockAdBlock: BlockAdBlock = {
    onDetected() {
      return this;
    },
    onNotDetected() {
      return this;
    },
  };

  const lock = (key: 'Det' | 'NotDet' | 'blockAdBlock', value: (() => void) | BlockAdBlock): void => {
    try {
      Object.defineProperty(w, key, {
        configurable: true,
        enumerable: true,
        get: () => value,
        set: () => {},
      });
    } catch {
      w[key] = value as never;
    }
  };

  lock('Det', noop);
  lock('NotDet', noop);
  lock('blockAdBlock', blockAdBlock);

  const scrub = (): void => {
    document.getElementById('disable')?.remove();
  };
  scrub();
  new MutationObserver(scrub).observe(document.documentElement, { childList: true, subtree: true });
}
