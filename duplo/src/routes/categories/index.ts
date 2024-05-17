import { categorySchema } from "@schemas/category";

/* METHOD : GET, PATH : /categories */
export const GET = (method: Methods, path: string) => duplo
	.declareRoute(method, path)
	.extract({
		query: {
			page: zod.number().default(0),
			withDisabled: zod.boolean().optional()
		}
	})
	.handler(
		async ({ pickup }) => {
			const page = pickup("page");
			const withDisabled = pickup("withDisabled");

			const categories = await prisma.category.findMany({
				where: {
					disabled: withDisabled 
						? undefined
						: false
				},
				skip: page * 10,
				take: 10,
			});

			throw new OkHttpException("categories", categories);
		},
		new IHaveSentThis(OkHttpException.code, "categories", categorySchema.array())
	);
