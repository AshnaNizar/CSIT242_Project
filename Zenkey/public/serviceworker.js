// var CACHE_NAME = "zenkey-cache-v1";
// var CACHED_URLS = [

//     // Images for home.html
//     "./images/Logo.jpeg",
//     "./images/logo_orange.png",
//     "./images/keyboardWhite.jpg",
//     "./images/PhoneCaseOrange.jpg",
//     "./images/premiumkey .png",
//     "./images/mouse (2).png",
//     "./images/deskpad.webp",
//     "./images/case.png",
//     "./images/key1.png",
//     "./images/mouse5.png",
//     "./images/key4.png",
//     //Json
//     "./json/products.json"


// ];

// //installing
// self.addEventListener("install", function (event) {
//     // Cache everything in CACHED_URLS. Installation fails if anything fails to cache
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function (cache) {
//             return cache.addAll(CACHED_URLS);
//         })
//     );
// });


// //activating
// self.addEventListener("activate", function (event) {
//     event.waitUntil(
//         caches.keys().then(function (cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function (cacheName) {
//                     if (CACHE_NAME !== cacheName && cacheName.startsWith("gih-cache")) {
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });

// ---------------------------------------------

var HOME_CACHE_NAME = "home-cache-v1";
var PRODUCTS_CACHE_NAME = "products-cache-v1";
var CART_CACHE_NAME = "cart-cache-v1";

var homeCachedURLs = [
    // Add URLs for home page caching
    "./images/Logo.jpeg",
    // Add other home page resources
    "./home.html"
];

var productsCachedURLs = [
    // Products page caching
    // HTML
    "./pages/Products.html",
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

    // Product-view Page
    // HTML
    "./pages/Product-view.html",
    // JS
    "./scripts/Product-view.js",
    //CSS
    "./css/Product-view.css",

    // Cart Page
    // HTML
    "./pages/Cart.html",
    // JS
    "./scripts/Cartpage.js",
    "./scripts/Navbar.js",
    "./scripts/Popups.js",
    "./scripts/Footer.js",
    //CSS
    "./css/Cart.css",
    "./css/Global.css",
    "./css/Notification.css"

];

// var cartCachedURLs = [
//     // Add URLs for cart page caching
//     "./images/cart1.jpg",
//     // Add other cart page resources
//     "./cart.html"
// ];

// Install event: Cache resources during service worker installation
self.addEventListener("install", function (event) {
    event.waitUntil(
      Promise.all([
        cacheResources(HOME_CACHE_NAME, homeCachedURLs),
        cacheResources(PRODUCTS_CACHE_NAME, productsCachedURLs),
        cacheResources(CART_CACHE_NAME, cartCachedURLs),
      ])
    );
  });
  
  // Activate event: Clean up old caches during activation
  self.addEventListener("activate", function (event) {
    event.waitUntil(
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            // Delete outdated caches
            if (
              cacheName !== HOME_CACHE_NAME &&
              cacheName !== PRODUCTS_CACHE_NAME &&
              cacheName !== CART_CACHE_NAME &&
              cacheName.startsWith("gih-cache")
            ) {
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