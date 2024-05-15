import { prisma } from "../prismaClient";
import { faker } from "@faker-js/faker";

export const makeProductsSheet = async (orgId: string) => {

	return await prisma.product_sheet.create({
		data: {
			name: faker.commerce.productName(),
			price: parseFloat(faker.commerce.price()),
			description: faker.commerce.productDescription(),
			short_description: faker.commerce.productDescription(),
			organization: {
				connect: {
					id: orgId
				}
			}
		},
	});
};

export const assignProductSheetToCategory = async (productId: string, categoryId: string) => {
	await prisma.product_sheet_to_category.create({
		data: {
			product_sheet: {
				connect: {
					id: productId
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
