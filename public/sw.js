const cacheName = 'trollo-cache'

const urlsToCache = [
    '/',
    '/board',
    '/board/:id',
    '/login',
    // '/main.js',
    // 'index.html',
    // '../main.js'
];
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(urlsToCache)
        })
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
    // e.respondWith(
    //     fetch(e.request)
    //         .then(res => {
    //             const resClone = res.clone();
    //             caches
    //                 .open(cacheName)
    //                 .then(cache => {
    //                     cache.add(e.request, resClone);
    //                 });
    //             return res;
    //         }).catch(err => caches.match(e.request))
    // );
});

/* eslint-disable no-console */

// import { register } from 'register-service-worker'

// if (process.env.NODE_ENV === 'production') {
    // register(`${process.env.BASE_URL}service-worker.js`, {
    //     ready() {
    //         console.log(
    //             'App is being served from cache by a service worker.\n' +
    //             'For more details, visit https://goo.gl/AFskqB'
    //         )
    //     },
    //     registered() {
    //         console.log('Service worker has been registered.')
    //     },
    //     cached() {
    //         console.log('Content has been cached for offline use.')
    //     },
    //     updatefound() {
    //         console.log('New content is downloading.')
    //     },
    //     updated() {
    //         console.log('New content is available; please refresh.')
    //     },
    //     offline() {
    //         console.log('No internet connection found. App is running in offline mode.')
    //     },
    //     error(error) {
    //         console.error('Error during service worker registration:', error)
    //     }
    // })
// }