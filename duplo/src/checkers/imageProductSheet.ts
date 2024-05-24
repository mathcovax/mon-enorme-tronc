
export const imageProductSheetExist = duplo
	.createChecker("imageProductSheetExist")
	.handler(async (imageProductSheetId: string, output) => {
		const imageProductSheet = await prisma.image_product_sheet.findFirst({
			where: {
				id: imageProductSheetId
			}
		});

		if (imageProductSheet) {
			return output("imageProductSheet.exist", imageProductSheet);
		}
		else {
			return output("imageProductSheet.notfound", null);
		}
	})
	.preCompletion(
		"mustExist", 
		{
			result: "imageProductSheet.exist",
			catch: () => {
				throw new NotFoundHttpException("imageProductSheet.notfound");
			},
			indexing: "imageProductSheet"
		}
	)
	.build();
