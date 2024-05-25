import { parentCategoryExistCheck } from "@checkers/parentCategory";
import { categorySchema } from "@schemas/category";
import { hasPrimordialRole } from "@security/hasPrimordialRole";

/* METHOD : GET, PATH : /parent-category/{parentCategoryName}/categories */
export const GET = (method: Methods, path: string) => 
	hasPrimordialRole({ options: { primordialRole: "CONTENTS_MASTER" } })
		.declareRoute(method, path)
		.extract({
			params: {
				parentCategoryName: zod.string()
			}
		})
		.check(
			parentCategoryExistCheck,
			{
				input: p => p("parentCategoryName"),
				...parentCategoryExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "parentCategory.notfound")
		)
		.handler(
			async ({ pickup }) => {
				const { name: parentCategoryName } = pickup("parentCategory");

				const categories = await prisma.category_to_parent_category.findMany({
					where: {
						parentCategoryName
					},
					select: {
						category: true
					},
					take: 10
				}).then(
					categoryToParentCategoryCollection => 
						categoryToParentCategoryCollection.map(({ category }) => category)
				);

				throw new OkHttpException("parentCategory.categories", categories);
			},
			new IHaveSentThis(OkHttpException.code, "parentCategory.categories", categorySchema.array())
		);
