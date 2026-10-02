import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

type Database = ReturnType<typeof drizzleNeon<typeof schema>>;

let db: Database | null = null;

/**
 * Neon's HTTP driver in production (serverless-friendly); a standard
 * node-postgres pool for any other Postgres URL (local development, tests).
 * Both expose the same Drizzle query API.
 */
export function getDb(): Database {
  if (db) {
    return db;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Configure it to connect to Neon Postgres.",
    );
  }

  if (new URL(databaseUrl).hostname.endsWith("neon.tech")) {
    db = drizzleNeon(neon(databaseUrl), { schema });
  } else {
    db = drizzlePg(new Pool({ connectionString: databaseUrl }), {
      schema,
    }) as unknown as Database;
  }
  return db;
}

export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export type Db = ReturnType<typeof getDb>;
