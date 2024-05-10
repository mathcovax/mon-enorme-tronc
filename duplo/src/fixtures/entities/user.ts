import { prisma } from "../prisma-client";
import { faker } from "@faker-js/faker";

interface User {
	id: string;
	email: string;
	lastname: string;
	firstname: string;
	dateOfBirth: Date;
	address: string;
	primordialRole: string;
}

enum Role {
	CUSTOMER = "CUSTOMER",
	ADMIN = "ADMIN"
}

export const makeUsers = async (nb: number) => {
	const users = [] as User[];

	for (let i = 0; i < nb; i++) {
		const user = await prisma.user.create({
			data: {
				email: faker.internet.email(),
				firstname: faker.internet.userName(),
				lastname: faker.internet.userName(),
				address: "",
				dateOfBirth: faker.date.birthdate({ min: 18 }),
				primordialRole: Role.CUSTOMER //i === 0 ? Role.ADMIN : Role.CUSTOMER
			}
		});

		users.push(user);
	}

	return users;
};
