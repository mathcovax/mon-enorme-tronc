export class ProductAvailability {
	static quantity(productSheetId: string): Promise<number> {
		return prisma.product.count({
			where: {
				productSheetId
			}
		});
	}
}
