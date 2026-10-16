// เปลี่ยน VERSION ทุกครั้งที่แก้ไฟล์ในแอป เพื่อให้เครื่องที่ติดตั้งแล้วโหลดของใหม่
const VERSION = "v16";
const SHELL = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "data.js",
  "icons.js",
  "store.js",
  "firebase-config.js",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/apple-touch-icon-v1.png",
];

self.addEventListener("install", (e) => {
  // cache: "reload" = ข้าม HTTP cache ของเบราว์เซอร์ (GitHub Pages ตั้ง max-age 10 นาที) ไม่งั้นเวอร์ชันใหม่อาจเก็บไฟล์เก่า
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: "reload" }))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Firestore จัดการ offline เอง — ไม่ยุ่ง
  if (url.hostname.endsWith("googleapis.com")) return;

  // Firebase SDK จาก gstatic: เวอร์ชันล็อกไว้แล้ว เก็บ cache ถาวร
  if (url.hostname === "www.gstatic.com") {
    e.respondWith(
      caches.open(VERSION).then(async (c) => (await c.match(req)) || c.add(req).then(() => c.match(req))),
    );
    return;
  }

  if (url.origin !== location.origin) return;

  // ไฟล์ของแอป: ใช้ cache ก่อน แล้วอัปเดตเบื้องหลัง (stale-while-revalidate)
  e.respondWith(
    caches.open(VERSION).then(async (c) => {
      const cached = await c.match(req, { ignoreSearch: true });
      const fresh = fetch(req, { cache: "no-cache" })
        .then((res) => {
          if (res.ok) c.put(req, res.clone());
          return res;
        })
        .catch(() => cached || c.match("index.html"));
      return cached || fresh;
    }),
  );
});
