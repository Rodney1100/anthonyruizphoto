import { Pool as PgPool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// In development: prefer DATABASE_PUBLIC_URL (public Railway connection for testing)
// In production: prefer DATABASE_URL (set by Railway deployment)
// Fall back to the other if the preferred one is not available
const isDevelopment = process.env.NODE_ENV === 'development';
const databaseUrl = isDevelopment 
  ? (process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL)
  : (process.env.DATABASE_URL || process.env.DATABASE_PUBLIC_URL);

if (!databaseUrl) {
  throw new Error(
    "No database connection found. Please set DATABASE_URL or DATABASE_PUBLIC_URL environment variable."
  );
}

// Railway uses standard PostgreSQL
export const pool = new PgPool({ connectionString: databaseUrl });
export const db = drizzle({ client: pool, schema });
