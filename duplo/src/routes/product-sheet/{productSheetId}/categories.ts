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
			query: {
				page: zod.coerce.number().default(0),
			}
		})
		.check(
			productSheetExistCheck,
			{
				input: (p) => inputProductSheet.id(p("productSheetId")),
				...productSheetExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "product_sheet.notfound")
		)
		.process(
			hasOrganizationRole,
			{
				input: p => ({
					organizationId: p("product_sheet").organizationId,
					userId: p("accessTokenContent").id
				}),
				options: { organizationRole: "PRODUCT_SHEET_MANAGER" }
			}
		)
		.handler(
			async ({ pickup }) => {
				const page = pickup("page");
				const { id } = pickup("product_sheet");

				const categories = await prisma.product_sheet_to_category.findMany({
					where: {
						productSheetId: id
					},
					select: {
						category: true
					},
					skip: 10 * page,
					take: 10,
				}).then((pstc) => pstc.map(({ category }) => category));

				throw new OkHttpException("product_sheet.categories", categories);
			},
			new IHaveSentThis(OkHttpException.code, "product_sheet.categories", categorySchema.array())
		);
