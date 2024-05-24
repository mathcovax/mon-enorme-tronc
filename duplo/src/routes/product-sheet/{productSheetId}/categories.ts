import { categorySchema } from "@schemas/category";
import { hasOrganizationRoleByProductSheetId } from "@security/hasOrganizationRole/byProductSheetId";

/* METHOD : GET, PATH : /product-sheet/{productSheetId}/categories */
export const GET = (method: Methods, path: string) =>
	hasOrganizationRoleByProductSheetId({ pickup: ["productSheet"] })
		.declareRoute(method, path)
		.handler(
			async ({ pickup }) => {
				const { id: productSheetId } = pickup("productSheet");

				const categories = await prisma.product_sheet_to_category.findMany({
					where: {
						productSheetId,
					},
					select: {
						category: true
					},
					take: 5,
				}).then((pstc) => pstc.map(({ category }) => category));

				throw new OkHttpException("productSheet.categories", categories);
			},
			new IHaveSentThis(OkHttpException.code, "productSheet.categories", categorySchema.array())
		);
