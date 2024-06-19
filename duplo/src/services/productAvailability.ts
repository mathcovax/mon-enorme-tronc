import ZodAccelerator from "@duplojs/zod-accelerator";

export class ProductAvailability {
	private static quantityResultSchema = ZodAccelerator.build(
		zod.object({
			count: zod.coerce.number()
		}).transform(({ count }) => count)
	);	

	static async quantity(productSheetId: string, userId = "") {
		const [result] = await prisma.$queryRaw<[{count: number} | undefined]>`
			WITH inStockProductCount (total) AS (
				SELECT
					COUNT(*) AS total
				FROM
					product
				WHERE 
					product.status = 'IN_STOCK'
					AND product."productSheetId" = ${productSheetId}
				GROUP BY product."productSheetId"
			), reservedProductCount (total) AS (
				SELECT
					COUNT(*) AS total
				FROM
					article
				WHERE 
					"createdAt" >= NOW() - INTERVAL '15 minutes'
					AND "userId" != ${userId}
					AND article."productSheetId" = ${productSheetId}
				GROUP BY article."productSheetId"
			)

			SELECT 
				COALESCE((SELECT total from inStockProductCount), 0) - 
				COALESCE((SELECT total from reservedProductCount), 0) as count
		`;
		return this.quantityResultSchema.parse(result); 
	}
}
