import { prisma } from "../prismaClient";
import { faker } from "@faker-js/faker";
import { product, product_sheet, product_status } from "@prisma/client";

const status = Object.values(product_status);

const generateSku = () => 
	`${faker.random.alpha({ count: 3 })}${faker.random.alphaNumeric(4).toUpperCase()}${faker.datatype.number({ min: 1000, max: 9999 })}`;

const getRandomWarehouse = async (organizationId: string) => {
	const warehouses = await prisma.warehouse.findMany({ where: { organizationId } });
	return warehouses.length ? warehouses[Math.floor(Math.random() * warehouses.length)] : null;
};

export const makeProduct = async (
	productSheet: product_sheet,
	product?: product
) => prisma.product.create({
	data: {
		sku: product?.sku || generateSku(),
		productSheetId: product?.productSheetId || productSheet.id,
		organizationId: product?.organizationId || productSheet.organizationId,
		warehouseId: product?.warehouseId || (await getRandomWarehouse(productSheet.organizationId))?.id as string,
		status: status[Math.floor(Math.random() * status.length)]
	}
});
