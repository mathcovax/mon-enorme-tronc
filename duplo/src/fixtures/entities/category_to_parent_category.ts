import { prisma } from "../prismaClient";

export const makeCategoryToParentCategory = (
	categoryName: string,
	parentCategoryName: string,
) =>
	prisma.category_to_parent_category.create({
		data: {
			categoryName: categoryName,
			parentCategoryName: parentCategoryName
		}
	});
