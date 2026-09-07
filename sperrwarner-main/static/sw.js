// Sperrwarner service worker -- only job is to receive Web Push messages
// and show them as notifications, and to focus/open the app when one is
// clicked. No offline caching here: the prototype's data is live traffic
// info, so a cached copy would be actively misleading.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (err) {
    data = { title: "Sperrwarner", body: event.data ? event.data.text() : "" };
  }

  const title = data.title || "Sperrwarner";
  const options = {
    body: data.body || "Auf einer deiner Strecken gibt es eine neue Verkehrsmeldung.",
    icon: "icons/icon-192.png",
    badge: "icons/icon-192.png",
    data: { url: data.url || "/" },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const c of clients) {
        if (c.url === url && "focus" in c) return c.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
