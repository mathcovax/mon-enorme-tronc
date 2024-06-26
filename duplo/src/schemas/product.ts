import { product_status } from "@prisma/client";

export const productStatusTuple: TuplifyUnion<product_status> = [
	"WRONG", 
	"SOLD", 
	"IN_STOCK"
];

export const productStatusEnum: UninonToEnum<product_status> = {
	WRONG: "WRONG",
	SOLD: "SOLD",
	IN_STOCK: "IN_STOCK",
};

export type ProductSchema = Zod.infer<typeof productSchema>

export const productSchema = zod.object({
	sku: zod.string().min(2).max(255),
	status: zod.enum(productStatusTuple),
	organizationId: zod.string(),
	productSheetId: zod.string(),
	productSheetName: zod.string(),
	productSheetFirstImageUrl: zod.string().optional(),
	warehouseId: zod.string(),
	warehouseName: zod.string(),
	createdAt: zod.string(),
	updatedAt: zod.string(),
});
