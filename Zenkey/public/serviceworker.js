var CACHE_NAME = "zenkey-cache-v0";

const globalCaches=[
  '/css/Global.css'
]
const productCachedURLs = [
  // html
  '/Products.html',

  // CSS
  "/css/Products.css",
  // "./css/Global.css",
  // "./css/Notification.css",
  // "./css/Popups.css",

  // JS
  "/scripts/Productspage.js",
  "/scripts/Navbar.js",
  "/scripts/Products.js",
  // "./scripts/Filterbox.js",
  // "./scripts/Footer.js",
  // "./scripts/Popups.js",
];
// const testCacheURL=['/pages/Home.html', '/scripts/Navbar.js','./css/Home.css','./Account.html','/pages/OfflinePayment.html','./css/Account.css','../Fonts/Poppins-Regular.ttf','./Images/PhoneCaseOrange.jpg']
const fontCaches=[
  '/Fonts/Poppins-Regular.ttf',
  '/Fonts/Poppins-Medium.ttf',
  '/Fonts/Poppins-SemiBold.ttf',
  '/Fonts/Poppins-Bold.ttf',
  '/Fonts/Poppins-ExtraLight.ttf',
  '/Fonts/Poppins-Light.ttf'

]
const accountCachedURLs = [
  // html
  '/OfflinePayment.html',

  // CSS
  '/css/Account.css',

  // JS
  '/scripts/Account.js',


]

const CACHED_URLS = [...productCachedURLs, ...fontCaches, ...globalCaches, ...accountCachedURLs /* Add more arrays here if needed */];

// Install event: Cache resources during service worker installation
self.addEventListener("install", function (event) {
  // Cache everything in CACHED_URLS. Installation fails if anything fails to cache
  // console.log("ACTIVATING");

  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

//activating
self.addEventListener("activate", function (event) {
  console.log("ACTIVATING");
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Network falling back to Cache strategy
self.addEventListener("fetch", function (event) {
  var requestURL = new URL(event.request.url);
  if (requestURL.pathname === "/Home.html") {
    console.log("pathname is: ", requestURL.pathname);

    event.respondWith(
      // Try to fetch the resource from the network
      fetch(event.request).catch(function () {
        // If network request fails, serve the resource from the cache
        return caches.match(event.request);
      })
    );
  }
  else if (requestURL.pathname === "/Account.html") {
    const params = new URLSearchParams(requestURL.search);
    const section = params.get('section');
    if (section === 'profile' || section === null) {
      // Add caching strategy for profile
    } else if (section === 'orders') {
      // Add caching strategy for orders
    } else if (section === 'payment') {
      event.respondWith(
        fetch(event.request)
          .catch(function () {
            console.log("Looking offline")

            // If network request fails, serve a generic fallback page
            return caches.match('/OfflinePayment.html'); // Example of a generic fallback page
          })
      );
    }
    else {
      //Change to profile caching strategy
      event.respondWith(
        fetch(event.request)
          .catch(function () {
            // If network request fails, serve a generic fallback page
            return caches.match('/Account.html'); // Example of a generic fallback page
          })
      );

    }
  } // <-- This is the missing curly brace
  else if (
    CACHED_URLS.includes(requestURL.href) ||
    CACHED_URLS.includes(requestURL.pathname)
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request);
        });
      })
    );
  }
 
});
function cacheResources(cacheName, urls) {
  return caches.open(cacheName).then(function (cache) {
    // Add all specified URLs to the cache
    return cache.addAll(urls);
  });
}
