/* eslint-env serviceworker */

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

import { clientsClaim } from "workbox-core";
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { StaleWhileRevalidate, NetworkFirst } from "workbox-strategies";
import { googleFontsCache } from "workbox-recipes";
import { ExpirationPlugin } from "workbox-expiration";
import { Queue } from "workbox-background-sync";

self.skipWaiting();
clientsClaim();

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST);

const backgroundSyncSupported = "sync" in self.registration || false;
console.log("BackgroundSyncSupported: ", backgroundSyncSupported);

let createPostQueue;
if (backgroundSyncSupported) {
  createPostQueue = new Queue("createPostQueue", {
    onSync: async ({ queue }) => {
      let entry;
      while ((entry = await queue.shiftRequest())) {
        try {
          await fetch(entry.request);
          console.log("Replay successful for request", entry.request);
          const channel = new BroadcastChannel("sw-messages");
          channel.postMessage({ msg: "offline-post-uploaded" });
        } catch (error) {
          console.error("Replay failed for request", entry.request, error);

          // Put the entry back in the queue and re-throw the error:
          await queue.unshiftRequest(entry);
          throw error;
        }
      }
      console.log("Replay complete!");
    },
  });
}

cleanupOutdatedCaches();

// Non-SSR fallback to index.html
// Production SSR fallback to offline.html (except for dev)
// if (process.env.MODE !== "ssr" || process.env.PROD) {
//   registerRoute(
//     new NavigationRoute(
//       createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML),
//       { denylist: [/sw\.js$/, /workbox-(.)*\.js$/] }
//     )
//   );
// }

// const savePostResponsePlugin = {
//   cacheKeyWillBeUsed: async ({ request, mode, event }) => {
//     if (mode === "write") {
//       // Use the same URL as `POST` request as the cache key.
//       // Alternatively, use a different URL.
//       return request.url;
//     }
//   },
// };

// Cache the Google Fonts stylesheets with a stale while revalidate strategy.
googleFontsCache({
  cachePrefix: "google-fonts",
  maxEntries: 60,
});

registerRoute(
  ({ url }) => url.pathname.startsWith("/posts"),
  new NetworkFirst({
    cacheName: "qaravel-api",
  })
);

// registerRoute(
//   ({ url }) => url.pathname.startsWith("/posts"),
//   new NetworkFirst({
//     cacheName: "qaravel-api-post",
//     plugins: [
//       // Add the custom plugin to your strategy.
//       savePostResponsePlugin,
//       new ExpirationPlugin({
//         maxEntries: 100,
//         maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
//       }),
//     ],
//   }),
//   "POST"
// );

registerRoute(
  ({ url }) => url.href.startsWith("http"),
  new StaleWhileRevalidate()
);

self.addEventListener("fetch", (event) => {
  if (backgroundSyncSupported) {
    if (event.request.url.endsWith("/posts/store")) {
      // Clone the request to ensure it's safe to read when
      // adding to the Queue.
      const promiseChain = fetch(event.request.clone()).catch((err) => {
        return createPostQueue.pushRequest({ request: event.request });
      });

      event.waitUntil(promiseChain);
    }
  }
});
