// Fish Dryer service worker
// v5.1 — same-origin only, network-first for the app shell.
//
// The previous version cached EVERY successful GET, including the Google Drive
// API responses used for sync. Those cached replies were then served back
// forever, so a phone could keep reading an old copy of the cloud file and
// never see what the other phone had saved. It also served index.html from
// cache first, so app updates only appeared after a second launch.

const CACHE = "fishdryer-v5.1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {})),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  // Never touch anything that isn't our own files — Google sign-in and the
  // Drive sync calls must always go straight to the network.
  if (url.origin !== self.location.origin) return;

  const isShell =
    req.mode === "navigate" ||
    url.pathname.endsWith("/") ||
    url.pathname.endsWith(".html");

  if (isShell) {
    // network first, fall back to cache when offline
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() =>
          caches
            .match(req)
            .then((c) => c || caches.match("./index.html")),
        ),
    );
    return;
  }

  // static assets: cache first, refresh in the background
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    }),
  );
});

// The old worker called skipWaiting() during install, so a new version took
// over and reloaded the page without warning — possibly while someone was
// halfway through entering a record. Now the app shows its update banner and
// the user decides when to reload.
self.addEventListener("message", (e) => {
  if (e.data === "skipWaiting") self.skipWaiting();
});
