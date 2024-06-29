import { prisma } from "../prismaClient";
import { product, product_sheet, product_status } from "@prisma/client";
import { uuidv7 } from "uuidv7";

const status = Object.values(product_status);

export const makeProduct = async (
	productSheet: product_sheet,
	product?: Partial<product>
) => prisma.product.create({
	data: {
		sku: product?.sku || uuidv7(),
		productSheetId: product?.productSheetId || productSheet.id,
		organizationId: product?.organizationId || productSheet.organizationId,
		status: product?.status || status[Math.floor(Math.random() * status.length)]
	}
});
