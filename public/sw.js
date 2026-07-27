// Service Worker - يدعم Offline بشكل كامل
const CACHE_NAME = 'my-app-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
];

// تثبيت Service Worker
self.addEventListener('install', (event) => {
  console.log('✅ Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ Skip waiting');
        return self.skipWaiting();
      })
  );
});

// تفعيل Service Worker
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('🗑️ Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('✅ Claiming clients');
      return self.clients.claim();
    })
  );
});

// استراتيجية Cache First مع Network Fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // تجاهل الطلبات غير GET
  if (request.method !== 'GET') {
    return;
  }

  // تجاهل طلبات Chrome extensions
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((response) => {
        // إذا وجد في الكاش، ارجعه
        if (response) {
          console.log('📦 Cache hit:', url.pathname);
          
          // تحديث الكاش في الخلفية (Stale While Revalidate)
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(request, networkResponse.clone());
                });
              }
            })
            .catch(() => {
              // تجاهل أخطاء الشبكة - لدينا نسخة من الكاش
            });
          
          return response;
        }

        // وإلا، اجلب من الشبكة
        console.log('🌐 Fetching:', url.pathname);
        return fetch(request)
          .then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            // تخزين في الكاش
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });

            return networkResponse;
          })
          .catch((error) => {
            console.error('❌ Fetch failed:', error);
            
            // إذا كان طلب صفحة، ارجع لـ index.html (SPA behavior)
            if (request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            
            throw error;
          });
      })
  );
});

// مزامنة في الخلفية
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      syncData().catch((err) => {
        console.error('❌ Background sync failed:', err);
      })
    );
  }
});

async function syncData() {
  console.log('🔄 Background sync started');
  
  // هنا يمكنك إضافة منطق المزامنة الحقيقي
  const clients = await self.clients.matchAll();
  clients.forEach((client) => {
    client.postMessage({
      type: 'SYNC_COMPLETE',
      timestamp: new Date().toISOString()
    });
  });
}

// استقبال Push Notifications
self.addEventListener('push', (event) => {
  console.log('📨 Push received:', event);
  
  const options = {
    body: event.data?.text() || 'لديك إشعار جديد!',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'فتح التطبيق'
      },
      {
        action: 'close',
        title: 'إغلاق'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('📱 تطبيقي', options)
  );
});

// النقر على الإشعار
self.addEventListener('notificationclick', (event) => {
  console.log('👆 Notification clicked:', event);
  event.notification.close();
  
  if (event.action === 'explore' || event.action === '') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// رسائل من التطبيق
self.addEventListener('message', (event) => {
  console.log('📨 Message from app:', event.data);
  
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
