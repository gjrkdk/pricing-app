import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { attachDatabasePool } from "@vercel/functions";

// Vercel Fluid Compute pooling pattern
// See: https://vercel.com/docs/storage/vercel-postgres/using-an-orm#prisma

declare global {
  var __db: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // Production: Use Vercel pooling
  const pool = attachDatabasePool(
    new Pool({
      connectionString: process.env.DATABASE_URL,
    })
  );
  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });
} else {
  // Development: Use singleton pattern to avoid connection exhaustion
  if (!global.__db) {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);
    global.__db = new PrismaClient({ adapter });
  }
  prisma = global.__db;
}

export { prisma };
