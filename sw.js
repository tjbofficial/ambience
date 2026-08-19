// Minimal service worker for Ambience.
//
// This doesn't do offline caching of anything fancy -- its purpose here is
// just to make the app properly installable as a PWA (a registered service
// worker is one of the standard install criteria alongside the manifest).
// It is NOT what keeps audio playing in the background: service workers run
// in a separate thread with no access to the Web Audio API. That part is
// handled in index.html via the Media Session API and by keeping the tab
// "audible" (see the comments around logicTick() there).
 
const CACHE_NAME = "ambience-v1";
const CORE_ASSETS = ["./", "./index.html", "./manifest.json"];
 
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});
 
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});
 
// Network-first for navigation/HTML so updates show up promptly; cached
// fallback only if the network is unavailable.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
