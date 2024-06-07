import { prisma } from "../prismaClient";
import { product, product_sheet, product_status } from "@prisma/client";
import { uuidv7 } from "uuidv7";

const status = Object.values(product_status);

const getRandomWarehouse = async (organizationId: string) => {
	const warehouses = await prisma.warehouse.findMany({ where: { organizationId } });
	return warehouses.length ? warehouses[Math.floor(Math.random() * warehouses.length)] : null;
};

export const makeProduct = async (
	productSheet: product_sheet,
	product?: product
) => prisma.product.create({
	data: {
		sku: product?.sku || uuidv7(),
		productSheetId: product?.productSheetId || productSheet.id,
		organizationId: product?.organizationId || productSheet.organizationId,
		warehouseId: product?.warehouseId || (await getRandomWarehouse(productSheet.organizationId))?.id as string,
		status: status[Math.floor(Math.random() * status.length)]
	}
});
