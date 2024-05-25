import { prisma } from "../prismaClient";

export const makeCategoryToParentCategory = (
	categoryId: string,
	parentCategoryName: string,
) =>
	prisma.category_to_parent_category.create({
		data: {
			categoryId: categoryId,
			parentCategoryName: parentCategoryName
		}
	});
