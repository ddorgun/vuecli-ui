// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v0.0.1';
const DATA_CACHE_NAME = 'data-cache-v0.0.1';

// Add list of files to cache here.
const FILES_TO_CACHE = [
  '/*',
  '/index.html',
  '/scripts/app.js',
  '/scripts/install.js',
  '/scripts/luxon-1.11.4.js',
];
const self = this;
self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    }),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then(keyList => Promise.all(keyList.map((key) => {
      if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
        console.log('[ServiceWorker] Removing old cache', key);
        return caches.delete(key);
      }
      return null;
    }))),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // Add fetch event handler here.
  if (evt.request.url.includes('/forecast/')) {
    console.log('[ServiceWorker] Fetch (data)', evt.request.url);
    evt.respondWith(caches.open(DATA_CACHE_NAME)
      .then(cache => fetch(evt.request)
        .then((response) => {
          // If the response was good, clone it and store it in the cache
          if (response.status === 200) {
            cache.put(evt.request.url, response.clone());
          }
          return response;
        })
        .catch((err) => {
          // Network requeset failed, try to get it from the cache.
          console.log(err);
          return cache.match(evt.request);
        })));
    return;
  }

  evt.respondWith(
    caches.open(CACHE_NAME)
      .then(cache => cache.match(evt.request)
        .then(response => response || fetch(evt.request))),
  );
});
