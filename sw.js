// Cambiamos el nombre para obligar al teléfono a soltar la memoria vieja
const CACHE_NAME = 'tutor-ortografia-dinamico-v1';
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
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Borra cualquier caché anterior que no sea la nueva versión dinámica
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ESTRATEGIA: RED PRIMERO (Network First)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Si hay internet y la red responde, guardamos una copia fresca en la memoria
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        // Si no hay internet (falla la red), sacamos el archivo de la memoria caché
        return caches.match(event.request);
      })
  );
});
