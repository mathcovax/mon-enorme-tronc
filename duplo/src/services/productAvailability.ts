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
					product AS p
				WHERE 
					p.status = 'IN_STOCK'
					AND p."productSheetId" = ${productSheetId}
				GROUP BY p."productSheetId"
			), reservedProductCount (total) AS (
				SELECT
					COUNT(*) AS total
				FROM
					article AS a
				WHERE 
					"createdAt" >= NOW() - INTERVAL '15 minutes'
					AND a."productSheetId" = ${productSheetId}
					AND a."userId" != ${userId}
				GROUP BY a."productSheetId"
			)

			SELECT 
				COALESCE((SELECT total from inStockProductCount), 0)
				- COALESCE((SELECT total from reservedProductCount), 0) as count
		`;
		
		return this.quantityResultSchema.parse(result); 
	}
}
