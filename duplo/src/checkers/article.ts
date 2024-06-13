import { GetTypeInput, createTypeInput } from "@duplojs/type-input";
import { Prisma } from "@prisma/client";

export const inputArticle = createTypeInput()
	.add<"id", string>()
	.add<"productSheetId", string>()
	.build();

export const articleExistCheck = duplo
	.createChecker("articleExist")
	.handler(async ({ name, value }: GetTypeInput<typeof inputArticle>, output) => {
		let where: Prisma.articleFindFirstArgs["where"];

		if (name === "id") {
			where = {
				id: value
			};
		}
		else if (name === "productSheetId") {
			where = {
				productSheetId: value
			};
		}

		const article = await prisma.article.findFirst({
			where,
		});

		if (article) {
			return output("article.exist", article);
		}
		else {
			return output("article.notfound", null);
		}
	})
	.preCompletion(
		"mustExist",
		{
			result: "article.exist",
			catch: () => {
				throw new NotFoundHttpException("article.notfound");
			},
			indexing: "article"
		}
	)
	.build();
