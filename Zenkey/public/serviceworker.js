// importScripts("/scripts/Account.js");

var CACHE_NAME = "zenkey-cache-v2";

const homeCacheURLs = [
  '/Home.html',
  '/css/Home.css',
  '/scripts/Home.js',
  '/Images/keyboardWhite.jpg',
  '/Images/PhoneCaseOrange.jpg',
  '/Images/visa_logo.png',
  '/Signup.html',
  '/scripts/Signup.js',
]

const landingCacheURLs = [
  '/',
  '/Landing.html',
  '/css/LandingPage.css',
  '/scripts/Landing.js',
  '/scripts/progressive-ui-kitt/themes/flat.css',
  '/scripts/progressive-ui-kitt/progressive-ui-kitt.js',


]

const checkoutCacheURLs = [
  '/OfflineCheckout.html',
  '/css/Checkout.css',
  '/scripts/Checkout.js',
  '/Images/ms_logo.jpg',

]

const accountCachedURLs = [
  // html
  '/Account.html',
  '/OfflinePayment.html',

  // CSS
  '/css/Account.css',

  // JS
  '/scripts/Account.js',
  '/scripts/Orders.js'

]

const globalCachedURLs = [

  // FONTS
  './Fonts/Poppins-Regular.ttf',
  './Fonts/Poppins-Medium.ttf',
  './Fonts/Poppins-Bold.ttf',
  './Fonts/Poppins-SemiBold.ttf',
  './Fonts/Poppins-Light.ttf',
  './Fonts/Poppins-ExtraLight.ttf',
  './Fonts/REFAULT.ttf',
  './Fonts/REFAULT.woff',
  './Fonts/REFAULT.woff2',
  './Fonts/Oswald-Bold.ttf',
  './Fonts/Oswald-ExtraLight.ttf',
  './Fonts/Oswald-Light.ttf',
  './Fonts/Oswald-Medium.ttf',
  './Fonts/Oswald-Regular.ttf',
  './Fonts/Oswald-SemiBold.ttf',


  // NavBar/Footer and Images
  './scripts/Footer.js',
  './scripts/Navbar.js',
  './Images/Logo.jpeg',
  './Images/double-tick.png',
  './Images/EmptyNotification.png',

  // CSS 
  "./css/Global.css",
  "./css/Notification.css",
  "./css/Offline.css",

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

  //Offline Image
  "./Images/Offline.jpg",

  //Icons
  "/css/all.min.css",
  "/css/fontawesome.min.css",

  //HTML
  "/OfflineFallback.html"
];

const productsAndCartCachedURLs = [
  // html
  '/Products.html',
  '/Product-view.html',
  "/Cart.html",

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

const CACHED_URLS = [...globalCachedURLs, ...productsAndCartCachedURLs, ...accountCachedURLs, ...landingCacheURLs, ...homeCacheURLs, ...checkoutCacheURLs];

// Install event: Cache resources during service worker installation
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CACHED_URLS).catch(function (error) {
        console.error('Failed to cache some resources:', error);
      });
    })

  );
});

// Activate event: Clean up old caches during activation
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

self.addEventListener("fetch", function (event) {
  const url = new URL(event.request.url);
  const pathname = url.pathname;
  // console.log('Handling fetch event for', pathname);

  // Define specific behavior for 'home.html' and 'home.css' - Cache Fallback to Network
  if (pathname.endsWith('/Home.html') || pathname.endsWith('/Landing.html') || pathname.endsWith('/Signup.html')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          if (response) {
            return response;
          } else {
            return fetch(event.request).then(networkResponse => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          }
        });
      })
    );
  } else if (pathname.endsWith('/Checkout.html')) {
    event.respondWith(
      fetch(event.request).then(networkResponse => {
        return networkResponse;
      }).catch(() => {
        return caches.match('/OfflineCheckout.html');
      })
    );
  }
  // Define specific behavior for 'cart.html' - Network Fallback to Cache
  else if (pathname.endsWith('/css/Cart.css')) {
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
  } else if (pathname.includes('/Products.html') ||
    pathname.includes('/Product-view.html') ||
    pathname.includes('/Cart.html')) {
    // For URLs that should use products cache strategy
    event.respondWith(
      caches.open(CACHE_NAME).then(function (productsCache) {
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
  }

  else if (url.pathname === "/Account.html") {
    console.log(url.pathname);
    const params = new URLSearchParams(url.search);
    const section = params.get('section');
    if (section === 'profile' || section === null) {
      // Add caching strategy for 
      event.respondWith(
        fetch(event.request)
          .catch(function () {
            console.log("Looking offline")
            self.registration.sync.register('sync-profile').then(() => {
              console.log('Background sync registered after fetch');
            }).catch(err => {
              console.log('Failed to register background sync', err);
            })

            // If network request fails, serve a generic fallback page
            return caches.match('/Account.html'); // Example of a generic fallback page


          })
      );


    } else if (section === 'orders') {
      console.log("Here comes the orders event request:", event.request);
      // Add caching strategy for orders
      event.respondWith(
        fetch(event.request)
          .catch(function () {
            console.log("Looking offline")
            return caches.match('/Account.html'); 


          })
      );


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
  }
  // Default behavior for all other requests - Dynamic Caching
  else {
  if (pathname.indexOf(".html") === -1) {
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
  } else {
    event.respondWith(
      fetch(event.request)
        .catch(function () {
          // If network request fails, serve a generic fallback page
          return caches.match('/OfflineFallback.html'); // Example of a generic fallback page
        })
    );
  }
}
});



// In service-worker.js
// self.addEventListener("sync", function (event) {
//   if (event.tag === "send-messages") {
//     event.waitUntil(function () {
//       var sent = deleteUsers();
//       if (sent) {
//         return Promise.resolve();
//       } else {
//         return Promise.reject();
//       }
//     });
//   }
// });

self.addEventListener("sync", function (event) {
  if (event.tag === "sync-profile") {
    event.waitUntil(syncUserProfile());
  }
});

function syncUserProfile() {
  return new Promise((resolve, reject) => {
    // Open a connection to the database
    var openRequest = indexedDB.open("UsersDB", 1);

    openRequest.onerror = function (event) {
      reject("Error opening IndexedDB:", event.target.error);
    };

    openRequest.onsuccess = function (event) {
      var db = event.target.result;

      // Start a new transaction and get the object store
      var transaction = db.transaction("Users", "readwrite");
      var store = transaction.objectStore("Users");

      // Get all users with status "updating"
      var index = store.index("status");
      var getRequest = index.getAll("updating");

      getRequest.onsuccess = function () {
        var users = getRequest.result;

        // Process each user with status "updating"
        users.forEach(user => {
          // Perform sync operations for user profile updates to the server
          // Once the sync is successful, update the IndexedDB accordingly
          // You can call the updateUserProfile function from here
          updateUserProfile(user.name, user.email, user.password)
            .then(() => {
              // Update the status to "saved" if sync is successful
              user.status = "saved";
              var updateRequest = store.put(user);

              updateRequest.onerror = function (event) {
                console.error("Error updating user status:", event.target.error);
              };
            })
            .catch(error => {
              console.error("Error syncing user profile:", error);
              // Handle errors and provide appropriate feedback to the user
            });
        });

        resolve();
      };

      getRequest.onerror = function (event) {
        reject("Error fetching users with status 'updating' from IndexedDB:", event.target.error);
      };
    };
  });
}

function updateUserProfile(name, email, password) {
  return new Promise((resolve, reject) => {
    // Simulate updating user profile on the server
    // Replace this with your actual code to update user profile on the server
    setTimeout(() => {
      console.log("User profile updated on the server");
      resolve();
    }, 2000); // Simulating 2 seconds delay for the server request
  });
}



function deleteUsers() {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open("UsersDB", 1);

    openRequest.onerror = function (event) {
      reject("Error opening IndexedDB:", event.target.error);
    };

    openRequest.onsuccess = function (event) {
      const db = event.target.result;

      // Assuming the object store for users is named "Users"
      const transaction = db.transaction(["Users"], "readwrite");
      const store = transaction.objectStore("Users");

      // Get all users
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = function () {
        const users = getAllRequest.result;

        // Delete each user
        users.forEach(user => {
          const deleteRequest = store.delete(user.email); // Assuming 'email' is the key path

          deleteRequest.onsuccess = function () {
            console.log(`User with email ${user.email} deleted successfully.`);
          };

          deleteRequest.onerror = function (event) {
            console.error("Error deleting user from IndexedDB:", event.target.error);
          };
        });

        resolve();
      };

      getAllRequest.onerror = function (event) {
        reject("Error fetching users from IndexedDB:", event.target.error);
      };
    };
  });
}

self.addEventListener('sync', event => {
  if (event.tag === 'sync-signups') {
    event.waitUntil(syncSignups());
  }
});

function syncSignups() {
  // Open a connection to the database.
  var openRequest = indexedDB.open("UsersDB", 1);

  // Called when the database has been successfully opened.
  openRequest.onsuccess = function(e) {
      var db = e.target.result;

      // Start a new transaction and get the object store.
      var transaction = db.transaction("Users", "readwrite");
      var store = transaction.objectStore("Users");

      // Make a request to get data from the object store
      var getRequest = store.getAll();

      getRequest.onsuccess = function() {
          // Handle the retrieved data here
          var userData = getRequest.result;
          console.log("Retrieved user data:", userData);

          // Proceed with further actions if needed
          // For example, you can process the retrieved data or update the UI
      };

      getRequest.onerror = function(event) {
          // Handle errors that occurred during the get operation.
          console.error("Error getting user data: ", event.target.error);
      };
  };

  // Called when the database version needs to be upgraded.
  openRequest.onupgradeneeded = function(e) {
      var db = e.target.result;
      if (!db.objectStoreNames.contains('Users')) {
          db.createObjectStore("Users", { keyPath: "email" });
      }
  };

  openRequest.onerror = function(event) {
      console.error("Error opening database: ", event.target.error);
  };
}
