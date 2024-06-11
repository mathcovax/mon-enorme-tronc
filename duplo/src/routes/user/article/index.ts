import { productSheetExistCheck, inputProductSheet } from "@checkers/productSheet";
import { articleSchema } from "@schemas/article";
import { mustBeConnected } from "@security/mustBeConnected";
import { ProductAvailability } from "@services/productAvailability";

/* METHOD : POST, PATH : /user/article */
export const POST = (method: Methods, path: string) => mustBeConnected({ pickup: ["accessTokenContent"] })
	.declareRoute(method, path)
	.extract({
		body: zod.object({
			productSheetId: zod.string(),
		}).strip()
	})
	.check(
		productSheetExistCheck,
		{
			input: (p) => inputProductSheet.id(p("body").productSheetId),
			...productSheetExistCheck.preCompletions.mustExist
		},
		new IHaveSentThis(NotFoundHttpException.code, "productSheet.notfound")
	)
	.cut(
		async ({ pickup }) => {
			const { productSheetId } = pickup("body");

			const quantity = await ProductAvailability.quantity(productSheetId);

			if (quantity < 1) {
				throw new ConflictHttpException("quantity.empty");
			}

			return {};
		},
		[],
		new IHaveSentThis(ConflictHttpException.code, "quantity.empty")
	)
	.handler(
		async ({ pickup }) => {
			const { productSheetId } = pickup("body");
			const { id: userId } = pickup("accessTokenContent");

			const article = await prisma.article.create({
				data: {
					userId,
					productSheetId
				}
			});

			throw new CreatedHttpException("article.created", article);
		},
		new IHaveSentThis(CreatedHttpException.code, "article.created", articleSchema)
	);
