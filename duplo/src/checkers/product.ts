export const productExistCheck = duplo
	.createChecker("productExist")
	.handler(async (sku: string, output) => {
		const product = await prisma.product.findFirst({
			where: {
				sku
			},
		});

		if (product) {
			return output("product.exist", product);
		}
		else {
			return output("product.notfound", null);
		}
	})
	.preCompletion(
		"mustExist",
		{
			result: "product.exist",
			catch: () => {
				throw new NotFoundHttpException("product.notfound");
			},
			indexing: "product"
		}
	)
	.build();
