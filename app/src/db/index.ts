import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "./schema";

let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (db) {
    return db;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Configure it to connect to Neon Postgres.",
    );
  }

  const sql = neon(databaseUrl);
  db = drizzle(sql, { schema });
  return db;
}

export type Db = ReturnType<typeof getDb>;
