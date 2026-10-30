/* Bump CACHE_VERSION on every release. Add every new content file to FILES. */
var CACHE_VERSION="ga-genmath-g11-t2-v1.1.0";
var FILES=["./","index.html","styles.css","app.js","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","content/weeks.js","content/w03.js"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE_VERSION).then(function(c){return c.addAll(FILES)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==CACHE_VERSION}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request).then(function(n){if(n.ok){var c=n.clone();caches.open(CACHE_VERSION).then(function(x){x.put(e.request,c)})}return n})}).catch(function(){return caches.match("index.html")}))});
