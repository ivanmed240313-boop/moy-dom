const CACHE_NAME='dom-online-v1';
const APP_PREFIX='/moy-dom/';
const URLS=[APP_PREFIX, APP_PREFIX+'index.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(URLS)).catch(()=>{}));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ns=>Promise.all(ns.map(n=>n!==CACHE_NAME?caches.delete(n):null))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;if(!e.request.url.startsWith(self.location.origin))return;e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE_NAME).then(ca=>ca.put(e.request,c));return r;}).catch(()=>caches.match(e.request)));});