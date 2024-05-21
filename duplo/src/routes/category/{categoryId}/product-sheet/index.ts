import { categoryExistCheck, inputCategory } from "@checkers/category";
import {
	productSheetExistCheck,
	inputProductSheet,
} from "@checkers/productSheet";
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
		.check(
			productSheetExistCheck,
			{
				input: (p) => inputProductSheet.id(p("body").productSheetId),
				result: "product_sheet.exist",
				catch: () => {
					throw new NotFoundHttpException("product_sheet.notfound");
				},
				indexing: "product_sheet"
			},
			new IHaveSentThis(NotFoundHttpException.code, "product_sheet.notfound")
		)
		.handler(async ({ pickup }) => {
			const categoryId = pickup("categoryId");
			const { productSheetId } = pickup("body");

			await prisma.product_sheet_to_category.create({
				data: {
					categoryId,
					productSheetId
				},
			});

			throw new OkHttpException("product_sheet_to_category.created");
		}, new IHaveSentThis(OkHttpException.code, "product_sheet_to_category.created"));
