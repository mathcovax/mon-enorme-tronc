import { categoryExistCheck } from "@checkers/category";
import { parentCategoryExistCheck } from "@checkers/parentCategory";
import { hasPrimordialRole } from "@security/hasPrimordialRole";

/* METHOD : DELETE, PATH : /parent-category/{parentCategoryName}/{categoryName} */
/* METHOD : DELETE, PATH : /parent-category/{parentCategoryName}/category/{categoryName} */
export const DELETE = (method: Methods, path: string) =>
	hasPrimordialRole({ options: { primordialRole: "CONTENTS_MASTER" } })
		.declareRoute(method, path)
		.extract({
			params: {
				parentCategoryName: zod.string(),
				categoryName: zod.string(),
			},
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
		.handler(
			async ({ pickup }) => {
				const { name: categoryName } = pickup("category");
				const { name: parentCategoryName } = pickup("parentCategory");

				await prisma.category_to_parent_category.delete({
					where: {
						categoryName_parentCategoryName: {
							parentCategoryName,
							categoryName,
						}
					},
				});

				throw new OkHttpException("parentCategory.category.untied");
			}, 
			new IHaveSentThis(OkHttpException.code, "parentCategory.category.untied")
		);
