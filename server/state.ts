import { and, eq } from "drizzle-orm";
import { appState } from "../drizzle/schema";
import { getDb } from "./db";

export type StateRow = {
  storageKey: string;
  eventId: string;
  value: string;
};

function assertStorageKey(storageKey: string) {
  if (!/^velentra-[a-z0-9-]+$/i.test(storageKey) || storageKey.length > 191) {
    throw new Error("Invalid storage key");
  }
}

export async function listAppState(eventId?: string): Promise<StateRow[]> {
  const db = await getDb();
  if (!db) return [];
  const rows = eventId
    ? await db.select({ storageKey: appState.storageKey, eventId: appState.eventId, value: appState.value }).from(appState).where(eq(appState.eventId, eventId))
    : await db.select({ storageKey: appState.storageKey, eventId: appState.eventId, value: appState.value }).from(appState);
  return rows;
}

export async function upsertAppState(input: StateRow) {
  assertStorageKey(input.storageKey);
  if (!input.eventId || input.eventId.length > 128) throw new Error("Invalid event id");
  if (input.value.length > 10_000_000) throw new Error("State value is too large");
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(appState).values({
    storageKey: input.storageKey,
    eventId: input.eventId,
    value: input.value,
  }).onDuplicateKeyUpdate({
    set: { eventId: input.eventId, value: input.value, updatedAt: new Date() },
  });
}

export async function deleteAppState(storageKey: string) {
  assertStorageKey(storageKey);
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.delete(appState).where(eq(appState.storageKey, storageKey));
}

export async function resolveEventBySubdomain(subdomain: string) {
  const normalized = subdomain.trim().toLowerCase();
  if (!normalized || normalized.length > 128) return null;
  const rows = await listAppState("global");
  const registry = rows.find(row => row.storageKey === "velentra-admin-events");
  if (!registry) return null;
  try {
    const events = JSON.parse(registry.value) as Array<Record<string, unknown>>;
    const event = events.find(item => String(item.subdomain ?? "").trim().toLowerCase() === normalized);
    return event ?? null;
  } catch {
    return null;
  }
}

export async function deleteEventById(eventId: string) {
  if (!eventId || eventId === "global" || eventId.length > 128) throw new Error("Invalid event id");
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const registry = await db.select({ storageKey: appState.storageKey, value: appState.value }).from(appState).where(and(eq(appState.eventId, "global"), eq(appState.storageKey, "velentra-admin-events")));
  const current = registry[0];
  if (current) {
    try {
      const events = JSON.parse(current.value) as Array<Record<string, unknown>>;
      const remaining = events.filter(item => String(item.id ?? "") !== eventId);
      if (remaining.length !== events.length) {
        await db.update(appState).set({ value: JSON.stringify(remaining), updatedAt: new Date() }).where(and(eq(appState.eventId, "global"), eq(appState.storageKey, "velentra-admin-events")));
      }
    } catch {
      throw new Error("Event registry is invalid");
    }
  }
  await db.delete(appState).where(eq(appState.eventId, eventId));
}

export async function deleteEventState(eventId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.delete(appState).where(eq(appState.eventId, eventId));
}
