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

		const category = await prisma.product_sheet.findFirst({
			where,
		});

		if (category) {
			return output("product_sheet.exist", category);
		}
		else {
			return output("product_sheet.notfound", null);
		}
	})
	.build();

