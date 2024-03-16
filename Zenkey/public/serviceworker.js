// var GLOBAL_CACHE_NAME = "global-cache-v1";
var CACHE_NAME = "cache-v4";
// var PRODUCTS_CACHE_NAME = "productsAndCart-cache-v1";

const homeCacheURLs = [
  '/Home.html',
  '/css/Home.css',
  '/scripts/Home.js'
]

const landingCacheURLs = [
  '/',
  '/Landing.html',
  '/css/LandingPage.css',
  '/scripts/Landing.js'

]

const cartCacheURLs = [
  '/Cart.html',
  '/css/Cart.css',
  '/scripts/Landing.js'

]

// URLs to be cached for the home page
const cachedURLs = [

  //Home files
  '/css/Home.css',
  '/Home.html',

  //Landing Files
  '/css/LandingPage.css',
  '/Landing.html'

];

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

  // CSS
  "./css/Products.css",
  // "./css/Global.css",
  // "./css/Notification.css",
  // "./css/Popups.css",

  // JS
  "./scripts/Productspage.js",
  "./scripts/Navbar.js",
  "./scripts/Products.js",
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

 const CACHED_URLS= [...globalCachedURLs,...productsAndCartCachedURLs,...cachedURLs, ...landingCacheURLs, ...homeCacheURLs, ...cartCacheURLs];

// Install event: Cache resources during service worker installation
self.addEventListener("install", function (event) {
  // Cache everything in CACHED_URLS. Installation fails if anything fails to cache
  // console.log("ACTIVATING");

  event.waitUntil(
    Promise.all([
      cacheResources(CACHE_NAME, productsAndCartCachedURLs),
    ])
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

