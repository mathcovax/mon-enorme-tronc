import { parentCategorySchema } from "@schemas/parentCategory";
import { hasPrimordialRole } from "@security/hasPrimordialRole";

/* METHOD : GET, PATH : /parent-categories */
export const GET = (method: Methods, path: string) => 
	hasPrimordialRole({ options: { primordialRole: "CONTENTS_MASTER" } })
		.declareRoute(method, path)
		.extract({
			query: {
				page: zod.coerce.number().default(0),
				name: zod.string().optional()
			}
		})
		.handler(
			async ({ pickup }) => {
				const page = pickup("page");
				const name = pickup("name");

				const parentCategories = await prisma.parent_category.findMany({
					where: {
						name: name 
							? {
								contains: name,
								mode: "insensitive"
							}	
							: undefined,
					},
					skip: 0 * page,
					take: 10
				});

				throw new OkHttpException("parentCategory", parentCategories);
			},
			new IHaveSentThis(OkHttpException.code, "parentCategory", parentCategorySchema.array())
		);
