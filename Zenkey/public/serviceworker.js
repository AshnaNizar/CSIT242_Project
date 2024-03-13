var CACHE_NAME = "zenkey-cache-v2";
const homeCachedURLs = [
  // html
  './pages/Home.html', 

  // CSS
  './css/Home.css',
    
  // JS
  './scripts/Navbar.js',
  './scripts/Footer.js',
  './scripts/Popups.js',
  
  // CSS
  './css/Global.css',
  './css/Notification.css',

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
  
  // Activate event: Clean up old caches during activation
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

// //installing
// self.addEventListener("install", function (event) {
//     // Cache everything in CACHED_URLS. Installation fails if anything fails to cache
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function (cache) {
//             return cache.addAll(homeCachedURLs);
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

// var HOME_CACHE_NAME = "home-cache-v1";
// var PRODUCTS_CACHE_NAME = "products-cache-v1";

// // URLs to be cached for the home page
// const homeCachedURLs = [
//   // Favicon
//   './favicon.svg',
  
//   // Custom CSS
//   './css/Home.css',
  
//   // Google Fonts
//   'https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Poppins:wght@400;500;700&display=swap',
  
//   // JS
//   './scripts/Navbar.js',
//   './scripts/Footer.js',
//   './scripts/Popups.js',
//   'https://kit.fontawesome.com/8943e9eb68.js',
  
//   // CSS
//   './css/Global.css',
//   './css/Notification.css',

//   'Products.html', 
//   // Images
//   './images/PhoneCaseOrange.jpg', 
//   './images/key6.png', 
//   './images/mouse1.png', 
//   './images/PhoneCase2.png', 
//   './images/DeskPad2.png', 
//   './images/key1.png', 
//   './images/mouse5.png', 
//   './images/key4.png', 
// ];


// var productsCachedURLs = [
//     // Products page caching
//     // HTML
//     "./pages/Products.html",
//     "./Images/key1.png",
//     "./Images/key2.png",
//     "./Images/key3.png",
//     "./Images/key4.png",
//     "./Images/key5.png",
//     "./Images/key6.png",
//     "./Images/key7.png",
//     "./Images/key8.png",
//     "./Images/key9.png",
//     "./Images/key10.png",
//     "./Images/mouse1.png",
//     "./Images/mouse2.png",
//     "./Images/mouse3.png",
//     "./Images/mouse4.png",
//     "./Images/mouse5.png",
//     "./Images/mouse6.png",
//     "./Images/mouse7.png",
//     "./Images/mouse8.png",
//     "./Images/mouse9.png",
//     "./Images/mouse10.png",
//     "./Images/PhoneCase1.png",
//     "./Images/PhoneCase2.png",
//     "./Images/PhoneCase3.png",
//     "./Images/PhoneCase4.png",
//     "./Images/PhoneCase5.png",
//     "./Images/PhoneCase6.png",
//     "./Images/DeskPad2.png",
//     "./Images/DeskPad3.png",
//     "./Images/DeskPad4.png",
//     "./Images/DeskPad1.png",
//     "./Images/DeskPad5.png",
//     "./Images/DeskPad6.png",
//     // CSS
//     "./css/Products.css",
//     "./css/Global.css",
//     "./css/Notification.css",
//     "./css/Popups.css",
//     // JS
//     "./scripts/Productspage.js",
//     "./scripts/Navbar.js",
//     "./scripts/Products.js",
//     "./scripts/Product-view.js",
//     "./scripts/Filterbox.js",
//     "./scripts/Footer.js",
//     "./scripts/Popups.js",

//     // Product-view Page
//     // HTML
//     "./pages/Product-view.html",
//     // JS
//     "./scripts/Product-view.js",
//     //CSS
//     "./css/Product-view.css",

//     // Cart Page
//     // HTML
//     "./pages/Cart.html",
//     // JS
//     "./scripts/Cartpage.js",
//     "./scripts/Navbar.js", 
//     "./scripts/Popups.js",
//     "./scripts/Footer.js",
//     //CSS
//     "./css/Cart.css",
//     "./css/Global.css",
//     "./css/Notification.css"

// ];

// // Install event: Cache resources during service worker installation
// self.addEventListener("install", function (event) {
//     event.waitUntil(
//       Promise.all([
//         cacheResources(HOME_CACHE_NAME, homeCachedURLs),
//         cacheResources(PRODUCTS_CACHE_NAME, productsCachedURLs),
//       ])
//     );
//   });
  
//   // Activate event: Clean up old caches during activation
//   self.addEventListener("activate", function (event) {
//     event.waitUntil(
//       caches.keys().then(function (cacheNames) {
//         return Promise.all(
//           cacheNames.map(function (cacheName) {
//             // Delete outdated caches
//             if (
//               cacheName !== HOME_CACHE_NAME &&
//               cacheName !== PRODUCTS_CACHE_NAME &&
//               cacheName.startsWith("gih-cache")
//             ) {
//               return caches.delete(cacheName);
//             }
//           })
//         );
//       })
//     );
//   });
  
//   // Fetch event: Network falling back to Cache strategy
//   self.addEventListener("fetch", function (event) {
//     event.respondWith(
//       // Try to fetch the resource from the network
//       fetch(event.request).catch(function () {
//         // If network request fails, serve the resource from the cache
//         return caches.match(event.request);
//       })
//     );
//   });
  
//   // Function to cache resources in a specified cache
//   function cacheResources(cacheName, urls) {
//     return caches.open(cacheName).then(function (cache) {
//       // Add all specified URLs to the cache
//       return cache.addAll(urls);
//     });
//   }