import { categoryExistCheck, inputCategory } from "@checkers/category";
import {
	productSheetExistCheck,
	inputProductSheet,
} from "@checkers/productSheet";
import { hasOrganizationRole } from "@security/hasOrganizationRole";
import { mustBeConnected } from "@security/mustBeConnected";

/* METHOD : POST, PATH : /category/{categoryId}/product-sheet */
export const POST = (method: Methods, path: string) =>
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareRoute(method, path)
		.extract({
			params: {
				categoryId: zod.string(),
			},
			body: zod.object({
				productSheetId: zod.string(),
			})
		})
		.check(
			productSheetExistCheck,
			{
				input: (p) => inputProductSheet.id(p("body").productSheetId),
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
		.cut(
			async ({ pickup }) => {
				const productSheetId = pickup("productSheet").id;
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
				const categoryId = pickup("categoryId");
				const { productSheetId } = pickup("body");

				await prisma.product_sheet_to_category.create({
					data: {
						categoryId,
						productSheetId
					},
				});

				throw new OkHttpException("product_sheet_to_category.created");
			}, 
			new IHaveSentThis(OkHttpException.code, "product_sheet_to_category.created")
		);
