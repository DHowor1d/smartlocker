const CACHE_NAME = 'smartlocker-v1';

// 서비스 워커 설치
self.addEventListener('install', () => {
  self.skipWaiting();
});

// 서비스 워커 활성화
self.addEventListener('activate', (event) => {
  event.waitUntil(
    // 기존 캐시 모두 삭제
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// 네트워크 요청만 처리
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        // 네트워크 요청 실패 시 null 반환
        // 이후 컴포넌트에서 스켈레톤 UI 처리
        return null;
      })
  );
});