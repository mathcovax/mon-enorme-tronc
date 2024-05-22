import type { product_sheet } from "@prisma/client";
import { prisma } from "../prismaClient";
import { faker } from "@faker-js/faker";

export const makeProductSheet = (
	organizationId: string,
	productSheet?: Partial<product_sheet>
) =>
	prisma.product_sheet.create({
		data: {
			name: productSheet?.name || faker.commerce.productName(),
			description: productSheet?.description || faker.commerce.productDescription(),
			shortDescription: productSheet?.shortDescription || faker.commerce.productDescription(),
			price: productSheet?.price || parseFloat(faker.commerce.price()),
			organizationId: organizationId
		}
	});
