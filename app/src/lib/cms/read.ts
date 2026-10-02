import "server-only";

import { asc, eq } from "drizzle-orm";
import { cache } from "react";

import { getDb, hasDatabase } from "@/db";
import { contentEntries } from "@/db/schema";

import {
  getCollectionDefinition,
  type CollectionItemMap,
  type CollectionKey,
} from "./collections";

const loadCollection = cache(async (key: CollectionKey): Promise<unknown[]> => {
  const definition = getCollectionDefinition(key);
  if (!definition) throw new Error(`Unknown collection: ${key}`);
  if (!hasDatabase()) return definition.defaults();

  try {
    const rows = await getDb()
      .select()
      .from(contentEntries)
      .where(eq(contentEntries.collection, key))
      .orderBy(asc(contentEntries.sortOrder), asc(contentEntries.createdAt));

    // Sections never saved in the admin keep showing the built-in content.
    if (rows.length === 0) return definition.defaults();

    return rows.map((row) => ({
      ...(row.data as Record<string, unknown>),
      id: row.id,
      sortOrder: row.sortOrder,
    }));
  } catch (error) {
    // The site must stay up if the database is unreachable (AfDEC pattern).
    console.error(`[cms] Falling back to built-in content for ${key}:`, error);
    return definition.defaults();
  }
});

/** Published items of a collection, in admin order. */
export async function getCollection<K extends CollectionKey>(key: K): Promise<CollectionItemMap[K][]> {
  return (await loadCollection(key)) as CollectionItemMap[K][];
}

/** The single entry of a singleton collection (e.g. contact details). */
export async function getSingleton<K extends CollectionKey>(key: K): Promise<CollectionItemMap[K]> {
  const [item] = await getCollection(key);
  return item;
}
