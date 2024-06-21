import { categoryExistCheck } from "@checkers/category";
import { parentCategoryExistCheck } from "@checkers/parentCategory";
import { hasPrimordialRole } from "@security/hasPrimordialRole";

/* METHOD : POST, PATH : /parent-category/{parentCategoryName}/category */
export const POST = (method: Methods, path: string) => 
	hasPrimordialRole({ options: { primordialRole: "CONTENTS_MASTER" } })
		.declareRoute(method, path)
		.extract({
			params: {
				parentCategoryName: zod.string()
			},
			body: {
				categoryName: zod.string()
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
		.check(
			categoryExistCheck,
			{
				input: p => p("categoryName"),
				...categoryExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "category.notfound")
		)
		.cut(
			async ({ pickup }) => {
				const { name: parentCategoryName } = pickup("parentCategory");

				const categoriesCount = await prisma.category_to_parent_category.count({
					where: {
						parentCategoryName
					}
				});

				if (categoriesCount >= MetConfig.parentCategory.categoriesLimit) {
					throw new ConflictHttpException("parentCategory.categories.limit");
				}

				return {};
			},
			[],
			new IHaveSentThis(ConflictHttpException.code, "parentCategory.categories.limit")
		)
		.handler(
			async ({ pickup }) => {
				const { name: categoryName } = pickup("category");
				const { name: parentCategoryName } = pickup("parentCategory");

				await prisma.category_to_parent_category.create({
					data: {
						categoryName,
						parentCategoryName
					}
				});

				throw new NoContentHttpException("parentCategory.category.linked");
			},
			new IHaveSentThis(NoContentHttpException.code, "parentCategory.category.linked")
		);
