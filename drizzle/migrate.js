import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

import { config } from "dotenv";
config();

const client = createClient({
  url: process.env.NUXT_DB_URL,
  authToken: process.env.NUXT_DB_TOKEN,
});

export const db = drizzle(client);

async function migration() {
  await migrate(db, { migrationsFolder: "drizzle/output" });
}
migration();
