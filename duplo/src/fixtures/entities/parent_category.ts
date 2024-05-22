import type { parent_category } from "@prisma/client";
import { prisma } from "../prismaClient";
import { faker } from "@faker-js/faker";

export const makeParentCategory = (
	parent_category?: Partial<parent_category>
) =>
	prisma.parent_category.create({
		data: {
			name: parent_category?.name || faker.commerce.department()
		}
	});
