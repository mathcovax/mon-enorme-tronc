import { categoryExistCheck, inputCategory } from "@checkers/category";
import { hasOrganizationRoleByProductSheetId } from "@security/hasOrganizationRole/byProductSheetId";

/* METHOD : POST, PATH : /product-sheet/{productSheetId}/category */
export const POST = (method: Methods, path: string) =>
	hasOrganizationRoleByProductSheetId({ pickup: ["productSheet"] })
		.declareRoute(method, path)
		.extract({
			body: zod.object({
				categoryId: zod.string(),
			}).strip()
		})
		.check(
			categoryExistCheck,
			{
				input: (p) => inputCategory.id(p("body").categoryId),
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
					throw new ConflictHttpException("product.categories.limit");
				}

				return {};
			},
			[],
			new IHaveSentThis(ConflictHttpException.code, "product.categories.limit")
		)
		.handler(
			async ({ pickup }) => {
				const { id: productSheetId } = pickup("productSheet");
				const { categoryId } = pickup("body");

				await prisma.product_sheet_to_category.create({
					data: {
						categoryId,
						productSheetId
					},
				});

				throw new OkHttpException("productSheet.category.linked");
			}, 
			new IHaveSentThis(OkHttpException.code, "productSheet.category.linked")
		);
