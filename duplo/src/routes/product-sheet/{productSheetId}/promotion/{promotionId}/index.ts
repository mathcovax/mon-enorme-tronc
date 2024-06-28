import { promotionExistCheck } from "@checkers/promotion";
import { hasOrganizationRoleByProductSheetId } from "@security/hasOrganizationRole/byProductSheetId";

/* METHOD : DELETE, PATH : /product-sheet/{productSheetId}/promotion/{promotionId} */
export const DELETE = (method: Methods, path: string) => hasOrganizationRoleByProductSheetId({ pickup: ["productSheet"]  })
	.declareRoute(method, path)
	.extract({
		params: {
			promotionId: zod.coerce.number(),
		},
	})
	.check(
		promotionExistCheck,
		{
			input: p => p("promotionId"),
			...promotionExistCheck.preCompletions.mustExist,
		},
		new IHaveSentThis(NotFoundHttpException.code, "promotion.notfound")
	)
	.handler(
		async ({ pickup }) => {
			const promotionId = pickup("promotionId");
			const { id: productSheetId } = pickup("productSheet");

			Promise.all([
				prisma.promotion.delete({
					where: {
						id: promotionId
					}
				}),
				prisma.product_sheet.update({
					where: { id: productSheetId },
					data: {
						promotionId: null
					}
				})
			]);

			throw new NoContentHttpException("promotion.deleted");
		},
		new IHaveSentThis(NoContentHttpException.code, "promotion.deleted")
	);
