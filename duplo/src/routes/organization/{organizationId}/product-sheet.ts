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
			}).passthrough(),
		})
		.handler(
			async ({ pickup }) => {
				const { name, description, shortDescription, price } = pickup("body");
				const { id: organizationId } = pickup("organization");

				const { id: productSheetId } = await prisma.product_sheet.create({
					data: {
						name,
						description,
						shortDescription,
						price,
						organizationId,
					},
				});

				throw new CreatedHttpException("productSheet.created", productSheetId);
			}, 
			new IHaveSentThis(CreatedHttpException.code, "productSheet.created", zod.string())
		);
