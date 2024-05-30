import { parentCategoryWithCategoriesNameSchema } from "@schemas/parentCategory";
import { hasPrimordialRole } from "@security/hasPrimordialRole";
import { stringBoolean } from "@utils/zod";

/* METHOD : GET, PATH : /parent-categories */
export const GET = (method: Methods, path: string) => 
	hasPrimordialRole({ options: { primordialRole: "CONTENTS_MASTER" } })
		.declareRoute(method, path)
		.extract({
			query: {
				page: zod.coerce.number().default(0),
				name: zod.string().optional(),
				withCategories: stringBoolean.optional(),
			}
		})
		.handler(
			async ({ pickup }) => {
				const page = pickup("page");
				const name = pickup("name");
				const withCategories = pickup("withCategories");

				const parentCategories = await prisma.parent_category.findMany({
					where: {
						name: name 
							? {
								contains: name,
								mode: "insensitive"
							}	
							: undefined,
					},
					select: withCategories 
						? { 
							name: true,
							categories: {
								select: {
									categoryName: true
								}
							} 
						}
						: undefined,
					skip: 10 * page,
					take: 10
				});
				
				throw new OkHttpException("parentCategories", parentCategories);
			},
			new IHaveSentThis(OkHttpException.code, "parentCategories", parentCategoryWithCategoriesNameSchema.array())
		);
