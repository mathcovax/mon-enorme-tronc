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
	.build();
