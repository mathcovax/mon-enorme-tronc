import { prisma } from "../prismaClient";

export const makeProductSheetToCategory = (
	productSheetId: string,
	categoryName: string,
) =>
	prisma.product_sheet_to_category.create({
		data: {
			productSheetId,
			categoryName
		}
	});

