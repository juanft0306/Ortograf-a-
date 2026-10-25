// Cambiamos a v2 para forzar al teléfono a descargar el nuevo código
const CACHE_NAME = 'tutor-ortografia-v2';
const urlsToCache = [
  './',
  './index.html',
  './app.js',
  './diccionario.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Fuerza la instalación inmediata
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  // Borra cualquier memoria caché vieja que no sea la v2
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
