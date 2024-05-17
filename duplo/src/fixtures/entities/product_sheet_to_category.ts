import { prisma } from "../prismaClient";

export const makeProductSheetToCategory = (
	productSheetId: string,
	categoryId: string,
) =>
	prisma.product_sheet_to_category.create({
		data: {
			productSheetId: productSheetId,
			categoryId: categoryId
		}
	});

