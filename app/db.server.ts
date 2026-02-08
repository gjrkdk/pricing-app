import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Vercel Postgres pooling pattern with Prisma
// Use connection pooling for serverless environments
// See: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-pooling

declare global {
  var __db: PrismaClient | undefined;
}

let prisma: PrismaClient;

// Always use pooling with pg adapter for Vercel deployment
// In production, DATABASE_URL should use pgbouncer connection with connection_limit=1
// Note: DIRECT_URL is used by Prisma CLI only (migrations) and not read at runtime
if (!global.__db) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: process.env.NODE_ENV === "production" ? 1 : 10,
  });
  const adapter = new PrismaPg(pool);
  global.__db = new PrismaClient({ adapter });
}

prisma = global.__db;

export { prisma };
