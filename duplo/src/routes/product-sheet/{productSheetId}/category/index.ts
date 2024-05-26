import { categoryExistCheck } from "@checkers/category";
import { hasOrganizationRoleByProductSheetId } from "@security/hasOrganizationRole/byProductSheetId";

/* METHOD : POST, PATH : /product-sheet/{productSheetId}/category */
export const POST = (method: Methods, path: string) =>
	hasOrganizationRoleByProductSheetId({ pickup: ["productSheet"] })
		.declareRoute(method, path)
		.extract({
			body: zod.object({
				categoryName: zod.string(),
			}).strip()
		})
		.check(
			categoryExistCheck,
			{
				input: (p) => p("body").categoryName,
				...categoryExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "category.notfound")
		)
		.cut(
			async ({ pickup }) => {
				const { id: productSheetId } = pickup("productSheet");
				const categoriesProductSheetCount = await prisma.product_sheet_to_category.count({
					where: {
						productSheetId,
					}
				});

				if (categoriesProductSheetCount > 4) {
					throw new ConflictHttpException("productSheet.categories.limit");
				}

				return {};
			},
			[],
			new IHaveSentThis(ConflictHttpException.code, "productSheet.categories.limit")
		)
		.handler(
			async ({ pickup }) => {
				const { id: productSheetId } = pickup("productSheet");
				const { categoryName } = pickup("body");

				await prisma.product_sheet_to_category.create({
					data: {
						categoryName,
						productSheetId
					},
				});

				throw new OkHttpException("productSheet.category.linked");
			}, 
			new IHaveSentThis(OkHttpException.code, "productSheet.category.linked")
		);
