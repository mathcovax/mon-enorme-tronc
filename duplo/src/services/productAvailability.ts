interface ProductAvailabilityResult {
	productSheetId: string;
	available_stock: bigint;
  }
export class ProductAvailability {
	static async quantity(productSheetId: string): Promise<number> {
		const result = await prisma.$queryRaw<ProductAvailabilityResult[]>`
			SELECT
			ps.id AS "productSheetId",
			COALESCE(p.total_count, 0) - COALESCE(a.reserved_count, 0) AS "available_stock"
			FROM
			product_sheet ps
			LEFT JOIN (
			SELECT
				"productSheetId",
				COUNT(*) AS total_count
			FROM
				product
			GROUP BY
				"productSheetId"
			) p ON ps.id = p."productSheetId"
			LEFT JOIN (
			SELECT
				"productSheetId",
				COUNT(*) AS reserved_count
			FROM
				article
			WHERE
				"createdAt" >= NOW() - INTERVAL '15 minutes'
			GROUP BY
				"productSheetId"
			) a ON ps.id = a."productSheetId"
			WHERE
			ps.id = ${productSheetId};
		`;
		return Number(result?.[0]?.available_stock ?? 0); 
	}
}
