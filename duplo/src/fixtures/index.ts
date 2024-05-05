import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

prisma.user.create({
	data: {
		email: faker.internet.email()
	}  
});
