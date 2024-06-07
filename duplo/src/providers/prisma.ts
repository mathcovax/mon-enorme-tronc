import { PrismaClient } from "@prisma/client";
import { lstat, readdir } from "fs/promises";

declare global {
	const prisma: (typeof import("./prisma"))["prisma"];
}

//@ts-expect-error var 'global' cause type error.
export const prisma = global.prisma = new PrismaClient();

duplo.addHook("beforeListenHttpServer", async () => {
	Promise.all(
		(await readdir("src/prisma/hooks")).map(
			file => lstat(`src/prisma/hooks/${file}`).then(value => !value.isDirectory() ? import(`@prisma/hooks/${file}`) : undefined)
		)
	);
	await prisma.$connect();
});
