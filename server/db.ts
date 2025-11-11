import { Pool as PgPool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// In development: use DATABASE_PUBLIC_URL (public Railway connection for testing)
// In production: use DATABASE_URL (will be set by Railway deployment)
const isDevelopment = process.env.NODE_ENV === 'development';
const databaseUrl = isDevelopment 
  ? process.env.DATABASE_PUBLIC_URL 
  : process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    isDevelopment
      ? "DATABASE_PUBLIC_URL must be set for development"
      : "DATABASE_URL must be set for production"
  );
}

// Railway uses standard PostgreSQL
export const pool = new PgPool({ connectionString: databaseUrl });
export const db = drizzle({ client: pool, schema });
