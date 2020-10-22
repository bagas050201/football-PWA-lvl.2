const CACHE_NAME = "JajanYuk!-v3.2";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/manifest.json",
  "/icon192px.png",
  "/icon.png",
  "/maskable_icon.png",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/makanan.html",
  "/pages/minuman.html",
  "/pages/snack.html",
  "/image/logo.png",
  "/image/sushi.jpg",
  "/image/donatMie.jpg",
  "/image/snack.jpg",
  "/image/coffee.jpg",
  "/image/boba.jpg",
  "/image/salad.jpg",
  "/css/materialize.min.css",
  "/css/home.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/register_service_worker.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
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