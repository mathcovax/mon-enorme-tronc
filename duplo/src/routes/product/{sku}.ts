import { productStatusEnum } from "@schemas/product";
import { hasOrganizationRoleBySku } from "@security/hasOrganizationRole/bySku";

/* METHOD : PATCH, PATH : /product/{sku} */
export const PATCH = (method: Methods, path: string) =>
	hasOrganizationRoleBySku({ pickup: ["product"] })
		.declareRoute(method, path)
		.extract({
			body: zod.object({
				status: zod.enum([
					productStatusEnum.IN_STOCK, 
					productStatusEnum.WRONG
				]).optional(),
			}).strip().default({}),
		})
		.handler(
			async ({ pickup }) => {
				const { sku: productSku } = pickup("product");
				const { status } = pickup("body");

				await prisma.product.update({
					where: {
						sku: productSku
					},
					data: {
						status,
					}
				});
				throw new NoContentHttpException("product.edited");
			},
			new IHaveSentThis(NoContentHttpException.code, "product.edited")
		);
