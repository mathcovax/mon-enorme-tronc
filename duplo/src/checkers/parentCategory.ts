export const parentCategoryExistCheck = duplo
	.createChecker("parentCategoryExist")
	.handler(async (name: string, output) => {
		const category = await prisma.parent_category.findFirst({
			where: {
				name
			},
		});

		if (category) {
			return output("parentCategory.exist", category);
		}
		else {
			return output("parentCategory.notfound", null);
		}
	})
	.preCompletion(
		"mustExist",
		{
			result: "parentCategory.exist",
			catch: () => {
				throw new NotFoundHttpException("parentCategory.notfound");
			},
			indexing: "parentCategory",
		}
	)
	.build();
