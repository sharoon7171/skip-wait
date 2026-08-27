type ModdroidWindow = Window & {
  __swModdroid?: boolean;
  isMobile?: () => boolean;
};

export function runModdroidReveal(): void {
  const w = window as ModdroidWindow;
  if (w.__swModdroid) return;
  w.__swModdroid = true;

  const copy: Record<string, string> = {
    en: '5-second prepare skipped — download is ready now.',
    pt: 'preparação de 5 segundos ignorada — o download está pronto.',
    es: 'preparación de 5 segundos omitida — la descarga está lista.',
    id: 'persiapan 5 detik dilewati — unduhan siap sekarang.',
    ru: '5-секундная подготовка пропущена — загрузка уже доступна.',
    ar: 'تم تخطي التحضير لمدة 5 ثوانٍ — التنزيل جاهز الآن.',
    tr: '5 saniyelik hazırlık atlandı — indirme hazır.',
    de: '5-Sekunden-Vorbereitung übersprungen — Download ist bereit.',
    fr: 'préparation de 5 secondes ignorée — le téléchargement est prêt.',
    it: 'preparazione di 5 secondi saltata — il download è pronto.',
  };

  const brand = (): void => {
    if (document.getElementById('skipwait-moddroid-brand')) return;
    const native = document.querySelector('.download-loading .download-ad-notice');
    if (!native) return;
    const html = document.documentElement.lang.toLowerCase().split('-')[0] ?? '';
    const sub = location.hostname.split('.')[0]?.toLowerCase() ?? '';
    const lang = copy[html] ? html : copy[sub] ? sub : 'en';
    const banner = document.createElement('div');
    banner.id = 'skipwait-moddroid-brand';
    banner.className = 'download-ad-notice';
    banner.lang = lang;
    if (lang === 'ar') banner.dir = 'rtl';
    const icon = native.querySelector('.download-ad-notice__icon')?.cloneNode(true);
    const span = document.createElement('span');
    const strong = document.createElement('strong');
    strong.textContent = 'Skip Wait';
    span.append(strong, document.createTextNode(` ${copy[lang]}`));
    if (icon) banner.append(icon);
    banner.append(span);
    native.before(banner);
  };

  const reveal = (): boolean => {
    const btn = document.getElementById('download-button');
    const list = document.querySelectorAll<HTMLElement>('.download-progress');
    if (!btn || !list.length) return false;
    for (const el of list) el.style.display = 'none';
    if (typeof w.isMobile === 'function' && w.isMobile()) {
      const app = document.getElementById('download-app-button');
      if (app) app.style.display = 'flex';
    }
    btn.style.display = 'flex';
    brand();
    return true;
  };

  if (reveal()) return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      reveal();
    }, { once: true });
  }
}
