'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "94330bf244615b109680ea20bea047ca",
"assets/FontManifest.json": "e9fb29a840857a9d241293b208067076",
"assets/fonts/AnticDidone-Regular.ttf": "e917b5a9dcd9a24157425a9aee6da804",
"assets/fonts/Average-Regular.ttf": "05ac1d5474d6a5d6144f3b8a05909bda",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/fonts/Mulish-Bold.ttf": "61c613ce75f3ec856472a9c3994c8733",
"assets/fonts/Mulish-Regular.ttf": "ea2073481fc08be50e93657c983686e0",
"assets/fonts/Mulish-SemiBold.ttf": "7bd75d34e40623b038e44c78584ceb33",
"assets/fonts/Poppins-Medium.ttf": "f61a4eb27371b7453bf5b12ab3648b9e",
"assets/fonts/Poppins-Regular.ttf": "8b6af8e5e8324edfd77af8b3b35d7f9c",
"assets/fonts/Poppins-SemiBold.ttf": "4cdacb8f89d588d69e8570edcbe49507",
"assets/fonts/Poppins-Thin.ttf": "25cd0f688f815bc4f6ac2b71eb6278ba",
"assets/images/bookimg1.png": "961898d1c685dbb29ce7504ae48ce0a4",
"assets/images/c19vaxinfoimg1.png": "fa959bfc931d61fd351f3d83b2a6e25f",
"assets/images/c19vaxinfoimg2.png": "d66f7b5932b65df82df3e99c6f93081d",
"assets/images/c19vaxinfoimg3.png": "27c1e06f061d1caad65c7f76a299165a",
"assets/images/c19vaxinfoimg4.png": "dfbc2967706a37e6433e341c47d22ff0",
"assets/images/calendar.png": "89c27174baffebb0b53818fc9c41c9ff",
"assets/images/check_icon.svg": "9a99b3d621af33dcc18a58beb3b79e8c",
"assets/images/google_logo.png": "b75aecaf9e70a9b1760497e33bcd6db1",
"assets/images/healthdecimg1.png": "08b68bd53638a76a2cf3ac6a4728665c",
"assets/images/imagecp.png": "152ef08e703b255271dc628f695a598a",
"assets/images/Logo_BSN.png": "962b0cb681caff17bddaeb905b19d12e",
"assets/images/Logo_BSN.svg": "b572e7ba2688059435aeafa4fa75f234",
"assets/images/missappt1.png": "7e6823bdfafd4bd6cfc1ce8fad99666d",
"assets/images/missed_icon.svg": "53de338654303cbd6448fff9684e9a99",
"assets/images/nashimg.png": "1abbedef943c63a701c0f14b3532049c",
"assets/images/onb1.png": "4d72ae6052a62f71eb18690c4f5c2e5a",
"assets/images/onb2.png": "57080e1a9e6f430861b6b01c776905fd",
"assets/images/reject_icon.svg": "ede3f3595cff5aa06fa6caf882705c9c",
"assets/images/schedule_icon.svg": "b1fd95889fba099fc2cb6de4355a2eb4",
"assets/images/settings_icon.svg": "6522990093c5e59b31b2410a1e494415",
"assets/images/signout_icon.svg": "e425fd51b019bb25fd3d1be10a39661c",
"assets/images/stopwatch1.png": "fa4706f25241b70d8371fafbcb60289e",
"assets/images/user.png": "ff22a7d131647c54106ea252c6094bc5",
"assets/images/vaccine_icon.svg": "3676eb9ef9649c7cc43d94399166962e",
"assets/images/vaxinfoimg1.png": "60084ff0bf02f9799216d9f3e87ba338",
"assets/images/webimage.svg": "ae8af6e8c8deffa927cc1792b4677362",
"assets/NOTICES": "a7e8e688b33526b5a63da54e203fb29f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "8946d39a7c4e08198a7d977b9b954690",
"/": "8946d39a7c4e08198a7d977b9b954690",
"main.dart.js": "3f855915a1208cf8ef46bfd94b827976",
"manifest.json": "d456833420170a1faa832a8174cc20f8",
"version.json": "72bcc1b62ed3298015433cc168318c56"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
