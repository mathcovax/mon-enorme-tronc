import { inputProductSheet, productSheetExistCheck } from "@checkers/productSheet";
import { warehouseExistCheck, inputWarehouse } from "@checkers/warehouse";
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
				status: zod.enum([productStatusEnum.IN_STOCK, productStatusEnum.WRONG]).optional(),
				warehouseId: zod.string().optional(),
			}).strip().default({}),
		})
		.check(
			warehouseExistCheck,
			{
				input: (p) => inputWarehouse.id(p("body").warehouseId ?? ""),
				result: "warehouse.exist",
				catch: () => {
					throw new UnauthorizedHttpException("warehouse.notfound");
				},
				indexing: "warehouse",
				skip: p => !p("body").warehouseId,
			},
			new IHaveSentThis(UnauthorizedHttpException.code, "warehouse.notfound")
		)
		.check(
			productSheetExistCheck,
			{
				input: (p) => inputProductSheet.id(p("body").productSheetId ?? ""),
				result: "productSheet.exist",
				catch: () => {
					throw new UnauthorizedHttpException("productSheet.notfound");
				},
				indexing: "productSheet",
				skip: p => !p("body").productSheetId,
			},
			new IHaveSentThis(UnauthorizedHttpException.code, "productSheet.notfound")
		)
		.handler(
			async ({ pickup }) => {
				const { id } = pickup("product");
				const { sku, status } = pickup("body");
				const { id: warehouseId } = pickup("warehouse") ?? {};
				const { id: productSheetId } = pickup("productSheet") ?? {};

				await prisma.product.update({
					where: {
						id
					},
					data: {
						sku,
						status,
						productSheetId,
						warehouseId,
					}
				});
				throw new NoContentHttpException("product.edited");
			},
			new IHaveSentThis(NoContentHttpException.code, "product.edited")
		);
