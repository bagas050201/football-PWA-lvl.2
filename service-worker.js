const CACHE_NAME = "bola spanyol-v1.9";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/manifest.json",
  "/push.js",
  "/pages/klasemen.html",
  "/pages/favorite.html",
  "/pages/information.html",
  "/css/materialize.min.css",
  "/css/materialize.css",
  "/js/materialize.min.js",
  "/js/materialize.js",
  "/js/api.js",
  "/js/idb.js",
  "/js/db.js",
  "/js/nav.js",
  "/js/register_sw.js",
  "/icon/icon-48new.png",
  "/icon/icon-96new.png",
  "/icon/icon-192new.png",
  "/icon/icon-512new.png",
  "/icon/icon-oritrans.png",
  "/icon/maskable_icon.png"
];
 
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(response => {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });
  
  self.addEventListener("activate", event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

  self.addEventListener("fetch", function(event) {
    const base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {'ignoreSearch': true}).then(function(response) {
                return response || fetch (event.request);
            })
        )
    }
});
