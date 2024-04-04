import { PrismaClient } from "@prisma/client";

declare global {
	const prisma: (typeof import("./prisma"))["prisma"];
}

//@ts-expect-error var 'global' cause type error.
export const prisma = global.prisma = new PrismaClient();

duplo.addHook("beforeListenHttpServer", async () => {
	await prisma.$connect();
});
