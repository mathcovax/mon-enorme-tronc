import type { category } from "@prisma/client";
import { prisma } from "../prismaClient";
import { faker } from "@faker-js/faker";

export const makeCategory = (
	category?: Partial<category>
) =>
	prisma.category.create({
		data: {
			name: category?.name || faker.commerce.department() + Math.floor(Math.random() * 1000),
			disabled: category?.disabled || false
		}
	});
