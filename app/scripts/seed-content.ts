/**
 * Imports the content shipped with the code into the database for every
 * admin section that has never been saved. Safe to run repeatedly: sections
 * that already have content are left untouched.
 *
 *   pnpm db:seed
 */
import "./load-env";

import { count, eq } from "drizzle-orm";

import { getDb } from "@/db";
import { contentEntries } from "@/db/schema";
import { collections } from "@/lib/cms/collections";

async function main() {
  const db = getDb();
  for (const collection of collections) {
    const [{ total }] = await db
      .select({ total: count() })
      .from(contentEntries)
      .where(eq(contentEntries.collection, collection.key));
    if (total > 0) {
      console.log(`- ${collection.label}: already has ${total} item(s), skipped`);
      continue;
    }
    const defaults = collection.defaults();
    if (defaults.length === 0) {
      console.log(`- ${collection.label}: nothing to import`);
      continue;
    }
    await db.insert(contentEntries).values(
      defaults.map((item, index) => {
        const data = { ...item };
        delete data.id;
        delete data.sortOrder;
        return { collection: collection.key, data, sortOrder: index + 1, updatedBy: "seed" };
      }),
    );
    console.log(`+ ${collection.label}: imported ${defaults.length} item(s)`);
  }
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
