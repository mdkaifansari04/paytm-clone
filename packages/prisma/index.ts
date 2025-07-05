import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config();

const globalPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const client = globalPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalPrisma.prisma = client;
}
