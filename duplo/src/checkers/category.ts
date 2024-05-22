import { GetTypeInput, createTypeInput } from "@duplojs/type-input";
import { Prisma } from "@prisma/client";

export const inputCategory = createTypeInput()
	.add<"id", string>()
	.add<"name", string>()
	.build();

export const categoryExistCheck = duplo
	.createChecker("categoryExist")
	.handler(async ({ name, value }: GetTypeInput<typeof inputCategory>, output) => {
		let where: Prisma.categoryFindFirstArgs["where"];

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

		const category = await prisma.category.findFirst({
			where,
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
