import { hasOrganizationRole } from "@security/hasOrganizationRole";
import { mustBeConnected } from "@security/mustBeConnected";

/* METHOD : POST, PATH : /organization/{organizationId}/product-sheet */
export const POST = (method: Methods, path: string) =>
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareRoute(method, path)
		.extract({
			params: {
				organizationId: zod.string(),
			},
			body: zod.object({
				name: zod.string(),
				description: zod.string(),
				shortDescription: zod.string(),
				price: zod.number().min(0),
			}).passthrough(),
		})
		.process(
			hasOrganizationRole,
			{
				input: p => ({
					organizationId: p("organizationId"),
					userId: p("accessTokenContent").id
				}),
				options: { organizationRole: "PRODUCT_SHEET_MANAGER" }
			}
		)
		.handler(
			async ({ pickup }) => {
				const { name, description, shortDescription, price } = pickup("body");
				const organizationId = pickup("organizationId");

				const { id: productSheetId } = await prisma.product_sheet.create({
					data: {
						name: name,
						description: description,
						shortDescription: shortDescription,
						price: price,
						organizationId: organizationId,
					},
				});

				throw new CreatedHttpException("productSheet.created", productSheetId);
			}, 
			new IHaveSentThis(CreatedHttpException.code, "productSheet.created", zod.string())
		);
