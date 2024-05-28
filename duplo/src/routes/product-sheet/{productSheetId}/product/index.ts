import { inputWarehouse, warehouseExistCheck } from "@checkers/warehouse";
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
				warehouseId: zod.string()
			}).strip(),
		})
		.check(
			warehouseExistCheck,
			{
				input: (p) => inputWarehouse.id(p("body").warehouseId),
				...warehouseExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "warehouse.notfound")
		)
		.handler(
			async ({ pickup }) => {
				const { id: productSheetId, organizationId } = pickup("productSheet");
				const { sku, warehouseId } = pickup("body");

				const product = await prisma.product.create({
					data: {
						sku,
						productSheetId,
						organizationId,
						status: productStatusEnum.IN_STOCK,
						warehouseId,
					}
				});
				throw new CreatedHttpException("product.created", product);
			},
			new IHaveSentThis(CreatedHttpException.code, "product.created", productSchema)
		);
