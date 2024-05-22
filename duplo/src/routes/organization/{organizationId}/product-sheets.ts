import { productSheetSchema } from "@schemas/productSheet";
import { hasOrganizationRoleByOrganizationId } from "@security/hasOrganizationRole/byOrganizationId";

/* METHOD : GET, PATH : /organization/{organizationId}/product-sheets */
export const GET = (method: Methods, path: string) =>
	hasOrganizationRoleByOrganizationId({ 
		options: { organizationRole: "PRODUCT_SHEET_MANAGER" }, 
		pickup: ["organization"] 
	})
		.declareRoute(method, path)
		.extract({
			query: {
				page: zod.coerce.number().default(0),
				name: zod.string().optional()
			}
		})
		.handler(
			async ({ pickup }) => {
				const { id: organizationId } = pickup("organization");
				const page = pickup("page");
				const name = pickup("name");

				const productSheets = await prisma.product_sheet.findMany({
					where: {
						organizationId,
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
