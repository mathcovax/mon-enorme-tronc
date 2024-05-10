import { prisma } from "../prisma-client";
import { faker } from "@faker-js/faker";

interface Category {
	id: string;
	name: string;
}

export const makeCategories = async (nb: number) => {
	const categories = [] as Category[];

	for (let i = 0; i < nb; i++) {
		const category = await prisma.category.create({
			data: {
				name: faker.commerce.department()
			}
		});

		categories.push(category);
	}

	return categories;
};
