import "dotenv/config";
import express from "express";
import { createServer } from "http";
import fs from "fs";
import path from "path";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { publicPlatformScript } from "./publicConfig";
import { appRouter } from "../routers";
import { deleteAppState, listAppState, resolveEventBySubdomain, upsertAppState } from "../state";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/api/state", async (req, res) => {
    try {
      const requestedEventId = typeof req.query.eventId === "string" ? req.query.eventId.trim() : "";
      const rows = requestedEventId === "all"
        ? await listAppState()
        : requestedEventId
        ? [...await listAppState("global"), ...await listAppState(requestedEventId)].filter((row, index, all) => all.findIndex(candidate => candidate.storageKey === row.storageKey) === index)
        : await listAppState("global");
      res.set("Cache-Control", "no-store").json({ rows });
    } catch (error) {
      console.error("[State] Failed to list state:", error);
      res.status(500).json({ error: "Unable to load application state" });
    }
  });
  app.put("/api/state", async (req, res) => {
    try {
      const { storageKey, eventId, value } = req.body ?? {};
      if (typeof storageKey !== "string" || typeof eventId !== "string" || typeof value !== "string") {
        return res.status(400).json({ error: "storageKey, eventId, and value are required" });
      }
      await upsertAppState({ storageKey, eventId, value });
      return res.status(204).end();
    } catch (error) {
      console.error("[State] Failed to save state:", error);
      return res.status(400).json({ error: error instanceof Error ? error.message : "Unable to save application state" });
    }
  });
  app.delete("/api/state", async (req, res) => {
    try {
      const storageKey = typeof req.body?.storageKey === "string" ? req.body.storageKey : "";
      if (!storageKey) return res.status(400).json({ error: "storageKey is required" });
      await deleteAppState(storageKey);
      return res.status(204).end();
    } catch (error) {
      console.error("[State] Failed to delete state:", error);
      return res.status(400).json({ error: error instanceof Error ? error.message : "Unable to delete application state" });
    }
  });
  app.get("/api/events/resolve", async (req, res) => {
    try {
      const subdomain = typeof req.query.subdomain === "string" ? req.query.subdomain : "";
      const event = await resolveEventBySubdomain(subdomain);
      return event ? res.json({ event }) : res.status(404).json({ error: "Event not found" });
    } catch (error) {
      console.error("[Events] Failed to resolve event:", error);
      return res.status(500).json({ error: "Unable to resolve event" });
    }
  });
  app.get("/api/platform/config.js", (_req, res) => {
    res.set("Cache-Control", "no-store").type("application/javascript").send(publicPlatformScript());
  });
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  app.use(async (req, res, next) => {
    const hostname = String(req.hostname || "").toLowerCase();
    const baseDomain = String(process.env.EVENT_BASE_DOMAIN || "velentraconferences.com").toLowerCase();
    const isEventHost = hostname.endsWith(`.${baseDomain}`) && hostname !== `www.${baseDomain}`;
    if (!isEventHost || req.path.startsWith("/api/") || req.path.startsWith("/event-site/") || path.extname(req.path)) return next();
    const subdomain = hostname.slice(0, -(`.${baseDomain}`).length).split(".").at(-1) || "";
    const event = await resolveEventBySubdomain(subdomain);
    if (!event || !event.id) return res.status(404).send("Event website not found");
    const eventSiteRoot = process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "client", "public", "event-site")
      : path.resolve(import.meta.dirname, "public", "event-site");
    const cleanRoute = req.path.replace(/^\/+|\/+$/g, "");
    const mirroredPage = cleanRoute ? path.join(eventSiteRoot, "mirror", cleanRoute, "index.html") : path.join(eventSiteRoot, "index.html");
    const eventSitePath = cleanRoute && fs.existsSync(mirroredPage) ? mirroredPage : path.join(eventSiteRoot, "index.html");
    const html = await fs.promises.readFile(eventSitePath, "utf8");
    const injected = html.replace("</head>", `<script>window.__VELENTRA_EVENT_ID__=${JSON.stringify(String(event.id))};window.__VELENTRA_EVENT_HOST__=${JSON.stringify(hostname)};</script></head>`);
    return res.status(200).type("html").send(injected);
  });
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = Number(process.env.PORT || "3000");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid PORT");
  server.on("error", error => { console.error("Server failed:", error.message); process.exit(1); });
  server.listen(port, "0.0.0.0", () => console.log(`Server listening on port ${port}`));
}

startServer().catch(error => { console.error(error); process.exit(1); });
