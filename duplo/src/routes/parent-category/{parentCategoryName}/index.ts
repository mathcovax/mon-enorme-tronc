import { parentCategoryExistCheck } from "@checkers/parentCategory";
import { hasPrimordialRole } from "@security/hasPrimordialRole";

/* METHOD : PATCH, PATH : /parent-category/{parentCategoryName} */
export const PATCH = (method: Methods, path: string) => 
	hasPrimordialRole({ options: { primordialRole: "CONTENTS_MASTER" } })
		.declareRoute(method, path)
		.extract({
			params: {
				parentCategoryName: zod.string()
			},
			body: zod.object({
				isInNavBar: zod.boolean().optional(),
			}).strip().default({})
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
				const { isInNavBar } = pickup("body");

				await prisma.parent_category.update({
					where: {
						name: parentCategoryName
					},
					data: {
						isInNavBar
					}
				});

				throw new NoContentHttpException("parentCategory.edited");
			},
			new IHaveSentThis(NoContentHttpException.code, "parentCategory.edited")
		);
