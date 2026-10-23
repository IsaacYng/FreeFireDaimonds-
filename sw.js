/* Diamond shop · service worker
   Only the customer page and its app files are cached. admin.html and Firebase are never touched. */
const CACHE = 'dc-shop-v2';
const FILES = ['', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => './' + f))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// network first (prices and fixes show at once), cached copy when offline
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url); if (url.origin !== location.origin) return;
  const base = new URL(self.registration.scope).pathname, rel = url.pathname.startsWith(base) ? url.pathname.slice(base.length) : null;
  if (rel === null || !FILES.includes(rel)) return;
  e.respondWith(fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req, {ignoreSearch:true}).then(m => m || caches.match('./'))));
});

// tapping an order alert opens the app on the right page
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const target = new URL((e.notification.data && e.notification.data.url) || './', self.registration.scope);
  e.waitUntil(self.clients.matchAll({type:'window', includeUncontrolled:true}).then(list => {
    for (const c of list) {
      if (c.url.startsWith(self.registration.scope) && !/admin\.html/.test(c.url)) { c.postMessage({hash: target.hash}); return c.focus(); }
    }
    return self.clients.openWindow(target.href);
  }));
});
