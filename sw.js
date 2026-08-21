const CACHE_NAME = '896-FIT-V11-3';
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).then(r => { const c=r.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request,c)); return r; }).catch(() => caches.match(event.request).then(r => r || caches.match('./index.html'))));
});
