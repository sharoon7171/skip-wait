// Sub2Get.com Redirect Content Script
// Destination URL is in #butunlock a (hidden until "unlock" — we read it and redirect)
// Use raw href: page may store "fb.com" or "/fb.com"; resolved .href would become sub2get.com/fb.com

(function(): void {
  const el = document.getElementById('butunlock')?.querySelector('a');
  const raw = el?.getAttribute('href');
  if (!raw || !raw.trim()) return;
  const s = raw.trim();
  let url: string;
  if (/^https?:\/\//i.test(s)) url = s;
  else if (s.startsWith('//')) url = 'https:' + s;
  else url = 'https://' + s.replace(/^\//, '');
  window.location.href = url;
})();
