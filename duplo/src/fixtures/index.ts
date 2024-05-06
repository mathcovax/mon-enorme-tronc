import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

prisma.user.create({
	data: {
		email: faker.internet.email(),
		firstname: faker.internet.userName(),
		lastname: faker.internet.userName(),
		address: "",
		age: 18
	}  
});
