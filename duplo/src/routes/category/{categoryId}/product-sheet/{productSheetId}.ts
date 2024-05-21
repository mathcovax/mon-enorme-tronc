import { categoryExistCheck, inputCategory } from "@checkers/category";
import {
	productSheetExistCheck,
	inputProductSheet,
} from "@checkers/productSheet";
import { hasOrganizationRole } from "@security/hasOrganizationRole";
import { mustBeConnected } from "@security/mustBeConnected";

/* METHOD : DELETE, PATH : /category/{categoryId}/product-sheet/{productSheetId} */
export const DELETE = (method: Methods, path: string) =>
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareRoute(method, path)
		.extract({
			params: {
				productSheetId: zod.string(),
				categoryId: zod.string(),
			},
		})
		.check(
			productSheetExistCheck,
			{
				input: (p) => inputProductSheet.id(p("productSheetId")),
				result: "productSheet.exist",
				catch: () => {
					throw new NotFoundHttpException("productSheet.notfound");
				},
				indexing: "productSheet"
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
		.check(
			categoryExistCheck,
			{
				input: (p) => inputCategory.id(p("categoryId")),
				result: "category.exist",
				catch: () => {
					throw new NotFoundHttpException("category.notfound");
				},
				indexing: "category"
			},
			new IHaveSentThis(NotFoundHttpException.code, "category.notfound")
		)
		.handler(
			async ({ pickup }) => {
				const productSheetId = pickup("productSheetId");
				const categoryId = pickup("categoryId");

				await prisma.product_sheet_to_category.deleteMany({
					where: {
						productSheetId,
						categoryId,
					},
				});

				throw new OkHttpException("product_sheet_to_category.delete");
			}, 
			new IHaveSentThis(OkHttpException.code, "product_sheet_to_category.delete")
		);
