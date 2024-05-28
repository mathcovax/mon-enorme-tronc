import { productSchema, productStatusEnum } from "@schemas/product";
import { hasOrganizationRoleByProductSheetId } from "@security/hasOrganizationRole/byProductSheetId";

/* METHOD : POST, PATH : /product-sheet/{productSheetId}/product */
export const POST = (method: Methods, path: string) =>
	hasOrganizationRoleByProductSheetId({
		options: { organizationRole: "STORE_KEEPER" },  
		pickup: ["productSheet"] 
	})
		.declareRoute(method, path)
		.extract({
			body: zod.object({
				sku: zod.string().min(2).max(255),
			}).strip(),
		})
		.handler(
			async ({ pickup }) => {
				const { id: productSheetId, organizationId } = pickup("productSheet");
				const { sku } = pickup("body");

				const product = await prisma.product.create({
					data: {
						sku,
						productSheetId,
						organizationId,
						status: productStatusEnum.IN_STOCK,
					}
				});
				throw new CreatedHttpException("product.created", product);
			},
			new IHaveSentThis(CreatedHttpException.code, "product.created", productSchema)
		);
