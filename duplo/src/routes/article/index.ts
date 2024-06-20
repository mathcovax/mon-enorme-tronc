import { productSheetExistCheck, inputProductSheet } from "@checkers/productSheet";
import { articleCreatedSchema } from "@schemas/article";
import { mustBeConnected } from "@security/mustBeConnected";
import { ProductAvailability } from "@services/productAvailability";

/* METHOD : POST, PATH : /article */
export const POST = (method: Methods, path: string) => mustBeConnected({ pickup: ["accessTokenContent"] })
	.declareRoute(method, path)
	.extract({
		body: zod.object({
			productSheetId: zod.string(),
			quantity: zod.number().min(1).default(1),
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
			const { productSheetId, quantity } = pickup("body");

			const quantityAvailable = await ProductAvailability.quantity(productSheetId);

			if (quantityAvailable < quantity) {
				throw new ConflictHttpException("product.unavailable");
			}

			return {};
		},
		[],
		new IHaveSentThis(ConflictHttpException.code, "product.unavailable")
	)
	.handler(
		async ({ pickup }) => {
			const { productSheetId, quantity } = pickup("body");
			const { id: userId } = pickup("accessTokenContent");
			const createdAt = new Date();

			await prisma.article.createMany({
				data: Array.from({ length: quantity }, () => ({
					productSheetId,
					userId,
					createdAt,
				})),
			});

			throw new CreatedHttpException("article.created", {
				productSheetId, quantity, userId, createdAt 
			});
		},
		new IHaveSentThis(CreatedHttpException.code, "article.created", articleCreatedSchema)
	);
