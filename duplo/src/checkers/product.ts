import { GetTypeInput, createTypeInput } from "@duplojs/type-input";
import { Prisma } from "@prisma/client";

export const inputProduct = createTypeInput()
	.add<"id", string>()
	.add<"sku", string>()
	.build();

export const productExistCheck = duplo
	.createChecker("productExist")
	.handler(async ({ name, value }: GetTypeInput<typeof inputProduct>, output) => {
		let where: Prisma.productFindFirstArgs["where"];

		if (name === "id") {
			where = {
				id: value
			};
		}
		else if (name === "sku") {
			where = {
				sku: value
			};
		}

		const product = await prisma.product.findFirst({
			where,
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
