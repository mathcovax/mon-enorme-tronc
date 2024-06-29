import { Prisma } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";
import { ProductSchema } from "@schemas/product";
import { contract } from "@utils/contract";

export const productSelect = contract<Prisma.productFindManyArgs["select"]>()({
	sku: true,
	status: true,
	organizationId: true,
	createdAt: true,
	updatedAt: true,
	productSheet: {
		select: {
			id: true,
			name: true,
			images: {
				select: {
					url: true
				},
				take: 1
			},
			warehouse: {
				select: {
					id: true,
					name: true,
				}
			}
		}
	}
});

export const productEntityformater = 
	(productEntity: GetResult<Prisma.$productPayload, {select: typeof productSelect}>): ProductSchema => ({
		sku: productEntity.sku,
		status: productEntity.status,
		organizationId: productEntity.organizationId,
		productSheetId: productEntity.productSheet.id,
		productSheetName: productEntity.productSheet.name,
		productSheetFirstImageUrl: productEntity.productSheet.images[0]?.url,
		warehouseId: productEntity.productSheet.warehouse.id,
		warehouseName: productEntity.productSheet.warehouse.name,
		createdAt: productEntity.createdAt.toString(),
		updatedAt: productEntity.updatedAt.toString(),
	});
