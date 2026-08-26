type Flagged = Window & { __swGetmodsapk?: boolean };

export function runGetmodsapkReveal(): void {
  const w = window as Flagged;
  if (w.__swGetmodsapk) return;
  w.__swGetmodsapk = true;

  Object.defineProperty(window, 'onload', {
    configurable: true,
    enumerable: true,
    get: () => null,
    set() {},
  });

  const reveal = (): void => {
    const bar = document.getElementById('progress-bar');
    const btn = document.getElementById('download-button');
    const wrap = bar?.parentElement;
    if (!bar || !btn || !wrap) return;
    wrap.style.display = 'none';
    btn.classList.remove('hidden');

    const banner = document.createElement('div');
    banner.id = 'skipwait-getmodsapk-brand';
    banner.className = 'bg-[var(--post-color-lighter)] rounded-xl p-4 mb-4';
    banner.setAttribute('role', 'status');

    const title = document.createElement('h2');
    title.className =
      'text-base font-semibold text-gray-800 dark:text-white mb-2 flex items-center';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'w-5 h-5 mr-2');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('viewBox', '0 0 24 24');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('d', 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z');
    svg.append(path);
    title.append(svg, document.createTextNode('Skip Wait'));

    const copy = document.createElement('p');
    copy.className = 'text-gray-700 dark:text-gray-300';
    copy.textContent = '5-second reveal skipped — download is ready now.';

    banner.append(title, copy);
    btn.before(banner);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal, { once: true });
  } else {
    reveal();
  }
}
