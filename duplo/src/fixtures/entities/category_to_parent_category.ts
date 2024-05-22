import { prisma } from "../prismaClient";

export const makeCategoryToParentCategory = (
	categoryId: string,
	parentCategoryId: string,
) =>
	prisma.category_to_parent_category.create({
		data: {
			categoryId: categoryId,
			parentCategoryId: parentCategoryId
		}
	});
