var CACHE_NAME = "zenkey-cache-v3";
const pngroductsAndCartCachedURLs = [
  // html
  'Products.html',

  // CSS
  "./css/Products.css",
  "./css/Global.css",
  "./css/Notification.css",
  "./css/Popups.css",
  // JS
  "./scripts/Productspage.js",
  "./scripts/Navbar.js",
  "./scripts/Products.js",
  "./scripts/Product-view.js",
  "./scripts/Filterbox.js",
  "./scripts/Footer.js",
  "./scripts/Popups.js",

  // Images
  './images/PhoneCaseOrange.jpg',
  './images/key6.png',
  './images/mouse1.png',
  './images/PhoneCase2.png',
  './images/DeskPad2.png',
  './images/key1.png',
  './images/mouse5.png',
  './images/key4.png',
];

// Install event: Cache resources during service worker installation
self.addEventListener("install", function (event) {
  event.waitUntil(
    Promise.all([
      cacheResources(CACHE_NAME, homeCachedURLs),
    ])
  );
});

//activating
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          // Delete only caches with different version numbers
          if (cacheName !== CACHE_NAME && cacheName.indexOf("zenkey-cache-") !== 0) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Network falling back to Cache strategy
self.addEventListener("fetch", function (event) {
  event.respondWith(
    // Try to fetch the resource from the network
    fetch(event.request).catch(function () {
      // If network request fails, serve the resource from the cache
      return caches.match(event.request);
    })
  );
});

// Function to cache resources in a specified cache
function cacheResources(cacheName, urls) {
  return caches.open(cacheName).then(function (cache) {
    // Add all specified URLs to the cache
    return cache.addAll(urls);
  });
}

