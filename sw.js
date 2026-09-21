// Кэшируем только статическую оболочку приложения (HTML/manifest/иконки).
// Данные (Google Sheets API) всегда идут в сеть напрямую — офлайн-работы
// с данными эта PWA не даёт, только быстрый запуск интерфейса.
const CACHE_NAME = 'tracker-shell-v9';
const SHELL_FILES = ['./index.html', './analytics.html', './planning.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // API Google никогда не кэшируем — только собственные статические файлы приложения
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
