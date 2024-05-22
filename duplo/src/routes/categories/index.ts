import { categorySchema } from "@schemas/category";

/* METHOD : GET, PATH : /categories */
export const GET = (method: Methods, path: string) => duplo
	.declareRoute(method, path)
	.extract({
		query: zod.object({
			name: zod.string().optional(),
			page: zod.coerce.number().default(0),
			withDisabled: zod.coerce.boolean().optional()
		}).strip().default({})
	})
	.handler(
		async ({ pickup }) => {
			const { name, withDisabled, page } = pickup("query");

			const categories = await prisma.category.findMany({
				where: {
					name: name
						? {
							contains: name,
							mode: "insensitive"
						}
						: undefined,
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
