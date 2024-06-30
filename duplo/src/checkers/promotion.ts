export const promotionExistCheck = duplo
	.createChecker("promotionExist")
	.handler(async (promotionId: number, output) => {

		const promotion = await prisma.promotion.findFirst({
			where: {
				id: promotionId
			},
		});

		if (promotion) {
			return output("promotion.exist", promotion);
		} else {
			return output("promotion.notfound", null);
		}
	})
	.preCompletion(
		"mustExist",
		{
			result: "promotion.exist",
			catch: () => {
				throw new NotFoundHttpException("promotion.notfound");
			},
			indexing: "promotion"
		}
	)
	.build();
