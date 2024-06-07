import { prisma } from "../prismaClient";
import { product, product_sheet, product_status, warehouse } from "@prisma/client";
import { uuidv7 } from "uuidv7";

const status = Object.values(product_status);

export const makeProduct = async (
	productSheet: product_sheet,
	warehouse: warehouse,
	product?: product
) => prisma.product.create({
	data: {
		sku: product?.sku || uuidv7(),
		productSheetId: product?.productSheetId || productSheet.id,
		organizationId: product?.organizationId || productSheet.organizationId,
		warehouseId: product?.warehouseId || warehouse.id,
		status: status[Math.floor(Math.random() * status.length)]
	}
});
