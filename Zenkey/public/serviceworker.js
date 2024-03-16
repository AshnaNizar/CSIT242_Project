// Define cache names for different caches
var CACHE_NAME = "cache-v3";

// URLs to be cached for the home page

const cachedURLs = [
  //Navbar And Footer
  '/scripts/Navbar.js',
  '/scripts/Footer.js',

  // '/favicon.svg',

  //Home files
  '/css/Home.css',
  '/Home.html',

  //Landing Files
  '/css/LandingPage.css',
  '/Landing.html'
  // 'https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Poppins:wght@400;500;700&display=swap',
  // '/scripts/Popups.js',
  // 'https://kit.fontawesome.com/8943e9eb68.js',
  // '/css/Global.css',
  // '/css/Notification.css',
  // '/Products.html',
  // '/images/PhoneCaseOrange.jpg',
  // '/images/key6.png',
  // '/images/mouse1.png',
  // '/images/PhoneCase2.png',
  // '/images/DeskPad2.png',
  // '/images/key1.png',
  // '/images/mouse5.png',
  // '/images/key4.png',
  // '/Home.html'
];



// Install event: Cache resources during service worker installation
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(cachedURLs).catch(function (error) {
        console.error('Failed to cache some resources:', error);
      });
    })
    
  );
});


// self.addEventListener("fetch", function(event) {
//   const url = new URL(event.request.url);
//   const pathname = url.pathname;
//   console.log('Handling fetch event for', pathname);

//   // Define specific behavior for 'home.html' and 'home.css' - Cache Fallback to Network
//   if (pathname.endsWith('/home.html') || pathname.endsWith('/home.css')) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(cache => {
//         return cache.match(event.request).then(response => {
//           return response || fetch(event.request).then(networkResponse => {
//             cache.put(event.request, networkResponse.clone());
//             return networkResponse;
//           });
//         });
//       })
//     );
//   }
//   // Define specific behavior for 'cart.html' - Network Fallback to Cache
//   else if (pathname.endsWith('/cart.html')) {
//     event.respondWith(
//       fetch(event.request).then(networkResponse => {
//         return caches.open(CACHE_NAME).then(cache => {
//           cache.put(event.request, networkResponse.clone());
//           return networkResponse;
//         });
//       }).catch(() => {
//         return caches.match(event.request);
//       })
//     );
//   }
//   // Default behavior for all other requests - Dynamic Caching
//   else {
//     event.respondWith(
//       fetch(event.request).then(networkResponse => {
//         // If the fetch succeeds, cache the response
//         return caches.open(CACHE_NAME).then(cache => {
//           cache.put(event.request, networkResponse.clone());
//           return networkResponse;
//         });
//       }).catch(() => {
//         // If the network request fails, try to serve from the cache
//         return caches.match(event.request);
//       })
//     );
//   }
// });

self.addEventListener("fetch", function(event) {
  const url = new URL(event.request.url);
  const pathname = url.pathname;
  // console.log('Handling fetch event for', pathname);

  // Define specific behavior for 'home.html' and 'home.css' - Cache Fallback to Network
  if (pathname.endsWith('/Home.html') ||  pathname.endsWith('/Landing.html') || pathname.endsWith('/Checkout.html') ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          if (response) {
            console.log(`Serving123 ${pathname} from cache`);
            return response;
          } else {
            return fetch(event.request).then(networkResponse => {
              console.log(`Caching and serving ${pathname} from network`);
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          }
        });
      })
    );
  }
  // Define specific behavior for 'cart.html' - Network Fallback to Cache
  else if (pathname.endsWith('/css/Cart.css')) {
    event.respondWith(
      fetch(event.request).then(networkResponse => {
        console.log(`Caching and serving ${pathname} from network`);
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        console.log(`Serving456 ${pathname} from cache due to network failure`);
        return caches.match(event.request);
      })
    );
  }
  // Default behavior for all other requests - Dynamic Caching
  else {
    if(pathname.indexOf(".html") === -1){
    event.respondWith(
      fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        return caches.match(event.request);
      })
    );
  }else{
    console.log('HEHE');
    event.respondWith(
      fetch(event.request)
        .catch(function () {
          // If network request fails, serve a generic fallback page
          return caches.match('/'); // Example of a generic fallback page
        })
    );
  }
}
});

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