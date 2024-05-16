import { categoryExistCheck } from "@checkers/category";

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
				input: (p) => p("categoryName"),
				result: "category.exist",
				catch: () => {
					throw new NotFoundHttpException("category.notfound");
				},
				indexing: "category",
			},
			new IHaveSentThis(NotFoundHttpException.code, "category.notfound")
		)
		.handler(
			async ({ pickup }) => {
				const { id } = pickup("category");

				const products = await prisma.product_to_category
					.findMany({
						where: {
							category: {
								id: id,
							},
						},
						select: {
							product: true,
						},
					})
					.then((products) => products.map((p) => p.product));

				throw new OkHttpException("category.products", products);
			}, 
			new IHaveSentThis(OkHttpException.code, "category.products", productSchema.array())
		);

const productSchema = zod.object({
	id: zod.string(),
	name: zod.string(),
	description: zod.string(),
	price: zod.number(),
	created_at: zod.date(),
	updated_at: zod.date(),
});
