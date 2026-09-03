import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';

// 🎯 Escuchar mensajes de la app (como SKIP_WAITING)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 📦 Precache de los assets generados
precacheAndRoute(self.__WB_MANIFEST);

clientsClaim();
self.skipWaiting();

// 📌 Generar versión única para invalidación de cache
function obtenerFechaFormato() {
  const ahora = new Date();
  const año = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const dia = String(ahora.getDate()).padStart(2, '0');
  const hora = String(ahora.getHours()).padStart(2, '0');
  const minuto = String(ahora.getMinutes()).padStart(2, '0');
  return `${año}.${mes}.${dia}.${hora}.${minuto}`;
}

export const version = `v2_${obtenerFechaFormato()}`;
console.log("📦 SW versión:", version);

const coreID = version + '_core';
const pageID = version + '_pages';
const imgID = version + '_assets';
const apiID = version + '_api';
const cacheIDs = [coreID, pageID, imgID, apiID];

// 🧹 Limpiar caches antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => !cacheIDs.includes(key) && !/\b(workbox)\b/.test(key))
          .map((key) => caches.delete(key))
      )
    )
  );
});

// 🖼️ Imágenes y CSS - CacheFirst
registerRoute(
  /.*\.(png|jpg|jpeg|svg|gif|webp|css)/,
  new CacheFirst({ cacheName: imgID })
);

// 🌐 Gateway API - NetworkFirst
registerRoute(
  /.*\/gw\/.*/,
  new NetworkFirst({ cacheName: apiID })
);

// 📦 Todo lo demás - StaleWhileRevalidate
registerRoute(
  /(?!.*index.*.js$).*\/.*/,
  new StaleWhileRevalidate({ cacheName: coreID })
);
