import type { user } from "@prisma/client";
import { prisma } from "../prismaClient";
import { faker } from "@faker-js/faker";

export const makeUser = (user?: Partial<user>) => prisma.user.create({
	data: {
		email: user?.email || faker.internet.email(),
		firstname: user?.firstname || faker.person.firstName(),
		lastname: user?.lastname || faker.person.lastName(),
		address: user?.address || "",
		dateOfBirth: user?.dateOfBirth || faker.date.birthdate({ min: 18 }),
		primordialRole: user?.primordialRole || "CUSTOMER",
	},
	select: {
		id: true
	}
});
