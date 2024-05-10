import { prisma } from "../prismaClient";
import { faker } from "@faker-js/faker";

interface ParentCategory {
	id: string;
	name: string;
}

export const makeParentCategories = async (nb: number) => {
	const parentCategories = [] as ParentCategory[];

	for (let i = 0; i < nb; i++) {
		const parentCategory = await prisma.parent_category.create({
			data: {
				name: faker.commerce.department()
			}
		});

		parentCategories.push(parentCategory);
	}

	return parentCategories;
};

export const assignParentCategoryToCategory = async (parentCategoryId: string, categoryId: string) => {
	await prisma.category_to_parent_category.create({
		data: {
			parent_category: {
				connect: {
					id: parentCategoryId
				}
			},
			category: {
				connect: {
					id: categoryId
				}
			}
		}
	});
};

