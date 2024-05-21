import { categoryExistCheck, inputCategory } from "@checkers/category";
import { productSheetSchema } from "@schemas/productSheet";

/* METHOD : GET, PATH : /category/{categoryName}/product-sheets */
export const GET = (method: Methods, path: string) =>
	duplo
		.declareRoute(method, path)
		.extract({
			params: {
				categoryName: zod.string(),
			},
			query: {
				page: zod.coerce.number().default(0)
			}
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
				const page = pickup("page");
				const { id } = pickup("category");

				const productsSheets = await prisma.product_sheet_to_category
					.findMany({
						where: {
							category: {
								id,
							},
						},
						select: {
							productSheet: true,
						},
						skip: page * 10,
						take: 10
					})
					.then((productsSheets) => productsSheets.map((p) => p.productSheet));

				throw new OkHttpException("category.products", productsSheets);
			},
			new IHaveSentThis(OkHttpException.code, "category.products", productSheetSchema.array())
		);
