import { Pool as NeonPool, neonConfig } from '@neondatabase/serverless';
import { Pool as PgPool } from 'pg';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-serverless';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import ws from "ws";
import * as schema from "@shared/schema";

// Determine which database to use
const railwayUrl = process.env.RAILWAY_DATABASE_URL;
const neonUrl = process.env.DATABASE_URL;

if (!railwayUrl && !neonUrl) {
  throw new Error(
    "RAILWAY_DATABASE_URL or DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Use Railway if available, otherwise Neon
let pool: PgPool | NeonPool;
let db: ReturnType<typeof drizzlePg> | ReturnType<typeof drizzleNeon>;

if (railwayUrl) {
  // Railway uses standard PostgreSQL
  pool = new PgPool({ connectionString: railwayUrl });
  db = drizzlePg({ client: pool, schema });
} else {
  // Neon uses WebSocket-based connection
  neonConfig.webSocketConstructor = ws;
  pool = new NeonPool({ connectionString: neonUrl! });
  db = drizzleNeon({ client: pool, schema });
}

export { pool, db };
