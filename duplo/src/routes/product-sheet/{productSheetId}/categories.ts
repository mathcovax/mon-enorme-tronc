import { hasOrganizationRole } from "@security/hasOrganizationRole";
import {
	productSheetExistCheck,
	inputProductSheet,
} from "@checkers/productSheet";
import { mustBeConnected } from "@security/mustBeConnected";
import { categorySchema } from "@schemas/category";

/* METHOD : GET, PATH : /product-sheet/{productSheetId}/categories */
export const GET = (method: Methods, path: string) =>
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareRoute(method, path)
		.extract({
			params: {
				productSheetId: zod.string(),
			},
		})
		.check(
			productSheetExistCheck,
			{
				input: (p) => inputProductSheet.id(p("productSheetId")),
				...productSheetExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "productSheet.notfound")
		)
		.process(
			hasOrganizationRole,
			{
				input: p => ({
					organizationId: p("productSheet").organizationId,
					userId: p("accessTokenContent").id
				}),
				options: { organizationRole: "PRODUCT_SHEET_MANAGER" }
			}
		)
		.handler(
			async ({ pickup }) => {
				const { id } = pickup("productSheet");

				const categories = await prisma.product_sheet_to_category.findMany({
					where: {
						productSheetId: id
					},
					select: {
						category: true
					},
				}).then((pstc) => pstc.map(({ category }) => category));

				throw new OkHttpException("productSheet.categories", categories);
			},
			new IHaveSentThis(OkHttpException.code, "productSheet.categories", categorySchema.array())
		);
