var CACHE_NAME = "zenkey-cache-v1";
const homeCachedURLs = [
  // html
  '/Home.html',

  // CSS
  '/css/Home.css',
  '/Fonts/Poppins-Regular.ttf',
  '/Fonts/Poppins-Medium.ttf',
  '/Fonts/Poppins-SemiBold.ttf',
  '/Fonts/Poppins-Bold.ttf',
  '/Fonts/Poppins-ExtraLight.ttf',
  '/Fonts/Poppins-Light.ttf',

  // JS
  '/scripts/Navbar.js',
  '/scripts/Footer.js',
  '/scripts/Popups.js',

  // CSS
  '/css/Global.css',
  '/css/Notification.css',

  // Images
  '/Images/PhoneCaseOrange.jpg',
  '/Images/key6.png',
  '/Images/mouse1.png',
  '/Images/PhoneCase2.png',
  '/Images/DeskPad2.png',
  '/Images/key1.png',
  '/Images/mouse5.png',
  '/Images/key4.png',
];
// const testCacheURL=['/pages/Home.html', '/scripts/Navbar.js','./css/Home.css','./Account.html','/pages/OfflineAccount.html','./css/Account.css','../Fonts/Poppins-Regular.ttf','./Images/PhoneCaseOrange.jpg']

const accountCachedURLs = [
  // html
  '/Account.html',
  '/OfflineAccount.html',

  // CSS
  '/css/Account.css',

  // JS
  '/scripts/Account.js',


]

const CACHED_URLS = [...homeCachedURLs, ...accountCachedURLs /* Add more arrays here if needed */];

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
  console.log(CACHED_URLS.includes(requestURL.pathname), requestURL.pathname);
  if (requestURL.pathname === "/Home.html") {
    console.log("pathname is: ", requestURL.pathname);

    event.respondWith(
      // Try to fetch the resource from the network
      fetch(event.request).catch(function () {
        // If network request fails, serve the resource from the cache
        console.log("In the cache", event.request);
        return caches.match(event.request);
      })
    );
  }
  else if (requestURL.pathname === "/Account.html") {
    const params = new URLSearchParams(requestURL.search);
    const section = params.get('section');

    if (section === 'Profile') {
      // Add caching strategy for profile
    } else if (section === 'Orders') {
      // Add caching strategy for orders
    } else if (section === 'Payment') {
      event.respondWith(
        fetch(event.request)
          .catch(function () {
            // If network request fails, serve a generic fallback page
            return caches.match('/OfflineAccount.html'); // Example of a generic fallback page
          })
      );
    }
    else{
      //Change to profile caching strategy
      event.respondWith(
        fetch(event.request)
          .catch(function () {
            // If network request fails, serve a generic fallback page
            return caches.match('/Account.html'); // Example of a generic fallback page
          })
      );

    }

  }
  else if (
    CACHED_URLS.includes(requestURL.href) ||
    CACHED_URLS.includes(requestURL.pathname)
  ){
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request);
        });
      })
    );
  }

  // else{
  //   //generic fallback page
  // }

});



