export const categoryExistCheck = duplo
	.createChecker("categoryExist")
	.handler(async (categoryName: string, output) => {
		const category = await prisma.category.findFirst({
			where: {
				name: categoryName
			}
		});

		if (category) {
			return output("category.exist", category);
		}
		else {
			return output("category.notfound", null);
		}
	})
	.preCompletion(
		"mustExist",
		{
			result: "category.exist",
			catch: () => {
				throw new NotFoundHttpException("category.notfound");
			},
			indexing: "category",
		}
	)
	.build();
