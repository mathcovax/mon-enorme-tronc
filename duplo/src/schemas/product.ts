import { product_status } from "@prisma/client";

export const productStatusTuple: TuplifyUnion<product_status> = [
	"ORDER",
	"WRONG",
	"SOLD",
	"IN_STOCK",
];

export const productStatusEnum: UninonToEnum<product_status> = {
	ORDER: "ORDER",
	WRONG: "WRONG",
	SOLD: "SOLD",
	IN_STOCK: "IN_STOCK",
};

export const productSchema = zod.object({
	id: zod.string(),
	sku: zod.string().min(2).max(255),
	productSheetId: zod.string(),
	organizationId: zod.string(),
	warehouseId: zod.string(),
	createdAt: zod.coerce.string(),
	updatedAt: zod.coerce.string(),
	status: zod.enum(productStatusTuple),
});

export const productAndProductSheetNameSchema = zod.object({
	id: zod.string(),
	sku: zod.string().min(2).max(255),
	productSheetId: zod.string(),
	organizationId: zod.string(),
	warehouseId: zod.string(),
	createdAt: zod.coerce.string(),
	updatedAt: zod.coerce.string(),
	status: zod.enum(productStatusTuple),
	productSheet: zod.object({
		name: zod.string(),
	}),
	warehouse: zod.object({
		name: zod.string(),
	}),
});
