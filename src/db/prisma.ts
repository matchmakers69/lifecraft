/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client";

declare global {
	var prisma: PrismaClient | undefined;
}

const db =
	globalThis.prisma ??
	new PrismaClient({
		log: ["query"],
	});

export { db };

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
