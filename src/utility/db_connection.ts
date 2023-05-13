import { DMMFClass } from "@prisma/client/runtime/library";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

export { prisma, DMMFClass };
