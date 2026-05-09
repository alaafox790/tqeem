const CACHE_NAME = 'smart-school-v1';

// الملفات التي سيتم حفظها في الهاتف ليفتح التطبيق بسرعة بدون إنترنت
const urlsToCache = [
  './',
  './index.html',
  './taqeem.html',
  './taqeem2.html',
  './manifest.json',
  './66.png'
];

// 1. عند تثبيت التطبيق: قم بحفظ الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('تم حفظ ملفات التطبيق بنجاح');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. عند تشغيل التطبيق: جلب البيانات من الإنترنت أولاً، ولو مفيش نت يفتح من الذاكرة
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// 3. عند تحديث التطبيق: مسح الذاكرة القديمة
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});