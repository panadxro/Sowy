const CACHE = 'marketplace-app-cache';
const urlsAlCache = [
  'index.html',
  'offline.html',
  'css/styles.css',
  'js/script.js',
  'img/logo-192x192.png',
  'img/logo-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(urlsAlCache))
      .then(() => console.log('Cache abierto y recursos almacenados en caché'))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE).then(async cache => {
      const response = await cache.match(event.request);
      if (response) {
        return response;
      }
      try {
        const networkResponse = await fetch(event.request);
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      } catch {
        return await caches.match('offline.html');
      }
    })
  );
});
