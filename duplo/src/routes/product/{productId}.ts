import { productStatusEnum } from "@schemas/product";
import { hasOrganizationRoleByProductId } from "@security/hasOrganizationRole/byProductId";

/* METHOD : PATCH, PATH : /product/{productId} */
export const PATCH = (method: Methods, path: string) =>
	hasOrganizationRoleByProductId({ pickup: ["product"] })
		.declareRoute(method, path)
		.extract({
			body: zod.object({
				sku: zod.string().min(3).max(255).optional(),
				productSheetId: zod.string().optional(),
				status: zod.enum([productStatusEnum.IN_STOCK, productStatusEnum.WRONG]).optional()
			}).strip().default({}),
		})
		.handler(
			async ({ pickup }) => {
				const { id } = pickup("product");
				const { sku, status, productSheetId } = pickup("body");

				await prisma.product.update({
					where: {
						id
					},
					data: {
						sku,
						status,
						productSheetId
					}
				});
				throw new NoContentHttpException("product.edited");
			},
			new IHaveSentThis(NoContentHttpException.code, "product.edited")
		);
