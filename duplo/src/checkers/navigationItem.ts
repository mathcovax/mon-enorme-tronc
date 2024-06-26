export const navigationItemExistCheck = duplo
	.createChecker("navigationItemExist")
	.handler(async (id: string, output) => {
		const navigationItem = await prisma.navigation_item.findFirst({
			where: {
				id
			},
		});

		if (navigationItem) {
			return output("navigationItem.exist", navigationItem);
		}
		else {
			return output("navigationItem.notfound", null);
		}
	})
	.preCompletion(
		"mustExist",
		{
			result: "navigationItem.exist",
			catch: () => {
				throw new NotFoundHttpException("navigationItem.notfound");
			},
			indexing: "navigationItem",
		}
	)
	.build();
