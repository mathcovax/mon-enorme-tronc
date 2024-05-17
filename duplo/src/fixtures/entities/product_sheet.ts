import type { product_sheet } from "@prisma/client";
import { prisma } from "../prismaClient";
import { faker } from "@faker-js/faker";

export const makeProductSheet = (
	organizationId: string,
	product_sheet?: Partial<product_sheet>
) =>
	prisma.product_sheet.create({
		data: {
			name: product_sheet?.name || faker.commerce.productName(),
			description: product_sheet?.description || faker.commerce.productDescription(),
			shortDescription: product_sheet?.shortDescription || faker.commerce.productDescription(),
			price: product_sheet?.price || parseFloat(faker.commerce.price()),
			organizationId: organizationId
		}
	});
