import { product_status } from "@prisma/client";
import { productSheetSchema } from "./productSheet";
import { warehouseSchema } from "./warehouseSchema";

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
	sku: zod.string().min(2).max(255),
	productSheetId: zod.string(),
	organizationId: zod.string(),
	warehouseId: zod.string(),
	createdAt: zod.coerce.string(),
	updatedAt: zod.coerce.string(),
	status: zod.enum(productStatusTuple),
});

export const productWithMoreSchema = productSchema.extend({
	productSheet: productSheetSchema.optional(),
	warehouse: warehouseSchema.optional(),
});
