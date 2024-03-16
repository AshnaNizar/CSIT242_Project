var GLOBAL_CACHE_NAME = "global-cache-v1";
var PRODUCTS_CACHE_NAME = "productsAndCart-cache-v1";

const globalCachedURLs = [

  // FONTS
  './Fonts/Poppins-Regular.ttf',
  './Fonts/Poppins-Medium.ttf',
  './Fonts/Poppins-Bold.ttf',
  './Fonts/Poppins-SemiBold.ttf',
  '/Fonts/Poppins-Light.ttf',

  // NavBar/Footer and Images
  './scripts/Footer.js',
  './scripts/Navbar.js',
  './Images/Logo.jpeg',
  './Images/double-tick.png',
  './Images/EmptyNotification.png',

  // CSS 
  "./css/Global.css",
  "./css/Notification.css",

  // Products Images
  "./Images/key1.png",
  "./Images/key2.png",
  "./Images/key3.png",
  "./Images/key4.png",
  "./Images/key5.png",
  "./Images/key6.png",
  "./Images/key7.png",
  "./Images/key8.png",
  "./Images/key9.png",
  "./Images/key10.png",
  "./Images/mouse1.png",
  "./Images/mouse2.png",
  "./Images/mouse3.png",
  "./Images/mouse4.png",
  "./Images/mouse5.png",
  "./Images/mouse6.png",
  "./Images/mouse7.png",
  "./Images/mouse8.png",
  "./Images/mouse9.png",
  "./Images/mouse10.png",
  "./Images/PhoneCase1.png",
  "./Images/PhoneCase2.png",
  "./Images/PhoneCase3.png",
  "./Images/PhoneCase4.png",
  "./Images/PhoneCase5.png",
  "./Images/PhoneCase6.png",
  "./Images/DeskPad2.png",
  "./Images/DeskPad3.png",
  "./Images/DeskPad4.png",
  "./Images/DeskPad1.png",
  "./Images/DeskPad5.png",
  "./Images/DeskPad6.png",

];

const productsAndCartCachedURLs = [
  // html
  'Products.html',
  'Product-view.html',
  "Cart.html",

  // JS
  "./scripts/Productspage.js",
  "./scripts/Products.js",
  "./scripts/Product-view.js",
  "./scripts/Filterbox.js",
  "./scripts/Popups.js",
  "./scripts/Cartpage.js",

  // CSS
  "./css/Products.css",
  "./css/Popup.css",
  "./css/Product-view.css",
  "./css/Cart.css",

];

// Install event: Cache resources during service worker installation
self.addEventListener("install", function (event) {
  event.waitUntil(
    Promise.all([
      cacheResources(GLOBAL_CACHE_NAME, globalCachedURLs),
      cacheResources(PRODUCTS_CACHE_NAME, productsAndCartCachedURLs),
    ])
  );
});

// Fetch event: Network first falling back to Cache strategy for PRODUCTS_CACHE_NAME
// Cache first falling back to Network strategy for GLOBAL_CACHE_NAME
self.addEventListener("fetch", function (event) {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.pathname.includes('/Products.html') ||
      requestUrl.pathname.includes('/Product-view.html') ||
      requestUrl.pathname.includes('/Cart.html')) {
    // For URLs that should use products cache strategy
    event.respondWith(
      caches.open(PRODUCTS_CACHE_NAME).then(function (productsCache) {
        return fetch(event.request).then(function (response) {
          // Update products cache from network
          productsCache.put(event.request, response.clone());
          return response;
        }).catch(function () {
          return productsCache.match(event.request).then(function (response) {
            return response || fetch(event.request);
          });
        });
      })
    );
  } else {
    // For other URLs that should use global cache strategy
    event.respondWith(
      caches.open(GLOBAL_CACHE_NAME).then(function (globalCache) {
        return globalCache.match(event.request).then(function (response) {
          // If resource is found in global cache, return it
          if (response) {
            // Fetch and update the resource from the network in the background
            fetchAndCache(event.request, GLOBAL_CACHE_NAME);
            return response;
          }
          // If resource is not found in global cache, try fetching it from products cache
          return caches.open(PRODUCTS_CACHE_NAME).then(function (productsCache) {
            return productsCache.match(event.request).then(function (response) {
              // If resource is found in products cache, return it
              if (response) {
                // Fetch and update the resource from the network in the background
                fetchAndCache(event.request, PRODUCTS_CACHE_NAME);
                return response;
              }
              // If resource is not found in any cache, fetch from network
              return fetch(event.request);
            });
          });
        });
      })
    );
  }
});

// Function to fetch and cache a resource in a specified cache
function fetchAndCache(request, cacheName) {
  fetch(request).then(function (response) {
    if (response) {
      caches.open(cacheName).then(function (cache) {
        cache.put(request, response.clone());
      });
    }
  });
}

// Function to cache resources in a specified cache
function cacheResources(cacheName, urls) {
  return caches.open(cacheName).then(function (cache) {
    // Add all specified URLs to the cache
    return cache.addAll(urls);
  });
}
