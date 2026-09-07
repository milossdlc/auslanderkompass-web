const EVENT_KIND_LABEL = {
  closure: "Sperrung",
  roadworks: "Baustelle",
  warning: "Warnung",
};

let map, routeLayer, markersLayer;
let selectedHighways = new Set();
let allHighways = [];
let lastResult = null;

function initMap() {
  map = L.map("map", { zoomControl: true }).setView([51.1657, 10.4515], 6);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap",
  }).addTo(map);
  routeLayer = L.layerGroup().addTo(map);
  markersLayer = L.layerGroup().addTo(map);
}

function setStatus(elId, message, isError = false, isSuccess = false) {
  const el = document.getElementById(elId);
  el.textContent = message || "";
  el.classList.toggle("error", !!isError);
  el.classList.toggle("success", !!isSuccess);
}

function friendlyError(message) {
  const text = String(message || "");
  if (/Both origin and destination/i.test(text)) return "Bitte Start und Ziel eingeben.";
  if (/Route lookup failed/i.test(text)) return "Die Route konnte gerade nicht ermittelt werden. Bitte versuche es erneut.";
  if (/Failed to load highway/i.test(text)) return "Die Autobahnliste konnte nicht geladen werden.";
  if (/Could not save/i.test(text)) return "Die Strecke konnte nicht gespeichert werden.";
  return text || "Etwas ist schiefgelaufen. Bitte versuche es erneut.";
}

function setLoading(button, loading) {
  button.disabled = loading;
  button.classList.toggle("loading", loading);
}

// ---- tabs -------------------------------------------------------------

document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => activateTab(btn.dataset.tab));
});

function activateTab(tabName) {
  document.querySelectorAll(".tab").forEach((b) => {
    const active = b.dataset.tab === tabName;
    b.classList.toggle("active", active);
    b.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
  document.getElementById(`tab-${tabName}`).classList.add("active");
  if (tabName === "saved") loadSavedRoutes();
}

const swapBtn = document.getElementById("swap-route-btn");
swapBtn.addEventListener("click", () => {
  const origin = document.getElementById("origin-input");
  const destination = document.getElementById("destination-input");
  [origin.value, destination.value] = [destination.value, origin.value];
});

["origin-input", "destination-input"].forEach((id) => {
  document.getElementById(id).addEventListener("keydown", (event) => {
    if (event.key === "Enter") document.getElementById("check-route-btn").click();
  });
});

// ---- highway picker ---------------------------------------------------

async function loadHighways() {
  const picker = document.getElementById("highway-picker");
  picker.innerHTML = '<span class="status">Autobahnen werden geladen …</span>';
  try {
    const res = await fetch("/api/highways");
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to load highway list");
    allHighways = data.roads;
    renderHighwayChips(allHighways);
  } catch (err) {
    picker.innerHTML = "";
    setStatus("highway-status", friendlyError(err.message), true);
  }
}

function renderHighwayChips(list) {
  const picker = document.getElementById("highway-picker");
  picker.innerHTML = "";
  list.forEach((road) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip" + (selectedHighways.has(road) ? " selected" : "");
    chip.textContent = road;
    chip.setAttribute("aria-pressed", String(selectedHighways.has(road)));
    chip.addEventListener("click", () => {
      if (selectedHighways.has(road)) selectedHighways.delete(road);
      else selectedHighways.add(road);
      chip.classList.toggle("selected");
      chip.setAttribute("aria-pressed", String(selectedHighways.has(road)));
    });
    picker.appendChild(chip);
  });
}

document.getElementById("highway-search").addEventListener("input", (e) => {
  const q = e.target.value.trim().toUpperCase().replace(/\s+/g, "");
  const filtered = q ? allHighways.filter((r) => r.replace(/\s+/g, "").includes(q)) : allHighways;
  renderHighwayChips(filtered);
});

document.getElementById("check-highways-btn").addEventListener("click", async () => {
  const button = document.getElementById("check-highways-btn");
  const highways = [...selectedHighways];
  if (highways.length === 0) {
    setStatus("highway-status", "Bitte wähle mindestens eine Autobahn aus.", true);
    return;
  }

  setLoading(button, true);
  setStatus("highway-status", "Aktuelle Meldungen werden geprüft …");
  prepareResults("Autobahnen werden geprüft …", "Wir laden aktuelle Sperrungen, Baustellen und Warnungen.");

  try {
    const requests = highways.map(async (road) => {
      const res = await fetch(`/api/highway/${encodeURIComponent(road)}/events`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Fehler bei ${road}`);
      return data.events;
    });
    const groups = await Promise.all(requests);
    const all = groups.flat();
    lastResult = { mode: "highways", highways };

    setStatus("highway-status", `${all.length} Meldung${all.length === 1 ? "" : "en"} auf ${highways.length} Autobahn${highways.length === 1 ? "" : "en"}.`, false, true);
    renderHighwaySummary(highways, all);
    renderEvents(all);
    fitMapToEvents(all);
    updateResultScore(all);
    showWatchCta(true);
  } catch (err) {
    setStatus("highway-status", friendlyError(err.message), true);
    showResultError("Prüfung nicht möglich", friendlyError(err.message));
  } finally {
    setLoading(button, false);
  }
});

document.getElementById("save-highways-btn").addEventListener("click", async () => {
  const name = document.getElementById("save-highways-name").value.trim();
  const highways = [...selectedHighways];
  if (!highways.length) {
    setStatus("highway-status", "Bitte wähle zuerst mindestens eine Autobahn aus.", true);
    return;
  }
  const saved = await saveRoute({ name, mode: "highways", highways });
  if (saved) {
    document.getElementById("save-highways-name").value = "";
    setStatus("highway-status", "Auswahl gespeichert.", false, true);
  }
});

// ---- route check ------------------------------------------------------

document.getElementById("check-route-btn").addEventListener("click", async () => {
  const origin = document.getElementById("origin-input").value.trim();
  const destination = document.getElementById("destination-input").value.trim();
  if (!origin || !destination) {
    setStatus("route-status", "Bitte Start und Ziel eingeben.", true);
    return;
  }
  await runRouteCheck(origin, destination);
});

async function runRouteCheck(origin, destination) {
  const button = document.getElementById("check-route-btn");
  setLoading(button, true);
  setStatus("route-status", "Route und Verkehrsmeldungen werden geprüft …");
  prepareResults("Route wird geprüft …", `${origin} → ${destination}`);

  try {
    const res = await fetch("/api/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin, destination }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Route lookup failed");

    lastResult = { mode: "route", origin, destination };
    const count = data.events.length;
    setStatus(
      "route-status",
      count === 0 ? "Keine relevanten Meldungen auf deiner Route gefunden." : `${count} relevante Meldung${count === 1 ? "" : "en"} auf deiner Route.`,
      false,
      true
    );
    renderRouteSummary(data);
    renderEvents(data.events);
    drawRoute(data.geometry, data.events);
    updateResultScore(data.events);
    showWatchCta(true);
  } catch (err) {
    setStatus("route-status", friendlyError(err.message), true);
    showResultError("Route konnte nicht geprüft werden", friendlyError(err.message));
  } finally {
    setLoading(button, false);
  }
}

document.getElementById("save-route-btn").addEventListener("click", async () => {
  const name = document.getElementById("save-route-name").value.trim();
  const origin = document.getElementById("origin-input").value.trim();
  const destination = document.getElementById("destination-input").value.trim();
  if (!origin || !destination) {
    setStatus("route-status", "Bitte zuerst Start und Ziel eingeben.", true);
    return;
  }
  const saved = await saveRoute({ name, mode: "endpoints", origin, destination });
  if (saved) {
    document.getElementById("save-route-name").value = "";
    setStatus("route-status", "Strecke gespeichert.", false, true);
  }
});

// ---- save + watch -----------------------------------------------------

async function saveRoute(payload) {
  try {
    const res = await fetch("/api/saved-routes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not save trip");
    return data;
  } catch (err) {
    alert(`Strecke konnte nicht gespeichert werden: ${friendlyError(err.message)}`);
    return null;
  }
}

document.getElementById("watch-route-btn").addEventListener("click", async () => {
  if (!lastResult) return;
  let payload;
  if (lastResult.mode === "route") {
    payload = {
      name: `${lastResult.origin} → ${lastResult.destination}`,
      mode: "endpoints",
      origin: lastResult.origin,
      destination: lastResult.destination,
    };
  } else {
    payload = {
      name: lastResult.highways.join(", "),
      mode: "highways",
      highways: lastResult.highways,
    };
  }
  const saved = await saveRoute(payload);
  if (saved) {
    activateTab("saved");
    setTimeout(() => {
      const firstBell = document.querySelector(".bell-btn");
      if (firstBell) firstBell.click();
    }, 250);
  }
});

// ---- saved routes -----------------------------------------------------

async function loadSavedRoutes() {
  const list = document.getElementById("saved-list");
  list.innerHTML = "";
  try {
    const res = await fetch("/api/saved-routes");
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Gespeicherte Strecken konnten nicht geladen werden.");
    if (data.routes.length === 0) {
      setStatus("saved-status", "Noch keine Strecke gespeichert. Prüfe zuerst eine Route oder Autobahn.");
      return;
    }
    setStatus("saved-status", `${data.routes.length} gespeicherte Strecke${data.routes.length === 1 ? "" : "n"}`);
    data.routes.forEach((r) => list.appendChild(renderSavedItem(r)));
  } catch (err) {
    setStatus("saved-status", friendlyError(err.message), true);
  }
}

function renderSavedItem(route) {
  const li = document.createElement("li");
  li.className = "saved-item";

  const top = document.createElement("div");
  top.className = "saved-item-top";
  const left = document.createElement("div");
  const name = document.createElement("div");
  name.className = "name";
  name.textContent = route.name;
  name.title = "Strecke jetzt prüfen";
  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = route.mode === "highways" ? route.highways.join(", ") : `${route.origin} → ${route.destination}`;
  left.append(name, meta);
  name.addEventListener("click", () => runSavedRoute(route));

  const del = document.createElement("button");
  del.className = "link";
  del.textContent = "Löschen";
  del.addEventListener("click", async () => {
    await fetch(`/api/saved-routes/${route.id}`, { method: "DELETE" });
    loadSavedRoutes();
  });

  top.append(left, del);
  li.append(top, renderAlertRow(route));
  return li;
}

// ---- alerts -----------------------------------------------------------

let vapidPublicKey = null;

async function initPush() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
  try {
    await navigator.serviceWorker.register("sw.js");
    const res = await fetch("/api/push/vapid-public-key");
    const data = await res.json();
    vapidPublicKey = data.publicKey || null;
  } catch (err) {
    console.warn("Push-Setup übersprungen:", err);
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

async function subscribeToPush() {
  if (!vapidPublicKey || !("serviceWorker" in navigator)) return null;
  if (Notification.permission === "denied") return null;
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;
  const reg = await navigator.serviceWorker.ready;
  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });
  }
  return sub.toJSON();
}

function renderAlertRow(route) {
  const wrap = document.createElement("div");
  wrap.className = "alert-row";

  const bell = document.createElement("button");
  bell.className = "link bell-btn";
  bell.textContent = "🔔 Warnungen aktivieren";

  const form = document.createElement("div");
  form.className = "alert-form";
  form.hidden = true;

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.placeholder = "E-Mail-Adresse";
  emailInput.autocomplete = "email";

  const subscribeBtn = document.createElement("button");
  subscribeBtn.className = "primary";
  subscribeBtn.textContent = "Aktivieren";

  const statusEl = document.createElement("div");
  statusEl.className = "status";

  form.append(emailInput, subscribeBtn, statusEl);
  bell.addEventListener("click", () => { form.hidden = !form.hidden; });

  subscribeBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      statusEl.textContent = "Bitte eine gültige E-Mail-Adresse eingeben.";
      statusEl.classList.add("error");
      return;
    }
    statusEl.classList.remove("error");
    statusEl.textContent = "Warnung wird eingerichtet …";
    subscribeBtn.disabled = true;

    let pushSubscription = null;
    try { pushSubscription = await subscribeToPush(); } catch (err) { console.warn(err); }

    try {
      const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: route.name,
          mode: route.mode,
          highways: route.highways,
          origin: route.origin,
          destination: route.destination,
          pushSubscription,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Warnung konnte nicht angelegt werden.");
      statusEl.textContent = "Fast geschafft: Bitte bestätige den Link in deiner E-Mail.";
      statusEl.classList.add("success");
      emailInput.value = "";
    } catch (err) {
      statusEl.textContent = friendlyError(err.message);
      statusEl.classList.add("error");
    } finally {
      subscribeBtn.disabled = false;
    }
  });

  wrap.append(bell, form);
  return wrap;
}

async function runSavedRoute(route) {
  if (route.mode === "highways") {
    activateTab("highway");
    selectedHighways = new Set(route.highways);
    renderHighwayChips(allHighways);
    document.getElementById("check-highways-btn").click();
  } else {
    activateTab("route");
    document.getElementById("origin-input").value = route.origin;
    document.getElementById("destination-input").value = route.destination;
    await runRouteCheck(route.origin, route.destination);
  }
}

// ---- result UI --------------------------------------------------------

function prepareResults(title, subtitle) {
  document.getElementById("result-title").textContent = title;
  document.getElementById("result-subtitle").textContent = subtitle;
  document.getElementById("trip-summary").innerHTML = "";
  document.getElementById("event-list").innerHTML = '<div class="empty-state"><div class="empty-icon">…</div><strong>Daten werden geladen</strong><span>Einen Moment – wir prüfen die aktuelle Verkehrslage.</span></div>';
  document.getElementById("result-score").hidden = true;
  showWatchCta(false);
}

function showResultError(title, subtitle) {
  document.getElementById("result-title").textContent = title;
  document.getElementById("result-subtitle").textContent = subtitle;
  document.getElementById("event-list").innerHTML = '<div class="empty-state"><div class="empty-icon">!</div><strong>Keine Daten verfügbar</strong><span>Bitte prüfe deine Eingabe und versuche es erneut.</span></div>';
  document.getElementById("result-score").hidden = true;
  showWatchCta(false);
}

function showWatchCta(show) {
  document.getElementById("watch-cta").hidden = !show;
}

function updateResultScore(events) {
  const score = document.getElementById("result-score");
  const title = document.getElementById("score-title");
  const text = document.getElementById("score-text");
  const icon = document.getElementById("score-icon");
  score.hidden = false;
  score.className = "result-score";

  const closures = events.filter((e) => e.kind === "closure").length;
  if (events.length === 0) {
    score.classList.add("good");
    icon.textContent = "✓";
    title.textContent = "Freie Sicht";
    text.textContent = "Keine relevanten Meldungen";
  } else if (closures > 0) {
    score.classList.add("bad");
    icon.textContent = "!";
    title.textContent = `${closures} Sperrung${closures === 1 ? "" : "en"}`;
    text.textContent = `${events.length} Meldung${events.length === 1 ? "" : "en"} insgesamt`;
  } else {
    score.classList.add("warn");
    icon.textContent = "!";
    title.textContent = `${events.length} Hinweis${events.length === 1 ? "" : "e"}`;
    text.textContent = "Auf deiner Strecke beachten";
  }
}

function renderRouteSummary(data) {
  const origin = shortPlace(data.origin.displayName);
  const destination = shortPlace(data.destination.displayName);
  document.getElementById("result-title").textContent = `${origin} → ${destination}`;
  document.getElementById("result-subtitle").textContent = data.events.length
    ? "Diese Meldungen liegen aktuell auf oder nahe deiner berechneten Route."
    : "Auf der berechneten Route wurden aktuell keine relevanten Meldungen gefunden.";

  const highways = data.highways.length ? data.highways.join(", ") : "–";
  document.getElementById("trip-summary").innerHTML = `
    <div class="summary-grid">
      <div class="summary-item"><span>Route</span><strong>${escapeHtml(origin)} → ${escapeHtml(destination)}</strong></div>
      <div class="summary-item"><span>Distanz</span><strong>${escapeHtml(String(data.distanceKm))} km</strong></div>
      <div class="summary-item"><span>Fahrzeit</span><strong>ca. ${formatDuration(data.durationMin)}</strong></div>
      <div class="summary-item"><span>Autobahn</span><strong>${escapeHtml(highways)}</strong></div>
    </div>`;
}

function renderHighwaySummary(highways, events) {
  document.getElementById("result-title").textContent = highways.join(", ");
  document.getElementById("result-subtitle").textContent = events.length
    ? "Aktuelle Meldungen für deine ausgewählten Autobahnen."
    : "Aktuell wurden keine Sperrungen, Baustellen oder Warnungen gefunden.";
  document.getElementById("trip-summary").innerHTML = `
    <div class="summary-grid">
      <div class="summary-item"><span>Auswahl</span><strong>${escapeHtml(highways.join(", "))}</strong></div>
      <div class="summary-item"><span>Meldungen</span><strong>${events.length}</strong></div>
      <div class="summary-item"><span>Sperrungen</span><strong>${events.filter((e) => e.kind === "closure").length}</strong></div>
      <div class="summary-item"><span>Baustellen</span><strong>${events.filter((e) => e.kind === "roadworks").length}</strong></div>
    </div>`;
}

function formatDuration(minutes) {
  const value = Number(minutes) || 0;
  const hours = Math.floor(value / 60);
  const mins = Math.round(value % 60);
  return hours ? `${hours} Std. ${mins} Min.` : `${mins} Min.`;
}

function shortPlace(displayName) {
  return String(displayName || "").split(",")[0].trim();
}

function renderEvents(events) {
  const list = document.getElementById("event-list");
  list.innerHTML = "";
  if (!events.length) {
    list.innerHTML = '<div class="empty-state"><div class="empty-icon">✓</div><strong>Gute Fahrt!</strong><span>Aktuell wurden keine relevanten Sperrungen, Baustellen oder Warnungen gefunden.</span></div>';
    return;
  }
  events.forEach((ev) => list.appendChild(renderEventCard(ev)));
}

function renderEventCard(ev) {
  const card = document.createElement("article");
  card.className = `event-card ${ev.kind}`;

  const topline = document.createElement("div");
  topline.className = "card-topline";
  const badge = document.createElement("span");
  badge.className = "kind-badge";
  badge.textContent = EVENT_KIND_LABEL[ev.kind] || ev.kind;
  topline.appendChild(badge);
  if (ev.future) {
    const upcoming = document.createElement("span");
    upcoming.className = "kind-badge";
    upcoming.textContent = "Demnächst";
    topline.appendChild(upcoming);
  }
  card.appendChild(topline);

  const title = document.createElement("div");
  title.className = "title";
  title.textContent = ev.title || "Verkehrsmeldung";
  card.appendChild(title);

  if (ev.subtitle) {
    const subtitle = document.createElement("div");
    subtitle.className = "subtitle";
    subtitle.textContent = ev.subtitle.trim();
    card.appendChild(subtitle);
  }

  if (ev.description && ev.description.length) {
    const desc = document.createElement("div");
    desc.className = "description";
    desc.textContent = ev.description.filter(Boolean).join("\n");
    card.appendChild(desc);
  }

  if (typeof ev.progressKm === "number") {
    const progress = document.createElement("div");
    progress.className = "progress";
    progress.textContent = `ca. ${Math.round(ev.progressKm)} km nach Fahrtbeginn`;
    card.appendChild(progress);
  }

  if (ev.lat != null && ev.lon != null) {
    card.title = "Auf Karte anzeigen";
    card.addEventListener("click", () => map.setView([ev.lat, ev.lon], Math.max(map.getZoom(), 11), { animate: true }));
  }
  return card;
}

// ---- map --------------------------------------------------------------

function drawRoute(geometry, events) {
  routeLayer.clearLayers();
  markersLayer.clearLayers();
  if (!geometry || geometry.length === 0) return;

  const latlngs = geometry.map(([lat, lon]) => [lat, lon]);
  const line = L.polyline(latlngs, { color: "#101828", weight: 5, opacity: .88 });
  routeLayer.addLayer(line);

  L.circleMarker(latlngs[0], { radius: 7, color: "#101828", fillColor: "#fff", fillOpacity: 1, weight: 3 })
    .bindTooltip("Start", { direction: "top" }).addTo(markersLayer);
  L.circleMarker(latlngs[latlngs.length - 1], { radius: 7, color: "#f79009", fillColor: "#f79009", fillOpacity: 1, weight: 3 })
    .bindTooltip("Ziel", { direction: "top" }).addTo(markersLayer);

  events.forEach(addEventMarker);
  map.fitBounds(line.getBounds(), { padding: [35, 35] });
}

function fitMapToEvents(events) {
  routeLayer.clearLayers();
  markersLayer.clearLayers();
  events.forEach(addEventMarker);
  const pts = events.filter((e) => e.lat != null && e.lon != null).map((e) => [e.lat, e.lon]);
  if (pts.length) map.fitBounds(L.latLngBounds(pts), { padding: [35, 35], maxZoom: 10 });
  else map.setView([51.1657, 10.4515], 6);
}

function addEventMarker(ev) {
  if (ev.lat == null || ev.lon == null) return;
  const color = ev.kind === "roadworks" ? "#f79009" : ev.kind === "warning" ? "#7f56d9" : "#d92d20";
  const marker = L.circleMarker([ev.lat, ev.lon], {
    radius: 7,
    color: "#fff",
    fillColor: color,
    fillOpacity: 1,
    weight: 2,
  });
  marker.bindPopup(`<strong>${escapeHtml(ev.title || EVENT_KIND_LABEL[ev.kind])}</strong><br>${escapeHtml(ev.subtitle || "")}`);
  markersLayer.addLayer(marker);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = String(str ?? "");
  return div.innerHTML;
}

// ---- boot -------------------------------------------------------------

initMap();
loadHighways();
initPush();
