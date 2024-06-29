import { inputWarehouse, warehouseExistCheck } from "@checkers/warehouse";
import { productSheetSchema } from "@schemas/productSheet";
import { hasOrganizationRoleByOrganizationId } from "@security/hasOrganizationRole/byOrganizationId";

/* METHOD : POST, PATH : /organization/{organizationId}/product-sheet */
export const POST = (method: Methods, path: string) =>
	hasOrganizationRoleByOrganizationId({ 
		options: { organizationRole: "PRODUCT_SHEET_MANAGER" }, 
		pickup: ["organization"] 
	})
		.declareRoute(method, path)
		.extract({
			body: zod.object({
				name: zod.string().min(3).max(255),
				description: zod.string(),
				shortDescription: zod.string().min(3).max(255),
				price: zod.number().min(0.01),
				warehouseId: zod.string(),
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
				const { name, description, shortDescription, price, warehouseId } = pickup("body");
				const { id: organizationId } = pickup("organization");

				const productSheet = await prisma.product_sheet.create({
					data: {
						name,
						description,
						shortDescription,
						price,
						warehouseId,
						organizationId,
					},
				});

				throw new CreatedHttpException("productSheet.created", productSheet);
			}, 
			new IHaveSentThis(CreatedHttpException.code, "productSheet.created", productSheetSchema)
		);
