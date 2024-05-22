import { GetTypeInput, createTypeInput } from "@duplojs/type-input";
import { Prisma } from "@prisma/client";

export const inputProductSheet = createTypeInput()
	.add<"id", string>()
	.add<"name", string>()
	.build();

export const productSheetExistCheck = duplo
	.createChecker("productSheetExist")
	.handler(async ({ name, value }: GetTypeInput<typeof inputProductSheet>, output) => {
		let where: Prisma.product_sheetFindFirstArgs["where"];

		if (name === "id") {
			where = {
				id: value
			};
		}
		else if (name === "name") {
			where = {
				name: value
			};
		}

		const productSheet = await prisma.product_sheet.findFirst({
			where,
		});

		if (productSheet) {
			return output("productSheet.exist", productSheet);
		}
		else {
			return output("productSheet.notfound", null);
		}
	})
	.preCompletion(
		"mustExist",
		{
			result: "productSheet.exist",
			catch: () => {
				throw new NotFoundHttpException("productSheet.notfound");
			},
			indexing: "productSheet"
		}
	)
	.build();

