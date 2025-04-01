const cache = 'pwa-task2-cache';
const pagesToCache = [
    './index.html',
    './js/script.js',
    './styles.css'
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cache)
            .then(cache => {
                console.log(`Cache Pages`);
                return cache.addAll(pagesToCache);
            })
    )
})

self.addEventListener('activate', event => {
    console.log(`service worker activated : ${event}`)
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(res => {
            return res || fetch(event.request)

        })
    );
});

