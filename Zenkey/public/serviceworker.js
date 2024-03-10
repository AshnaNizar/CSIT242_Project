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
