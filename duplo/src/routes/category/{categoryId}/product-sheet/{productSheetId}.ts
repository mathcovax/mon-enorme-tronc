import { categoryExistCheck, inputCategory } from "@checkers/category";
import {
	productSheetExistCheck,
	inputProductSheet,
} from "@checkers/product_sheet";
import { mustBeConnected } from "@security/mustBeConnected";

/* METHOD : POST, PATH : /category/{categoryId}/product-sheet/{productSheetId} */
export const POST = (method: Methods, path: string) =>
	mustBeConnected({ pickup: ["accessTokenContent"] })
		.declareRoute(method, path)
		.extract({
			params: {
				productSheetId: zod.string(),
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
		.check(
			productSheetExistCheck,
			{
				input: (p) => inputProductSheet.id(p("productSheetId")),
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
			const productSheetId = pickup("productSheetId");

			await prisma.product_sheet_to_category.create({
				data: {
					categoryId: categoryId,
					productSheetId: productSheetId
				},
			});

			throw new OkHttpException("product_sheet_to_category.created");
		}, new IHaveSentThis(OkHttpException.code, "product_sheet_to_category.created"));

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
				input: (p) => inputProductSheet.id(p("productSheetId")),
				result: "product_sheet.exist",
				catch: () => {
					throw new NotFoundHttpException("product_sheet.notfound");
				},
				indexing: "product_sheet"
			},
			new IHaveSentThis(NotFoundHttpException.code, "product_sheet.notfound")
		)
		.handler(async ({ pickup }) => {
			const productSheetId = pickup("productSheetId");
			const categoryId = pickup("categoryId");

			await prisma.product_sheet_to_category.deleteMany({
				where: {
					productSheetId: productSheetId,
					categoryId: categoryId,
				},
			});

			throw new OkHttpException("product_sheet_to_category.delete");
		}, new IHaveSentThis(OkHttpException.code, "product_sheet_to_category.delete"));
