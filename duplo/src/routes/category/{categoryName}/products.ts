import { categoryExistCheck, inputCategory } from "@checkers/category";
import { productSheetSchema } from "@schemas/product_sheet";

/* METHOD : GET, PATH : /category/{categoryName}/products */
export const GET = (method: Methods, path: string) =>
	duplo
		.declareRoute(method, path)
		.extract({
			params: {
				categoryName: zod.string(),
			},
		})
		.check(
			categoryExistCheck,
			{
				input: (p) => inputCategory.name(
					p("categoryName")
				),
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
				const id = pickup("category").id;

				const productsSheets = await prisma.product_sheet_to_category
					.findMany({
						where: {
							category: {
								id: id,
							},
						},
						select: {
							productSheet: true,
						},
					})
					.then((productsSheets) => productsSheets.map((p) => p.productSheet));

				throw new OkHttpException("category.products", productsSheets);
			},
			new IHaveSentThis(OkHttpException.code, "category.products", productSheetSchema.array())
		);
