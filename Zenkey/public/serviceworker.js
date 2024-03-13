var CACHE_NAME = "zenkey-cache-v1";
var CACHED_URLS = [

    // Images for home.html
    "./images/Logo.jpeg",
    "./images/logo_orange.png",
    "./images/keyboardWhite.jpg",
    "./images/PhoneCaseOrange.jpg",
    "./images/premiumkey .png",
    "./images/mouse (2).png",
    "./images/deskpad.webp",
    "./images/case.png",
    "./images/key1.png",
    "./images/mouse5.png",
    "./images/key4.png",
    //HTML Pages
    // Account.html
    "./pages/Account.html",
    //SCRIPTS
    //Account.js
    "./scripts/Account.js",
    //STYLESHEETS
    //Account.css
    "./css/Account.css",
    //Json
    "./json/products.json"


];

//installing
self.addEventListener("install", function (event) {
    // Cache everything in CACHED_URLS. Installation fails if anything fails to cache
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(CACHED_URLS);
        })
    );
});

self.addEventListener('fetch', function(event) {
      // Handle requests for Account/Orders
    var requestURL = new URL(event.request.url);
    if(requestURL.pathname === "/Account/Orders"){
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          var fetchPromise = fetch(event.request).then(function(networkResponse) {
            // If the network response is valid and differs from the cached version
            // Update the cache with the new response
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(function() {
            // If the network request fails, serve the cached response
            return response;
          });
  
          // Return the network response if available, otherwise return the cached response
          return response || fetchPromise;
        });
      })
    );
    }
  });
  
  
//activating
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (CACHE_NAME !== cacheName && cacheName.startsWith("gih-cache")) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
