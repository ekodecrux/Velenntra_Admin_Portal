type ServerStateRow = { storageKey: string; eventId: string; value: string };

const excludedKeys = new Set([
  "velentra-demo-authenticated",
  "velentra-signin-role",
  "velentra-signed-in-employee",
]);

let originalSetItem: Storage["setItem"] | null = null;
let originalRemoveItem: Storage["removeItem"] | null = null;
let bridgeInstalled = false;

function shouldSync(storageKey: string) {
  return storageKey.startsWith("velentra-") && !excludedKeys.has(storageKey) && storageKey.length <= 191;
}

function eventIdForKey(storageKey: string) {
  if (/^velentra-(admin-events|admin-employees|global-employee-username|admin-media-)/.test(storageKey)) return "global";
  const scopedPrefixes = [
    "velentra-site-config-",
    "velentra-section-content-",
    "velentra-managed-media-",
    "velentra-testimonials-",
    "velentra-gallery-",
    "velentra-video-reviews-",
    "velentra-conference-sessions-",
    "velentra-schedule-days-",
    "velentra-abstracts-",
    "velentra-brochure-downloads-",
  ];
  const prefix = scopedPrefixes.find(candidate => storageKey.startsWith(candidate));
  return prefix ? storageKey.slice(prefix.length) || "global" : "global";
}

function send(method: "PUT" | "DELETE", payload: Record<string, string>) {
  void fetch("/api/state", {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    keepalive: true,
    body: JSON.stringify(payload),
  }).catch(() => {
    // localStorage remains the immediate fallback when the API is unavailable.
  });
}

export function installServerStateBridge() {
  if (bridgeInstalled || typeof window === "undefined") return;
  originalSetItem = Storage.prototype.setItem;
  originalRemoveItem = Storage.prototype.removeItem;
  const setItem = originalSetItem;
  const removeItem = originalRemoveItem;
  Storage.prototype.setItem = function(storageKey: string, value: string) {
    setItem.call(this, storageKey, value);
    if (this === window.localStorage && shouldSync(storageKey)) {
      send("PUT", { storageKey, eventId: eventIdForKey(storageKey), value });
    }
  };
  Storage.prototype.removeItem = function(storageKey: string) {
    removeItem.call(this, storageKey);
    if (this === window.localStorage && shouldSync(storageKey)) send("DELETE", { storageKey });
  };
  bridgeInstalled = true;
}

export function persistServerState(storageKey: string, eventId: string, value: string) {
  if (!shouldSync(storageKey)) return;
  send("PUT", { storageKey, eventId: eventId || "global", value });
}

function writeWithoutSync(storageKey: string, value: string) {
  if (typeof window === "undefined") return;
  (originalSetItem ?? Storage.prototype.setItem).call(window.localStorage, storageKey, value);
}

export async function hydrateServerState() {
  if (typeof window === "undefined") return;
  installServerStateBridge();
  const localKeys: string[] = [];
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (key && shouldSync(key)) localKeys.push(key);
  }
  try {
    const response = await fetch("/api/state?eventId=all", { credentials: "same-origin", cache: "no-store" });
    if (!response.ok) return;
    const payload = await response.json() as { rows?: ServerStateRow[] };
    const rows = Array.isArray(payload.rows) ? payload.rows : [];
    const serverKeys = new Set(rows.map(row => row.storageKey));
    rows.forEach(row => {
      if (shouldSync(row.storageKey) && typeof row.value === "string") writeWithoutSync(row.storageKey, row.value);
    });
    // Preserve an existing local preview during the first migration, then let
    // the database become the source of truth for all later browsers.
    localKeys.forEach(storageKey => {
      if (serverKeys.has(storageKey)) return;
      const value = window.localStorage.getItem(storageKey);
      if (value !== null) send("PUT", { storageKey, eventId: eventIdForKey(storageKey), value });
    });
  } catch {
    // Offline/dev mode continues with the established browser cache.
  }
}
