import type { Config } from "drizzle-kit";

import { config } from "dotenv";
config();
export default {
  schema: "./server/utils/schema.ts",
  out: "./drizzle/output",
  driver: "turso",
  dbCredentials: {
    url: process.env.NUXT_DB_URL!,
    authToken: process.env.NUXT_DB_TOKEN!,
  },
} satisfies Config;
