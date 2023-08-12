import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { eq, and, desc, sql } from "drizzle-orm";

const runtimeConfig = useRuntimeConfig();

const client = createClient({
  url: runtimeConfig.dbUrl,
  authToken: runtimeConfig.dbToken,
});

export const db = drizzle(client);

export const seeder = drizzle(client);

// export eq
export { eq, and, desc, sql };
