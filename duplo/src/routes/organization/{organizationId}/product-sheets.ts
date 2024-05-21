import { productSheetSchema } from "@schemas/productSheet";
import { hasOrganizationRole } from "@security/hasOrganizationRole";
import { mustBeConnected } from "@security/mustBeConnected";

/* METHOD : GET, PATH : /organization/{organizationId}/product-sheets */
export const GET = (method: Methods, path: string) =>
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareRoute(method, path)
		.extract({
			params: {
				organizationId: zod.string()
			},
			query: {
				page: zod.coerce.number().default(0),
				name: zod.string().optional()
			}
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
				const organizationId = pickup("organizationId");
				const page = pickup("page");
				const name = pickup("name");

				const productSheets = await prisma.product_sheet.findMany({
					where: {
						organizationId: organizationId,
						name: name
							? {
								contains: name,
								mode: "insensitive"
							}
							: undefined
					},
					take: 10,
					skip: page * 10
				});

				throw new OkHttpException("productSheets.found", productSheets);
			},
			new IHaveSentThis(OkHttpException.code, "productSheets.found", productSheetSchema.array())
		);
