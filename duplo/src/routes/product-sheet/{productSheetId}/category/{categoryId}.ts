import { categoryExistCheck, inputCategory } from "@checkers/category";
import { hasOrganizationRoleByProductSheetId } from "@security/hasOrganizationRole/byProductSheetId";

/* METHOD : DELETE, PATH : /product-sheet/{productSheetId}/category/{categoryId} */
export const DELETE = (method: Methods, path: string) =>
	hasOrganizationRoleByProductSheetId({ pickup: ["productSheet"] })
		.declareRoute(method, path)
		.extract({
			params: {
				categoryId: zod.string(),
			},
		})
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
				const { id: productSheetId } = pickup("productSheet");
				const categoryId = pickup("categoryId");

				await prisma.product_sheet_to_category.deleteMany({
					where: {
						productSheetId,
						categoryId,
					},
				});

				throw new OkHttpException("productSheet.category.untied");
			}, 
			new IHaveSentThis(OkHttpException.code, "productSheet.category.untied")
		);
